import React, {lazy, Suspense} from 'react';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import { Home } from './Components/Home/Home';
import RegisterForm from './Components/Forms/RegisterForm';
import LoginForm from './Components/Forms/LoginForm';
// import LeavesForm from './Components/Forms/LeavesForm';
// import AdminPage from './Components/Admin/AdminPage';
// import UsersForm from './Components/Forms/UsersForm';

const LeavesForm = lazy(() => import('./Components/Forms/LeavesForm'));
const AdminPage = lazy(() => import('./Components/Admin/AdminPage'));
const UsersForm = lazy(() => import('./Components/Forms/UsersForm'));

export default function Main() {
    return (
    <Router>
        <Suspense fallback={<p>Loading page...</p>}>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/addUserLeaves' element={<LeavesForm/>}></Route>
                <Route path='/addUser/:email?' element={<UsersForm/>}></Route>
                <Route path='/admin' element={<AdminPage/>}></Route>
                <Route path='/register' element={<RegisterForm/>}></Route>
                <Route path='/login' element={<LoginForm/>}></Route>
            </Routes>
        </Suspense>
    </Router>
    );
}