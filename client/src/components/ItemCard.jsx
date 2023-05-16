import React from 'react';
import { Box, Link, Typography } from '@mui/material';

const ItemCard = () => {
    const pricePlaceholder = '10 $';
    const titlePlaceholder = 'Item Title Placeholder';
    return (
        <Link href="/Item" variant="body1" underline="none">
            <Box
                component="img"
                src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"
                sx={{
                    width: '85%',
                }}
            ></Box>
            <Typography variant="subtitle1" noWrap={true}>
                {titlePlaceholder}
            </Typography>
            <Typography variant="body1">Price: {pricePlaceholder}</Typography>
        </Link>
    );
};

export default ItemCard;
