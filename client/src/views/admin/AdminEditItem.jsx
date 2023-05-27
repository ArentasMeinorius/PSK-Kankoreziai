import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {AdminHeader} from "../../components/admin/AdminHeader";
import {EditItem} from "../../components/admin/EditItem";
import {Container, Typography} from "@mui/material";

const AdminEditItem = () => {
    const [productInfo, setProductInfo] = useState({});
    let { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/product/${id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                setProductInfo(data);
            });
    }, [id]);
    
    if (productInfo && productInfo?.pictures) {
        return (
            <Container>
                <AdminHeader/>
                <EditItem currentProduct={productInfo} newItem={false}/>
            </Container>
        );
    }
    else
        return <Typography>Loading...</Typography>;
    }
    
export default AdminEditItem;