import {AdminHeader} from "../../components/admin/AdminHeader";
import React, { useState, useEffect } from 'react';
import {Grid} from "@mui/material";
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
        <div>
            <AdminHeader/>
            <Grid container sx={4}>
            {products.map((product) => {
                return (
                    <Grid key={product.id} item xs={6}>
                        <AdminItem product={product} />
                    </Grid>
                );
            })}
            </Grid>
        </div>
    )
}