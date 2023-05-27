import React from 'react';
import { useState } from 'react';
import Cart from '../../components/cart/Cart';
import Checkout from '../../components/cart/Checkout';
import { Grid } from '@mui/material';

export default function CartPage() {
    const [total, setTotal] = useState(0);
    const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);

    return (
        <Grid container>
            {!isOrderSubmitted && (
                <Grid item xs={isOrderSubmitted ? 0 : 8}>
                    <Cart total={total} setTotal={setTotal} isOrderSubmitted={isOrderSubmitted} />
                </Grid>
            )}
            <Grid item xs={isOrderSubmitted ? 12 : 4}>
                <Checkout
                    totalPrice={total}
                    isOrderSubmitted={isOrderSubmitted}
                    setIsOrderSubmitted={setIsOrderSubmitted}
                />
            </Grid>
        </Grid>
    );
}
