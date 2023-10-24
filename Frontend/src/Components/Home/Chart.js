import React, { useEffect, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { BarChart } from '@mui/x-charts/BarChart';
import { isValidUser } from '../Util/Helper';
import { useNavigate } from 'react-router-dom';

export const Chart = ({userData, port}) => {
    const [leaves, setLeaves] = useState([]);
    const navigate = useNavigate();

    const extractedLeaves = (leaves) => {
        delete leaves.ID;
        delete leaves.userID;
        return Object.values(leaves);
    };

    const {email} = userData;
    const getUserLeaves = useCallback(async () => {
        const response = await fetch(`http://localhost:${port}/leaves/leaves/${email}`, {
            method: 'GET',
            credentials: 'include',
        });
        if (!isValidUser) {
            return navigate('/login');
        }
        const leavesRep = await response.json();
        setLeaves(leavesRep[0] ? extractedLeaves({...leavesRep[0]}) : []);
    }, [email, port, navigate]);

    useEffect(() => {
        getUserLeaves();
    }, [getUserLeaves]);

    return (
        <div style={{display:'flex', flexDirection: 'column', justifyContent: "center" }}>
        <Container fixed >
            <Box sx={{ bgcolor: '#c2e9fb', height: 500, width: '100%' }} >
                <BarChart
                    xAxis={[
                        {
                            id: 'barCategories',
                            data: ['Casual', 'Maternity', 'Parental', 'Privileged', 'Sick'],
                            scaleType: 'band',
                        },
                    ]}
                    series={[
                        {
                            data: leaves.length ? leaves : [0, 0, 0, 0, 0],
                            color: '#667eea'
                        },
                    ]}
                    width={1200}
                    height={500}
                />
            </Box>
        </Container>
        </div>
    );
}
