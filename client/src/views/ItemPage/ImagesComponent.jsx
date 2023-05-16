import React, { useState } from 'react';
import { Box, Container, Grid } from '@mui/material';

const ImagesComponent = () => {
    const image = 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png';
    const [mainImage, setMainImage] = useState(image);

    const diffImage =
        'https://media.istockphoto.com/id/1295953969/vector/tropical-exotic-seamless-pattern-with-protea-flowers-in-tropical-leaves.jpg?s=612x612&w=0&k=20&c=4Fop3xlfWsBJWqYNosp7yF-9oLP93049Iv-4R59isXA=';

    return (
        <Container sx={{ padding: 5 }}>
            <Box component="img" src={mainImage} sx={{ width: '100%' }}></Box>
            <Grid direction="row" container>
                <Grid item xs={3}>
                    <Container
                        onClick={() => setMainImage(image)}
                        sx={{
                            backgroundImage: `url(${image})`,
                            padding: 5,
                        }}
                    ></Container>
                </Grid>
                <Grid item xs={3}>
                    <Container
                        onClick={() => setMainImage(diffImage)}
                        sx={{
                            backgroundImage: `url(https://media.istockphoto.com/id/1295953969/vector/tropical-exotic-seamless-pattern-with-protea-flowers-in-tropical-leaves.jpg?s=612x612&w=0&k=20&c=4Fop3xlfWsBJWqYNosp7yF-9oLP93049Iv-4R59isXA=)`,
                            padding: 5,
                        }}
                    ></Container>
                </Grid>
                <Grid item xs={3}>
                    <Container
                        onClick={() => setMainImage(diffImage)}
                        sx={{
                            backgroundImage: `url(https://media.istockphoto.com/id/1295953969/vector/tropical-exotic-seamless-pattern-with-protea-flowers-in-tropical-leaves.jpg?s=612x612&w=0&k=20&c=4Fop3xlfWsBJWqYNosp7yF-9oLP93049Iv-4R59isXA=)`,
                            padding: 5,
                        }}
                    ></Container>
                </Grid>
            </Grid>
        </Container>
    );
};

/*<Grid direction="row" container>
                <Grid item xs={3}>
                    <Container
                        sx={{
                            backgroundImage: `url(${image})`,
                            padding: 5,
                        }}
                    ></Container>
                </Grid>
                <Grid item xs={3}>
                    <Container
                        onClick={changeMainImage(
                            'https://media.istockphoto.com/id/1295953969/vector/tropical-exotic-seamless-pattern-with-protea-flowers-in-tropical-leaves.jpg?s=612x612&w=0&k=20&c=4Fop3xlfWsBJWqYNosp7yF-9oLP93049Iv-4R59isXA='
                        )}
                        sx={{
                            backgroundImage: `url(https://media.istockphoto.com/id/1295953969/vector/tropical-exotic-seamless-pattern-with-protea-flowers-in-tropical-leaves.jpg?s=612x612&w=0&k=20&c=4Fop3xlfWsBJWqYNosp7yF-9oLP93049Iv-4R59isXA=)`,
                            padding: 5,
                        }}
                    ></Container>
                </Grid>
                <Grid item xs={3}>
                    <Container
                        onClick={changeMainImage(
                            'https://media.istockphoto.com/id/1295953969/vector/tropical-exotic-seamless-pattern-with-protea-flowers-in-tropical-leaves.jpg?s=612x612&w=0&k=20&c=4Fop3xlfWsBJWqYNosp7yF-9oLP93049Iv-4R59isXA='
                        )}
                        sx={{
                            backgroundImage: `url(https://media.istockphoto.com/id/1295953969/vector/tropical-exotic-seamless-pattern-with-protea-flowers-in-tropical-leaves.jpg?s=612x612&w=0&k=20&c=4Fop3xlfWsBJWqYNosp7yF-9oLP93049Iv-4R59isXA=)`,
                            padding: 5,
                        }}
                    ></Container>
                </Grid>
            </Grid> */
export default ImagesComponent;
