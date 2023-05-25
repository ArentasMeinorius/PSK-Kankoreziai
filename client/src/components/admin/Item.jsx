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
    
    console.log(product);
    
    return (
        <Grid container spacing={2}>
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
                <Typography>{product.name}</Typography>
                {/*<Typography>{product.price}</Typography>*/}
                <Typography>{product.description}</Typography>
            </Grid>
            <Grid item xs={4}>
                {/*<Typography>{product.description}</Typography>*/}
            </Grid>
            <Grid item xs={8}>
                {/*<Typography>{product.price}</Typography>*/}
                <Typography>{product.description}</Typography>
            </Grid>
        </Grid>
    );

}

AdminItem.propTypes = {
    product: PropTypes.object,
};