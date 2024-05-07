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

const MyPost = () => {
    const rows = [
        { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
        { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
        { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
        { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
        { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 }
    ]

    return (
        <Box m={2} sx={{ width: "100%" }}>
            <TableContainer component={Paper} sx={{ width: "100%" }}>
                <Table aria-label="simple table" fullWidth >
                    <TableHead sx={{ backgroundColor: "#59e3a7" }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Like</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Dislike</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Comment</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Comment</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Visibility</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell >{index + 1}</TableCell>
                                <TableCell >{row.name}</TableCell>
                                <TableCell >{row.calories}</TableCell>
                                <TableCell >{row.fat}</TableCell>
                                <TableCell >{row.carbs}</TableCell>
                                <TableCell >{row.protein}</TableCell>
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
