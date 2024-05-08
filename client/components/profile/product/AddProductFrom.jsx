import { Box, Button, TextField, IconButton } from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';

const AddProductFrom = () => {
    return (
        <>
            <Box>
                <TextField
                    label="Product Title"
                    placeholder="Enter Product Title"
                    fullWidth
                    sx={{ marginBottom: 1 }}
                />
                <Button variant="contained"
                    sx={{
                        backgroundColor: "#59e3a7",
                        marginBottom: 1
                    }}
                    fullWidth >Upload Images</Button>
                <Box>
                    <Box sx={{ position: "relative", display: "inline" }}>
                        <img src="/images/banner.jpg" alt="" width="100" style={{ border: "1px solid #59e3a7", borderRadius: "5px" }} />
                        <IconButton aria-label="delete" sx={{ position: "absolute", right: "-10px", zIndex: "500", bottom: "0", color: "red" }} >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>

                <TextField
                    label="Product Price"
                    placeholder="Enter Product Price"
                    fullWidth
                />

                <TextField
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    sx={{ marginY: 1 }}

                />

                <Button variant="contained" fullWidth sx={{ backgroundColor: "#59e3a7" }} >Add</Button>
            </Box>
        </>
    )
}

export default AddProductFrom