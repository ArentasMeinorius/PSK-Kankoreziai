import React, {useEffect, useState}  from 'react';
import {Container, Grid, Typography} from "@mui/material";
import ItemCard from "../components/ItemCard";
import Fuse from "fuse.js";
import SearchBar from "../components/SearchBar";


const ProductsList = () => {
    const searchOptions = {
        includeScore: true,
        useExtendedSearch: true,
        threshold: 0.1,
        ignoreLocation: true,
        keys: ['name']
    }
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const productsSearch = new Fuse(allProducts, searchOptions);
    
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
                setAllProducts(data);
            });
    }, []);
    
    const handleSearch = (query) => {
        if (!query) {
            setProducts(allProducts);
            return;
        }
        setProducts(productsSearch.search(query).map((qr) => qr.item));
    }
    
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} align="center" justifyContent="center">
                    <Typography variant={"h3"} align={"center"}>
                        Products
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center" justifyContent="center">
                    <SearchBar handleSearch={handleSearch} firstQuery={''}/>
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