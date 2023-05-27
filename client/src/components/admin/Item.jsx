import {Box, Button, ButtonBase, Container, Grid, Modal, styled, Typography} from "@mui/material";
import React from 'react';
import PropTypes from "prop-types";
import useAuthWithPermissions from "../../authentication/useAuthWithPermissions";

export const AdminItem = ({product}) => {
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    // eslint-disable-next-line no-unused-vars
    const [isAuthenticated, credentials, authKey, hasPermissions, callLogin, callLogout] = useAuthWithPermissions([
        'items.see',
        'items.manage',
        'products.create'
    ]);
    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'grey.500',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const handleOpenDeleteModal = () => {
        setOpenDeleteModal(true);
    };
    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };
    const handleDeleteItem = () => {
        fetch(`http://localhost:5000/product/${product.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authKey}`
            },
        })
            .then((response) => {
                if (response.ok) {
                    window.location.reload(false);
                    return response.json();
                }
                else {
                    return response.text().then(text => { console.log(text)});
                }
            });
    }
    
    const getMoneyFromCents = (cents) => {
        return cents / 100;
    };
    
    const DeleteModal = () => {
        return (
            <Modal
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}>
                <Box sx={{...modalStyle, width: 500 }}>
                    <Typography variant={"h5"} id="thumbnail-title" sx={{mb: 2}}>Do you really want to delete this item?</Typography>
                    <Button align={"right"} onClick={handleDeleteItem} color={"primary"}>
                        Yes
                    </Button>
                    <Button align={"right"} onClick={handleCloseDeleteModal}>
                        No
                    </Button>
                </Box>
            </Modal>
        )
    }
    
    return (
        <Container>
            {openDeleteModal && <DeleteModal/>}
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
                    <Button onClick={handleOpenDeleteModal}>
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
        </Container>
    );

}

AdminItem.propTypes = {
    product: PropTypes.object,
};