import React from 'react';
import {Route, Routes} from 'react-router-dom';
import { Home } from './Components/Home/Home';
import LeavesForm from './Components/Forms/LeavesForm';
import AdminPage from './Components/Admin/AdminPage';
import UsersForm from './Components/Forms/UsersForm';

export default function Main() {
    return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/addUserLeaves' element={<LeavesForm/>}></Route>
        <Route path='/addUser/:email?' element={<UsersForm/>}></Route>
        <Route path='/admin' element={<AdminPage/>}></Route>
    </Routes>
    );
}