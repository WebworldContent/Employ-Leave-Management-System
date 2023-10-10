import React from 'react';
import {Route, Routes} from 'react-router-dom';
import { Home } from './Components/Home/Home';
import LeavesForm from './Components/Forms/LeavesForm';
import AdminPage from './Components/Admin/AdminPage';

export default function Main() {
    return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/addUser' element={<LeavesForm/>}></Route>
        <Route path='/admin' element={<AdminPage/>}></Route>
    </Routes>
    );
}