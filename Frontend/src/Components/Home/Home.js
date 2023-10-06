import React, { useState, useEffect } from "react";
import './Home.css';
import { Chart } from "./Chart";
import { FeaturesSection } from "./FeaturesSection";
import HolidayCalendar from "./HolidayCalender";
import { Header } from "./Header";
import { Box } from "@mui/material";


export const Home = () => {
    const API_PORT = 3001;
    const [userData, setUserDate] = useState({});
    const [userAvatar, setUserAvatar] = useState('');

    const setProfile = (user) => {
        const nameInitial = user?.username.slice(0,2).toUpperCase();
        setUserAvatar(nameInitial);
    };

    useEffect(() => {
        const getUserData = async () => {
          const response = await fetch(`http://localhost:${API_PORT}/user/getUser/test@gmail.com`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const user = await response.json();
          setUserDate(user[0]);
          setProfile(user[0]);
        };

        getUserData();
    }, [API_PORT]);

    return (
        <>
            <Header port={API_PORT} userData={userData} userAvatar={userAvatar} />
            <div style={{display:'flex', flexDirection: 'row', justifyContent: "center", flexWrap: 'wrap', marginTop: '80px', marginBottom: '80px'}}>
                <Box>
                    <div style={{display:'flex', flexDirection: 'column', justifyContent: "center", flexWrap: 'wrap'}}>
                        <Chart userData={userData} port={API_PORT}/>
                        <FeaturesSection />
                    </div>
                </Box>
                <Box>
                    <HolidayCalendar />
                </Box>
            </div>
        </>
        
    );
}

