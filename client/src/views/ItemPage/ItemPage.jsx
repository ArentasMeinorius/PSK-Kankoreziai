import React, { useState, useEffect } from 'react';
import DescriptionComponent from './DescriptionComponent';
import ImagesComponent from './ImagesComponent';
import { Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const ItemPage = () => {
    const [productInfo, setProductInfo] = useState({});
    let { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/product/${id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                setProductInfo(data);
            });
    }, [id]);

    if (productInfo && productInfo?.pictures) {
        return (
            <Grid direction="row" container spacing={0}>
                <Grid item xs={6}>
                    <ImagesComponent images={[productInfo?.thumbnail?.link, ...productInfo.pictures.links]} />
                </Grid>
                <Grid item xs={6}>
                    <DescriptionComponent itemInfo={productInfo} />
                </Grid>
            </Grid>
        );
    } else {
        return <Typography>Loading...</Typography>;
    }
};
export default ItemPage;
