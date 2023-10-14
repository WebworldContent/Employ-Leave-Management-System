import React, { useEffect, useState, useCallback } from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Checkbox, Button } from '@mui/material';
import { format } from 'date-fns';

export default function HolidayCalendar({port}) {
  const currentYear = new Date().getFullYear();
  const [holidays, setHolidays] = useState([]);
  const [selectedHoliday, setSelectedHoliday] = useState([]);

  const fetchHolidays = useCallback(async () => {
	// To get the current of specific year info of holidays :- https://calendarific.com/api/v2/holidays?&api_key=cu1sQGRP6dImljSMR5TaCtdcBn5WIoUO&country=IN&year=2023
    // Website :- https://calendarific.com/account/dashboard
    const response = await fetch(`https://calendarific.com/api/v2/holidays?&api_key=cu1sQGRP6dImljSMR5TaCtdcBn5WIoUO&country=IN&year=${currentYear}`);
    const holidays = await response.json();
    
    setHolidays(holidays?.response?.holidays);
  }, [currentYear]);

  const fetchedSelectedHolidays = useCallback(async () => {
    const holidayResp = await fetch(`http://localhost:${port}/leaves/get-holidays`);
    const fetchedHolidays = await holidayResp.json();
    console.log(fetchedHolidays);
    if (fetchedHolidays) {
      setSelectedHoliday(fetchedHolidays ? fetchedHolidays.map((data) => ({id: data.id, name: data.name, date: format(new Date(data.date), 'yyyy-MM-dd')})) : []);
    }
  }, [port]);

  useEffect(() => {
    fetchHolidays();
    fetchedSelectedHolidays();
  },[fetchHolidays, fetchedSelectedHolidays]);

  const handleCheckboxChange = (event, holiday) => {
	if (event.target.checked) {
		setSelectedHoliday((preHoliday) => [...preHoliday, holiday]);
	} else {
		setSelectedHoliday(selectedHoliday.filter((selectHoli) => selectHoli.date.iso !== holiday.date.iso))
	}
  };

  const addHolidays = async() => {
    try {
      const addedData = await fetch(`http://localhost:${port}/leaves/holidays`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedHoliday)
      });
      console.log(addedData);
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <Container fixed>
        <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h5" gutterBottom>
            <span>Holidays List - {currentYear}</span><span style={{marginLeft: '50px', position: 'fixed'}}><Button variant="contained" onClick={addHolidays}>Add Selected Holidays</Button></span>
        </Typography>
        <TableContainer sx={{ maxHeight: 350 }} component={Paper} style={{backgroundColor: '#c2e9fb'}}>
            <Table stickyHeader>
            <TableHead>
                <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Holiday</TableCell>
				<TableCell>Add</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {holidays?.map((holiday, indx) => (
                <TableRow key={indx}>
                    <TableCell>{format(new Date(holiday.date.iso), 'MMMM dd')}</TableCell>
                    <TableCell>{holiday.name}</TableCell>
					<TableCell>
                    <Checkbox
                      checked={selectedHoliday.some((selectedHoliday) => selectedHoliday.date === holiday.date.iso)}
                      onChange={(event) => handleCheckboxChange(event, holiday)}
                    />
                  </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        </Paper>
     </Container>
  );
}
