/*
    Validation
*/
class Validator{
    constructor(properties, settings) {
        this.settings = settings;
        this.properties = properties;
        this.message = "";
    }

    validate() {
        let valid = true;
        let message = "Необходимо заполнить поля ";
        let requiredFields = [];

        this.settings.properties.map((element) =>{
            if(element.required)
            {
                if(this.properties[element.attribute]['value']===undefined||this.properties[element.attribute]['value']==='')
                {
                    valid = false;
                    requiredFields.push('"'+element.name+'"');
                }
            }
        })
        if(!valid)
            this.setMessage(message + requiredFields.join(", "));
        return valid;
    }

    getMessage() {
        return this.message;
    }

    setMessage(msg) {
        this.message = msg;
    }    
}
export default Validator;