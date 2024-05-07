import { Box, TextField } from '@mui/material';

import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useState } from 'react';

const AddPost = () => {
    const [value, setValue] = useState("Initial value");

    return (
        <Box m={2} sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", gap: "10px" }}>
                <Box sx={{ flex: "1" }}>
                    <Box>
                        <label htmlFor="" style={{ fontSize: "25px", fontWeight: "bold" }}>Title</label>
                        <TextField
                            placeholder="Enter Post Title"
                            fullWidth
                        />
                    </Box>
                    <Box>
                        <label htmlFor="" style={{ fontSize: "25px", fontWeight: "bold" }}>Tags</label>
                        <Box sx={{ border: "1px solid lightgray", padding: "7px ", borderRadius: "5px", display: "flex", gap: "5px" }}>
                            <span style={{ padding: "5px 10px", borderRadius: "25px", fontSize: "13px", backgroundColor: "#1b2e35", color: "white" }} >blockchain
                                <button style={{ background: "none", border: "none", outline: "none", color: "white" }}>X</button>
                            </span>
                            <span style={{ padding: "5px 10px", borderRadius: "25px", fontSize: "13px", backgroundColor: "#1b2e35", color: "white" }} >blockchain
                                <button style={{ background: "none", border: "none", outline: "none", color: "white" }}>X</button>
                            </span>
                            <span style={{ padding: "5px 10px", borderRadius: "25px", fontSize: "13px", backgroundColor: "#1b2e35", color: "white" }} >blockchain
                                <button style={{ background: "none", border: "none", outline: "none", color: "white" }}>X</button>
                            </span>
                            <span style={{ padding: "5px 10px", borderRadius: "25px", fontSize: "13px", backgroundColor: "#1b2e35", color: "white" }} >blockchain
                                <button style={{ background: "none", border: "none", outline: "none", color: "white" }}>X</button>
                            </span>
                            <input style={{ border: "none", outline: "none", display: "inline" }} type="text" />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ flex: "1" }}>
                    <Box>
                        <label htmlFor="" style={{ fontSize: "25px", fontWeight: "bold" }}>Title</label>
                        <SimpleMdeReact value={value} setValue={setValue} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AddPost;
