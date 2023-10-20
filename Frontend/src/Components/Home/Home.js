import React, { useState, useEffect, useCallback } from "react";
import './Home.css';
import { Chart } from "./Chart";
import { FeaturesSection } from "./FeaturesSection";
import HolidayCalendar from "./HolidayCalender";
import { Header } from "./Header";
import { Box } from "@mui/material";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";


export const Home = () => {
    const API_PORT = 3001;
    const [userData, setUserDate] = useState({});
    const [userAvatar, setUserAvatar] = useState('');
    const navigate = useNavigate();
    
    const checkValidity = useCallback((response) => {
        if (!response.ok) {
            if (400 <= response.status && response.status <= 499) {
                return navigate('/login');
            }
            throw new Error(`Something went wrong with status code: ${response.status}`);
        }
    }, [navigate]);

    const setProfile = (user) => {
        const nameInitial = user?.username.slice(0,2).toUpperCase();
        setUserAvatar(nameInitial);
    };

    const getUserData = useCallback(async () => {
        const response = await fetch(`http://localhost:${API_PORT}/user/getUser`, {
            method: 'GET',
            credentials: 'include',
        });
        checkValidity(response);
        const user = await response.json();
        setUserDate(user[0]);
        setProfile(user[0]);
    }, [API_PORT, checkValidity]);

    useEffect(() => {
        getUserData();
    }, [getUserData]);

    console.log('>>>>', Cookies.get());

    console.log(userData);

    return (
        <>
            <Header port={API_PORT} userData={userData} userAvatar={userAvatar} />
            <div style={{display:'flex', flexDirection: 'row', justifyContent: "center", flexWrap: 'wrap', marginTop: '80px', marginBottom: '80px'}}>
                <Box>
                    <div style={{display:'flex', flexDirection: 'column', justifyContent: "center", flexWrap: 'wrap'}}>
                        <Chart userData={userData} port={API_PORT}/>
                        <FeaturesSection port={API_PORT}/>
                    </div>
                </Box>
                <Box>
                    <HolidayCalendar port={API_PORT}/>
                </Box>
            </div>
        </>
        
    );
}


