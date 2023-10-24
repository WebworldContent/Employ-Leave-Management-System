import React, { useState, useEffect, useCallback } from "react";
import './Home.css';
import { Chart } from "./Chart";
import { FeaturesSection } from "./FeaturesSection";
import HolidayCalendar from "./HolidayCalender";
import { Header } from "./Header";
import { Box } from "@mui/material";
import { isValidUser } from "../Util/Helper.js";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const API_PORT = 3001;
    const [userData, setUserDate] = useState({});
    const [userAvatar, setUserAvatar] = useState('');
    const navigate = useNavigate();

    const setProfile = (user) => {
        const nameInitial = user?.username.slice(0,2).toUpperCase();
        setUserAvatar(nameInitial);
    };

    const getUserData = useCallback(async () => {
        const response = await fetch(`http://localhost:${API_PORT}/user/getUser`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!isValidUser(response)) {
            return navigate('/login')
        }

        const user = await response.json();
        setUserDate(user[0]);
        setProfile(user[0]);
    }, [API_PORT, navigate]);

    useEffect(() => {
        getUserData();
    }, [getUserData]);

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


