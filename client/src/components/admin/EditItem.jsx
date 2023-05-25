import {Button, ButtonBase, Grid, styled, TextField, Typography} from "@mui/material";
import React from 'react';
import PropTypes from "prop-types";

export const EditItem = ({currentProduct, newItem}) => {
    const [product, setProduct] = React.useState(currentProduct);
    const getMoneyFromCents = (cents) => {
        return cents / 100;
    };
    
    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });
    
    const handleSaveItem = () => {
        console.log(JSON.stringify(product));
        fetch(`http://localhost:5000/product/${product.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            });
    }
    
    const handleNewItem = () => {
        fetch(`http://localhost:5000/product/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            });
    }

    console.log(product);

    return (
        <Grid container direction={"row"} justify="center" alignItems="stretch" spacing={2} sx={{
            m:'auto',
            width: "70%"
        }}>
            <Grid item xs={12} justifyContent={"center"}>
                <TextField
                    required
                    fullWidth
                    id="product-name"
                    label="Required"
                    defaultValue={product.name}
                    onChange={(event) => {setProduct({...product, name: event.target.value})}}
                />
            </Grid>
            <Grid item xs={3} align={"center"} style={{height: "100%"}}>
                <ButtonBase sx={{ width: 168, height: 168 }}>
                    <Img alt="item" src={product.thumbnail.link}/>
                </ButtonBase>
            </Grid>
            
            <Grid item xs={8}>
                {/*<Typography>{product.description}</Typography>*/}
                <Grid container >
                    <Grid item xs={12}>
                        {/*<Typography>{product.price}</Typography>*/}
                        <TextField
                            id="product-description"
                            label=""
                            fullWidth
                            multiline
                            rows={4}
                            defaultValue={product.description}
                            onChange={(event) => {setProduct({...product, description: event.target.value})}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Price: </Typography>
                        <TextField
                            required
                            id="product-price"
                            label=""
                            fullWidth
                            defaultValue={getMoneyFromCents(product.price.cents)}
                            onChange={(event) => {setProduct({...product, price: {cents: event.target.value * 100}})}}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} style={{display: "flex", justifyContent:"flex-end"}}>
                { newItem ?
                    <Button
                        variant={"contained"}
                        onClick={handleNewItem}
                    >
                        Add new item
                    </Button> :
                    <Button
                        variant={"contained"}
                        onClick={handleSaveItem}
                    >
                        Save item
                    </Button>
                   
                }
            </Grid>
        </Grid>
    );

}

EditItem.propTypes = {
    currentProduct: PropTypes.object,
    newItem: PropTypes.bool
};