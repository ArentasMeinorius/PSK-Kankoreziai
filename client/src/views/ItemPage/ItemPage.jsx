import React from 'react';
import DescriptionComponent from './DescriptionComponent';
import ImagesComponent from './ImagesComponent';
import { Grid } from '@mui/material';
const ItemPage = () => {
    return (
        <Grid direction="row" container spacing={2}>
            <Grid item xs={6}>
                <ImagesComponent />
            </Grid>
            <Grid item xs={6}>
                <DescriptionComponent />
            </Grid>
        </Grid>
    );
};
export default ItemPage;
