import { Box } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useEffect } from 'react';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

const MyPost = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const cookie = Cookies.get(import.meta.env.VITE_COOKIE_KEY)
        if (!cookie) {
            navigate("/login")
        }
    }, [navigate])
    const data = [
        {
            "title": "The Rise of Artificial Intelligence: A Closer Look",
            "likes": 120,
            "dislikes": 10,
            "comments": 25
        }, {
            "title": "Climate Change: Urgent Actions Needed",
            "likes": 75,
            "dislikes": 5,
            "comments": 15
        }, {
            "title": "The Impact of Social Media on Mental Health",
            "likes": 200,
            "dislikes": 20,
            "comments": 40
        }, {
            "title": "Revolutionizing Healthcare with Technology",
            "likes": 50,
            "dislikes": 2,
            "comments": 10
        }
    ]


    return (
        <Box sx={{ width: "100%" }}>
            <TableContainer component={Paper} sx={{ width: "100%" }}>
                <Table aria-label="simple table" fullWidth >
                    <TableHead sx={{ backgroundColor: "#59e3a7" }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold", color: "white" }}>#</TableCell>
                            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Title</TableCell>
                            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Like</TableCell>
                            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Dislike</TableCell>
                            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Comment</TableCell>
                            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Visibility</TableCell>
                            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow
                                key={item.title}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell >{index + 1}</TableCell>
                                <TableCell >{item.title}</TableCell>
                                <TableCell >{item.likes}</TableCell>
                                <TableCell >{item.dislikes}</TableCell>
                                <TableCell >{item.comments}</TableCell>
                                <TableCell ><VisibilityOffIcon /></TableCell>
                                <TableCell >
                                    <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                        <EditIcon sx={{ border: "1px solid lightgray", borderRadius: "5px", padding: "5px", fontSize: "30px" }} />
                                        <DeleteIcon sx={{ border: "1px solid lightgray", borderRadius: "5px", padding: "5px", fontSize: "30px" }} />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default MyPost;
