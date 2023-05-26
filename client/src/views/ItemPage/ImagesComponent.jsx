import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Box, Container, Grid } from '@mui/material';

const ImagesComponent = ({ images }) => {
    const [mainImage, setMainImage] = useState('');

    useEffect(() => {
        setMainImage(images[0]);
    }, [images]);
    if (images) {
        return (
            <Container>
                <Grid direction="row" container>
                    <Grid item xs={12}>
                        <Box component="img" src={mainImage} sx={{ height: '50vh', width: '50vh' }}></Box>
                    </Grid>
                    {images.map((image, index) => {
                        return (
                            <Grid key={index} item xs={1}>
                                <Container
                                    onClick={() => setMainImage(image)}
                                    sx={{
                                        backgroundImage: `url(${image})`,
                                        backgroundSize: '100%',
                                        padding: 5,
                                    }}
                                ></Container>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        );
    }
};

ImagesComponent.propTypes = {
    images: PropTypes.object,
    thumbnail: PropTypes.object,
};

export default ImagesComponent;
