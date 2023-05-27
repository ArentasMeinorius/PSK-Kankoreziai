import {Box, Button, ButtonBase, Container, Grid, Modal, styled, TextField, Typography} from "@mui/material";
import React from 'react';
import PropTypes from "prop-types";
import useAuthWithPermissions from "../../authentication/useAuthWithPermissions";
import {useNavigate} from "react-router-dom";

export const EditItem = ({currentProduct, newItem}) => {
    const [product, setProduct] = React.useState(currentProduct);
    const [error, setError] = React.useState('');
    const navigate = useNavigate();
    console.log(product);
    const [openImageModal, setOpenImageModal] = React.useState(false);
    // eslint-disable-next-line no-unused-vars
    const [isAuthenticated, credentials, authKey, hasPermissions, callLogin, callLogout] = useAuthWithPermissions([
        'items.see',
        'items.manage',
        'products.create'
    ]);

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const handleOpenImageModal = () => {
        setOpenImageModal(true);
    };
    const handleCloseImageModal = () => {
        setOpenImageModal(false);
    };
    
    const getMoneyFromCents = (cents) => {
        return cents / 100;
    };
    
    const ImagesModal = () => {
        return (
            <Modal
                open={openImageModal}
                onClose={handleCloseImageModal}>
                <Box sx={{...modalStyle, width: 500 }}>
                    <Typography variant={"h5"} id="thumbnail-title" sx={{mb: 2}}>Thumbnail:</Typography>
                    <TextField
                        required
                        fullWidth
                        id="product-thumbnail"
                        label="Required"
                        defaultValue={product.thumbnail.link}
                        onChange={(event) => {setProduct({...product, thumbnail: { link: event.target.value}})}}
                    />
                </Box>
            </Modal>
        )
    }
    
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
                Authorization: `Bearer ${authKey}`
            },
            body: JSON.stringify(product)
        })
            .then((response) => {
                if (response.ok) {
                    navigate('/admin/item');
                }
                else {
                    return response.text().then(text => { setError(text)});
                }
            });
    }
    
    const handleNewItem = () => {
        fetch(`http://localhost:5000/product/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authKey}`
            },
            body: JSON.stringify(product)
        })
            .then((response) => {
                if (response.ok) {
                    navigate('/admin/item');
                }
                if(!response.ok) {
                    return response.text().then(text => { setError(text)});
                }
            });
    }

    return (
        <Container>
            <ImagesModal/>
            <Grid container direction={"row"} justify="center" alignItems="stretch" spacing={2} sx={{
                m:'auto',
                mt: 3,
                p: 2,
                width: "70%",
                border: 1,
                borderColor: 'primary.main',
                borderRadius: '16px',
            }}>
                <Grid item xs={12} justifyContent={"center"}>
                    <Typography>Name: </Typography>
                    <TextField
                        required
                        fullWidth
                        id="product-name"
                        label=""
                        defaultValue={product.name}
                        onChange={(event) => {setProduct({...product, name: event.target.value})}}
                    />
                </Grid>
                <Grid item xs={3} align={"center"} style={{height: "100%"}}>
                    <ButtonBase onClick={handleOpenImageModal} sx={{ width: 168, height: 168 }}>
                        <Img alt="item" src={product.thumbnail.link}/>
                    </ButtonBase>
                </Grid>
                
                <Grid item xs={8}>
                    {/*<Typography>{product.description}</Typography>*/}
                    <Grid container >
                        <Grid item xs={12}>
                            <Typography>Description: </Typography>
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
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography>Price: </Typography>
                                    <TextField
                                        required
                                        id="product-price"
                                        type="number"
                                        inputProps={{
                                            maxLength: 13,
                                            step: "1"
                                        }}
                                        label=""
                                        fullWidth
                                        defaultValue={getMoneyFromCents(product.price.cents)}
                                        onChange={(event) => {setProduct({...product, price: {cents: parseFloat(event.target.value) * 100}})}}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>Quantity: </Typography>
                                    <TextField
                                        required
                                        id="product-quantity"
                                        label=""
                                        type="number"
                                        fullWidth
                                        defaultValue={product.quantity.units}
                                        onChange={(event) => {setProduct({...product, quantity: {units: event.target.value }})}}
                                    />
                                </Grid>
                            </Grid>
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
            {error &&
                <Typography>
                    {error}
                </Typography>
            }
        </Container>
    );

}

EditItem.propTypes = {
    currentProduct: PropTypes.object,
    newItem: PropTypes.bool
};