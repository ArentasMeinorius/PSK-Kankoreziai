import React, { useState, useEffect } from 'react';
import DescriptionComponent from './DescriptionComponent';
import ImagesComponent from './ImagesComponent';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';

const ItemPage = () => {
    const [productInfo, setProductInfo] = useState({});
    let { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/item/${id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                setProductInfo({ data });
            });
    }, []);

    return (
        <Grid direction="row" container spacing={2}>
            <Grid item xs={6}>
                <ImagesComponent images={productInfo.pictures} />
            </Grid>
            <Grid item xs={6}>
                <DescriptionComponent description={productInfo} />
            </Grid>
        </Grid>
    );
};
export default ItemPage;
