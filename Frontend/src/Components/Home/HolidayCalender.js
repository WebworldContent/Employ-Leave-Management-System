import React, { useEffect, useState, useCallback } from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container } from '@mui/material';
import { format } from 'date-fns';

function HolidayCalendar({port}) {
    const currentYear = new Date().getFullYear();
    const [holiday, setHoliday] = useState([]);

    const getHolidays = useCallback(async() => {
        const response = await fetch(`http://localhost:${port}/leaves/get-holidays`);
        const holidays = await response.json();
        setHoliday(holidays);
    }, [port]);

    useEffect(() => {
        try {
            getHolidays();
        } catch(err) {
            console.log(err);
        }
    }, [getHolidays]);

    return (
        <Container fixed style={{width: 400}}>
            <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h5" gutterBottom>
                Holidays List - {currentYear}
            </Typography>
            <TableContainer sx={{ maxHeight: 800 }} component={Paper} style={{backgroundColor: '#c2e9fb'}}>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Holiday</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {holiday?.map((holiday) => (
                    <TableRow key={holiday.id}>
                        <TableCell>{format(new Date(holiday.date), 'MMMM dd')}</TableCell>
                        <TableCell>{holiday.name}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            </Paper>
        </Container>
    );
}

export default HolidayCalendar;
