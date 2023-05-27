import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {AdminHeader} from "../../components/admin/AdminHeader";
import {Container, Typography} from "@mui/material";
import {EditOrder} from "../../components/admin/EditOrder";

const AdminEditOrder = () => {
    const [orderInfo, setOrderInfo] = useState({});
    let { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('authKey');
        fetch(`http://localhost:5000/order/get/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
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
    }, [id]);
    
    if (Object.keys(orderInfo).length !== 0) {
        return (
            <Container>
                <AdminHeader/>
                <EditOrder currentOrder={orderInfo}/>
            </Container>
        );
    }
    else
        return <Typography>Loading...</Typography>;
}

export default AdminEditOrder;