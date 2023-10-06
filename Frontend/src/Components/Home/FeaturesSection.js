import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Users } from './Users';
import { Functionality } from './Functionality';

export const FeaturesSection = ({port}) => {
    return (
        <Container style={{marginTop: '50px'}}>
            <Box sx={{ bgcolor: '#FCFCFC', width: '100%' }} >
                <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Users port={port} />
                    <Functionality />
                </div>
            </Box>
        </Container>
    );
}
