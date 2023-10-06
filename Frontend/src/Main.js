import React from 'react';
import {Route, Routes} from 'react-router-dom';
import { Home } from './Components/Home/Home';

export default function Main() {
    return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        {/* <Route></Route> */}
    </Routes>
    );
}