import React, { Component } from 'react';
import Page from '../../components/Page';
import usersdb from '../../db/usersdb-test';
class Users extends Component {
  render() {
    const info = usersdb;
    const tablfeInfo = info.map((item) =>
       <tr key={item._id}>
           <td>{item._id}</td>
           <td>Аватар</td>
           <td>{item.name}</td>
           <td>{item.email}</td>
           <td>{item.date}</td>
       </tr>
    );
    return (
        <Page title="Пользователи" location="users">
            <div className="filter-cnt">
                <p>Фильтр</p>
                <div className="filter-inner">
                    <form action="">
                        <input type="text" placeholder="Id"/>
                        <input type="text" placeholder="Имя"/>
                        <input type="text" placeholder="Email"/>
                        <button className="button submit-btn">Найти</button>
                        <button className="button reset-btn">Сброс</button>
                    </form>
                </div>
            </div>
            <div className="items-list">
                <table>
                    <tbody>
                   <tr>
                       <th>Id</th>
                       <th>Аватар</th>
                       <th>Никнейм</th>
                       <th>Email</th>
                       <th>Последняя авторизация</th>
                   </tr>
                   {tablfeInfo}
                   </tbody>
               </table>
            </div>
        </Page>
    );
  }
}

export default Users;
