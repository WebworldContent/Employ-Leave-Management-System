import React from 'react';
import {Route, Routes} from 'react-router-dom';
import { Home } from './Components/Home/Home';
import LeavesForm from './Components/LoginForm/LeavesForm';

export default function Main() {
    return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/addUser' element={<LeavesForm/>}></Route>
    </Routes>
    );
}