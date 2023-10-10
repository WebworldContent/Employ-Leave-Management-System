import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container } from '@mui/material';
import { format } from 'date-fns';

const holidays = [
    // To get the current of specific year info of holidays :- https://calendarific.com/api/v2/holidays?&api_key=cu1sQGRP6dImljSMR5TaCtdcBn5WIoUO&country=IN&year=2023
    // Website :- https://calendarific.com/account/dashboard
  { date: '2023-01-01', name: 'New Year\'s Day' },
  { date: '2023-02-14', name: 'Valentine\'s Day' },
  { date: '2023-01-01', name: 'New Year\'s Day' },
  { date: '2023-02-14', name: 'Valentine\'s Day' },
  { date: '2023-01-01', name: 'New Year\'s Day' },
  { date: '2023-02-14', name: 'Valentine\'s Day' },
  { date: '2023-01-01', name: 'New Year\'s Day' },
  { date: '2023-02-14', name: 'Valentine\'s Day' },
  { date: '2023-01-01', name: 'New Year\'s Day' },
  { date: '2023-02-14', name: 'Valentine\'s Day' },
  { date: '2023-01-01', name: 'New Year\'s Day' },
  { date: '2023-02-14', name: 'Valentine\'s Day' },
  { date: '2023-01-01', name: 'New Year\'s Day' },
  { date: '2023-02-14', name: 'Valentine\'s Day' },
  { date: '2023-01-01', name: 'New Year\'s Day' },
  { date: '2023-02-14', name: 'Valentine\'s Day' },
  { date: '2023-01-01', name: 'New Year\'s Day' },
  { date: '2023-02-14', name: 'Valentine\'s Day' },
  { date: '2023-01-01', name: 'New Year\'s Day' },
  { date: '2023-02-14', name: 'Valentine\'s Day' },
  { date: '2023-01-01', name: 'New Year\'s Day' },
  { date: '2023-02-14', name: 'Valentine\'s Day' },
  { date: '2023-01-01', name: 'New Year\'s Day' },
  { date: '2023-02-14', name: 'Valentine\'s Day' },
  // Add more holidays here...
];

function HolidayCalendar() {
  const currentYear = new Date().getFullYear();

  return (
    <Container fixed>
        <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h5" gutterBottom>
            Holidays List - {currentYear}
        </Typography>
        <TableContainer sx={{ maxHeight: 350 }} component={Paper} style={{backgroundColor: '#c2e9fb'}}>
            <Table>
            <TableHead>
                <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Holiday</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {holidays.map((holiday) => (
                <TableRow key={holiday.date}>
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
