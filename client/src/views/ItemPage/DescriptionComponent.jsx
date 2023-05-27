import React from 'react';
import { PropTypes } from 'prop-types';
import { Button, Container, Grid, Input, Typography, useTheme } from '@mui/material';
import { useCart } from '../../cart/useCart';

const DescriptionComponent = ({ itemInfo }) => {
    const theme = useTheme();
    const [quantity, setQuantity] = React.useState(1);
    // eslint-disable-next-line no-unused-vars
    const [cart, isLoaded, error, addToCart, removeFromCart, changeQuantity] = useCart();

    const getMoneyFromCents = (cents) => {
        return cents / 100;
    };

    function handleQuantityChange(event) {
        if (event.target.value < 1) {
            setQuantity(1);
            return;
        }

        if (event.target.value > itemInfo.quantity.units) {
            setQuantity(itemInfo.quantity.units);
            return;
        }

        setQuantity(event.target.value);
    }

    if (!itemInfo) {
        return <Typography>Loading...</Typography>;
    } else {
        return (
            <Container sx={{ backgroundColor: theme.palette.primary.dark, color: 'white', padding: 5 }}>
                <Typography variant="h4" noWrap={true}>
                    {itemInfo?.name}
                </Typography>
                <Typography variant="h6">Price: {getMoneyFromCents(itemInfo?.price?.cents)} €</Typography>
                <Typography variant="body1" style={{ wordWrap: "break-word" }}>{itemInfo.description}</Typography>
                <Typography variant="h6">In stock: {itemInfo?.quantity?.units}</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Input
                            variant="outlined"
                            type="number"
                            placeholder="Quantity"
                            onChange={handleQuantityChange}
                            value={quantity}
                            sx={{ color: 'white' }}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Button variant="contained" fullWidth onClick={() => addToCart(itemInfo, quantity)}>
                            Add to cart
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        );
    }
};
DescriptionComponent.propTypes = {
    itemInfo: PropTypes.object,
};
export default DescriptionComponent;
