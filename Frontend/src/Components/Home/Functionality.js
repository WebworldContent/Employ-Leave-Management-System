import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

export const Functionality = () => {
    return (
        <Box sx={{ bgcolor: '#c2e9fb', width: '100%' }} >
           <Elevation />
        </Box>
    );
}

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
}));
  
function Elevation() {
    return (
    //   <Grid container spacing={}>
    //       <Grid item xs={6}>
            <Box style={{width: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', marginTop: '50px'}}>
                    <Item elevation={6} style={{width: 200}}>
                        {`elevation=${6}`}
                    </Item>
                    <Item elevation={6} style={{width: 200}}>
                        {`elevation=${6}`}
                    </Item>
                    <Item elevation={6} style={{width: 200, marginTop: '50px'}}>
                        {`elevation=${6}`}
                    </Item>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '50px'}}>
                    <Item elevation={6} style={{width: 500}}>
                        {`Apply Leave`}
                    </Item>
                </div>
            </Box>
    //       </Grid>
    //   </Grid>
    );
  }