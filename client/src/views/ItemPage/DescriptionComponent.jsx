import React from 'react';
import { Button, Container, Typography } from '@mui/material';

const DescriptionComponent = () => {
    const pricePlaceholder = '10 $';
    const quantityPlaceholder = '1';
    const descriptionPlaceholder =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet sem ante. Aliquam luctus ex quis orci ultricies euismod. Suspendisse porttitor vehicula neque, sed mollis risus consequat in. Nam accumsan pulvinar ligula sed pretium. Pellentesque nec eros nec quam lobortis dignissim. Sed nec nisi metus. Integer lobortis lorem nunc, ut laoreet quam blandit sed. Ut aliquam, ligula ac facilisis cursus, sapien mauris vulputate ligula, quis interdum magna orci vitae orci. Curabitur et ullamcorper ante.';
    const titlePlaceholder = 'Item Title ';
    return (
        <Container sx={{ backgroundColor: '#153E00', color: 'white', padding: 5 }}>
            <Typography variant="h4" noWrap={true}>
                {titlePlaceholder}
            </Typography>
            <Typography variant="h6">Price: {pricePlaceholder}</Typography>
            <Typography variant="body1">{descriptionPlaceholder}</Typography>
            <Typography variant="h6">Quantity: {quantityPlaceholder}</Typography>
            <Button variant="contained" sx={{ width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
                Add to cart
            </Button>
        </Container>
    );
};

export default DescriptionComponent;
