import React from "react";
import {AdminHeader} from "../../components/admin/AdminHeader";
import {EditItem} from "../../components/admin/EditItem";

const AdminEditItem = () => {
    const defaultItem = {
        "name": "",
        "price": {
            "cents": 0
        },
        "description": "",
        "thumbnail": {
            "link": "https://springbreakisland-de.ams3.digitaloceanspaces.com/woocommerce-placeholder.png"
        },
        "pictures": {
            "links": []
        },
        "quantity": {
            "units": 5
        },
        "category": 0
    }
    
    return (
        <div>
            <AdminHeader/>
            <EditItem currentProduct={defaultItem} newItem={true}/>
        </div>
    );
}

export default AdminEditItem;