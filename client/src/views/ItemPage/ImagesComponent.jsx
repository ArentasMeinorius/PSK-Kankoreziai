import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Box, Container, Grid } from '@mui/material';

const ImagesComponent = ({ thumbnail, images }) => {
    const [mainImage, setMainImage] = useState(thumbnail.link);
    if (!!thumbnail && !!images) {
        return (
            <Container sx={{ padding: 5 }}>
                <Box component="img" src={mainImage} sx={{ width: '100%' }}></Box>
                <Grid direction="row" container>
                    <Grid item xs={3}>
                        <Container
                            onClick={() => setMainImage(thumbnail.link)}
                            sx={{
                                backgroundImage: `url(${thumbnail.link})`,
                                backgroundSize: '100%',
                                padding: 5,
                            }}
                        ></Container>
                    </Grid>
                    {images.links.map((image, index) => {
                        console.log('image: ', image);
                        return (
                            <Grid key={index} item xs={3}>
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
