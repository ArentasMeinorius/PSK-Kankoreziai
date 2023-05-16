import React, { useState, useEffect } from 'react';

import { Button, Container, Grid, Typography } from '@mui/material';
import ItemCard from '../components/ItemCard';

const Landing = () => {
    const [flowerProducts, setFlowerProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/flower')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                setFlowerProducts(data);
            });
    }, []);

    return (
        <div>
            <Container
                sx={{
                    backgroundImage: `url(https://media.istockphoto.com/id/1295953969/vector/tropical-exotic-seamless-pattern-with-protea-flowers-in-tropical-leaves.jpg?s=612x612&w=0&k=20&c=4Fop3xlfWsBJWqYNosp7yF-9oLP93049Iv-4R59isXA=)`,
                    padding: 5,
                }}
                maxWidth={false}
            >
                <Typography variant="h1" align="center" sx={{ color: 'white' }}>
                    Flower Shop
                </Typography>
                <Button variant="contained" sx={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                    Shop now
                </Button>
            </Container>
            <Grid container spacing={2}>
                <Grid item xs={4} sx={{ margin: 'auto' }}>
                    <Typography variant="h4" align="center">
                        Our new addition
                    </Typography>
                    <Button variant="contained" sx={{ display: 'block', margin: 'auto' }}>
                        Shop now
                    </Button>
                </Grid>
                {flowerProducts.map((flowerProduct) => {
                    return (
                        <Grid key={flowerProduct.id} item xs={4}>
                            <ItemCard product={flowerProduct} />
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};

export default Landing;
