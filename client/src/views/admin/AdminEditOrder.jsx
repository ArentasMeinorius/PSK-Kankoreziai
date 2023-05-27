import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { Container, Typography } from '@mui/material';
import { EditOrder } from '../../components/admin/EditOrder';
import PropTypes from 'prop-types';

const AdminEditOrder = ({ authKey }) => {
    const [orderInfo, setOrderInfo] = useState({});
    let { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/order/${id}`, {
            method: 'GET',
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
                setOrderInfo(data);
            });
    }, [id, authKey]);

    if (Object.keys(orderInfo).length !== 0) {
        return (
            <Container>
                <AdminHeader />
                <EditOrder currentOrder={orderInfo} authKey={authKey} />
            </Container>
        );
    } else return <Typography>Loading...</Typography>;
};

AdminEditOrder.propTypes = {
    authKey: PropTypes.string,
};

export default AdminEditOrder;
