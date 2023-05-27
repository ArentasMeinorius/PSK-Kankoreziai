import React from "react";
import {AdminHeader} from "../../components/admin/AdminHeader";
import {EditItem} from "../../components/admin/EditItem";
import {Container} from "@mui/material";

const AdminEditItem = () => {
    const defaultItem = 
    {
        "name": "",
        "price": {
        "cents": 0
        },
        "description": "",
        "thumbnail": {
        "link": "https://springbreakisland-de.ams3.digitaloceanspaces.com/woocommerce-placeholder.png"
    },
        "pictures": {
        "links": [
            ""
        ]
    },
        "quantity": {
        "units": 0
    },
        "category": 0,
        "season": 0
    }
    
    return (
        <Container>
            <AdminHeader/>
            <EditItem currentProduct={defaultItem} newItem={true}/>
        </Container>
    );
}

export default AdminEditItem;