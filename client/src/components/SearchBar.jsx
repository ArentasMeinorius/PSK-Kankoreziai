import React, {useState} from 'react';
import {Button, Container, TextField} from "@mui/material";
import PropTypes from "prop-types";

const SearchBar = ({handleSearch, firstQuery}) => {
    const [query, setQuery] = useState(firstQuery ?? '');
    
    const handleQuery = () => {
        handleSearch(query);
    }
    
    return (
        <Container>
            <TextField
            id="search-field"
            onChange={(event) => setQuery(event.target.value)}
            sx={{
                height: '70%',
                width: '40%'
            }}
            placeholder="Write product name here..."
            onKeyPress={(event) => {
                if (event.key === 'Enter') {
                    setQuery(event.target.value);
                    handleQuery(event.target.value);
                }
            }}
            size={"small"}>
            </TextField>
            <Button
                onClick={handleQuery}
                variant="contained">
                Search
            </Button>
        </Container>
    )
}

SearchBar.propTypes = {
    handleSearch: PropTypes.func,
    firstQuery: PropTypes.string
};

export default SearchBar;