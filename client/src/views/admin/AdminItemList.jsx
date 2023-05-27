import { AdminHeader } from '../../components/admin/AdminHeader';
import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import { AdminItem } from '../../components/admin/Item';
import PropTypes from 'prop-types';

export default function AdminItemList({ authKey }) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/product')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                setProducts(data);
            });
    }, [authKey]);

    return (
        <Container>
            <AdminHeader />
            <Grid container>
                {products.map((product) => {
                    return (
                        <Grid
                            key={product.id}
                            item
                            xs={6}
                            wrap={'nowrap'}
                            spacing={2}
                            sx={{
                                border: 1,
                                borderColor: 'primary.main',
                                borderRadius: '16px',
                                mt: 1,
                            }}
                        >
                            <AdminItem product={product} authKey={authKey} />
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
}

AdminItemList.propTypes = {
    authKey: PropTypes.string,
};
