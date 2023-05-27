import {Button, ButtonBase, Grid, styled, Typography} from "@mui/material";
import React from 'react';
import PropTypes from "prop-types";

export const AdminItem = ({product}) => {
    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });
    
    const getMoneyFromCents = (cents) => {
        return cents / 100;
    };
    
    return (
        <Grid container  sx={{
            px: 2,
            pb: 1
        }}>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={8} style={{display: "flex", justifyContent:"flex-end"}}>
                <Button href={`/admin/item/${product.id}`}>
                    Edit
                </Button>
                <Button>
                    Delete
                </Button>
            </Grid>
            <Grid item xs={4}>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                    <Img alt="item" src={product.thumbnail.link}/>
                </ButtonBase>
            </Grid>
            <Grid item xs={8}>
                <Typography variant={"h5"}>{product.name}</Typography>
                <Typography>{product.description}</Typography>
            </Grid>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={8}>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography>Price: {getMoneyFromCents(product.price.cents)}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Quantity: {product.quantity.units}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

}

AdminItem.propTypes = {
    product: PropTypes.object,
};