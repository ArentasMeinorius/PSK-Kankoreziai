import React, { useState } from 'react';
import { Box, Container, Grid } from '@mui/material';

const ImagesComponent = (images) => {
    const [mainImage, setMainImage] = useState(images.showcase[0]);

    return (
        <Container sx={{ padding: 5 }}>
            <Box component="img" src={mainImage} sx={{ width: '100%' }}></Box>
            <Grid direction="row" container>
                {images.showcase.map((image, index) => {
                    return (
                        <Grid key={index} item xs={3}>
                            <Container
                                onClick={() => setMainImage(image)}
                                sx={{
                                    backgroundImage: `url(${image})`,
                                    padding: 5,
                                }}
                            ></Container>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
};

export default ImagesComponent;
