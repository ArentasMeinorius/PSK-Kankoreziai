import React, {useEffect, useState}  from 'react';
import {Container, Grid, Typography} from "@mui/material";
import ItemCard from "../components/ItemCard";


const ProductsList = () => {
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
            <Grid container spacing={2}>
                <Grid item xs={12} align="center" justifyContent="center">
                    <Typography variant={"h3"} align={"center"}>
                        Products
                    </Typography>
                </Grid>
                {products.map((product) => {
                    return (
                        <Grid key={product.id} item xs={4}>
                            <ItemCard product={product} />
                        </Grid>
                    );
                })}
            </Grid>
            
            
        </Container>
    );
}

export default ProductsList;