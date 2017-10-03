import {ref,storage} from '../config/firebase'
import Messages from '../components/Messages';

export function addGame (game) {
    var iconPath = '';
    if(game.icon!='')
        game.iconPath = "games/" + game.id + game.icon.name.substr(-4);

    let id = game.id||'default';
    var gameSaved = false;
    // return ref.child(`games/${id}`)
    // .set({
    //   name: game.name
    // })
    // .then(() => {
    // 	return game;
    // });

    // Add new game if Id is not exist
    return ref.child(`games/${id}`).transaction(function(currentGame) {
        //Check if game already exists
        if (currentGame === null) {
            gameSaved = true;
            return {
              name: game.name,
              createdAt: Date.now(),
              icon: game.iconPath
            };
        }
        else {
            Messages.addErrorMsg(`Игра c Id "${id}" уже существует.`);
        }
    }, function(error, committed, snapshot) {
        if (error) {
            gameSaved = false;
        }
        else if(!committed){
            gameSaved = false;
        }
    }).then((e)=>{
        //Add icon if game saved, or delete game if icon can't be saved
        if(gameSaved)
        {
            return storage.ref().child(game.iconPath).put(game.icon)
            .then(()=>{
                Messages.addSuccesMsg(`Игра "${game.name}" успешно добавлена.`);
            })
            .catch((e)=>{
                ref.child(`games/${id}`).remove();
                Messages.addErrorMsg("Не удалось загрузить иконку: " + e.message);
            });
        }
        else {
            return e;
        }
    }).catch((e)=>{
        Messages.addErrorMsg("Произошла ошибка: " + e.message);
    });
}
