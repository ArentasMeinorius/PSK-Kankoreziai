import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { EditItem } from '../../components/admin/EditItem';
import { Container, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const AdminEditItem = ({ authKey }) => {
    const [productInfo, setProductInfo] = useState({});
    let { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/product/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authKey}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                setProductInfo(data);
            });
    }, [id, authKey]);

    if (productInfo && productInfo?.pictures) {
        return (
            <Container>
                <AdminHeader />
                <EditItem currentProduct={productInfo} newItem={false} />
            </Container>
        );
    } else return <Typography>Loading...</Typography>;
};

AdminEditItem.propTypes = {
    authKey: PropTypes.string,
};

export default AdminEditItem;
