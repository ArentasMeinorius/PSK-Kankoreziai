import React from 'react';
import { useState } from 'react';
import Cart from '../../components/cart/Cart';
import Checkout from '../../components/cart/Checkout';
import { Grid } from '@mui/material';

export default function CartPage() {
    const [total, setTotal] = useState(0);
    return (
        <Grid container>
            <Grid item sx={8}>
                <Cart total={total} setTotal={setTotal} />
            </Grid>
            <Grid item sx={4}>
                <Checkout totalPrice={total} />
            </Grid>
        </Grid>
    );
}
