import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { BarChart } from '@mui/x-charts/BarChart';

export const Chart = ({userData, port}) => {
    const [leaves, setLeaves] = useState([]);

    const extractedLeaves = (leaves) => {
        delete leaves.ID;
        delete leaves.userID;
        return Object.values(leaves);
    };

    useEffect(() => {
        const getUserLeaves = async () => {
            const response = await fetch(`http://localhost:${port}/leaves/leaves/${userData.email}`, {
                method: 'GET',
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const leavesRep = await response.json();
            setLeaves(leavesRep[0] ? extractedLeaves({...leavesRep[0]}) : []);
        };

        getUserLeaves();
    }, [userData, port]);

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
