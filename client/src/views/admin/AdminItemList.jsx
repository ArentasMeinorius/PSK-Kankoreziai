import {AdminHeader} from "../../components/admin/AdminHeader";
import React, { useState, useEffect } from 'react';
import {Container, Grid} from "@mui/material";
import {AdminItem} from "../../components/admin/Item";

export default function AdminItemList() {
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
    }, []);
    
    return (
        <Container>
            <AdminHeader/>
            <Grid container >
            {products.map((product) => {
                return (
                    <Grid key={product.id} item xs={6} wrap={"nowrap"} spacing={2} sx={{
                        border: 1,
                        borderColor: 'primary.main',
                        borderRadius: '16px',
                        mt: 1
       
                    }}>
                        <AdminItem product={product} />
                    </Grid>
                );
            })}
            </Grid>
        </Container>
    )
}