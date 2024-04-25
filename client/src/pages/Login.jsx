import { Box, Typography, TextField, FormControlLabel, Checkbox, Button, Divider } from "@mui/material"
import { Link } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
    const handleSubmit = e => {
        e.preventDefault();
    }
    return (
        <>
            <Box height="100vh" sx={{ display: "flex" }}>
                <Box sx={{ flex: "1" }}></Box>
                <Box sx={{ flex: 1, backgroundColor: "#1b2e35", display: "flex", alignItems: "center" }}>
                    <Box width={1 / 2} mx="auto" my="auto" >
                        <Typography variant="h2" component="h2" sx={{ color: "white", fontSize: "2.25rem", fontWeight: "bold" }}>Welcome Back</Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
                            <TextField
                                fullWidth
                                placeholder="Enter Email"
                                sx={{
                                    mb: 2,
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "white",
                                        },
                                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "white",
                                        },
                                    },
                                    "& .MuiInputLabel-outlined": {
                                        color: "white",
                                    },
                                    "& .MuiInputBase-input": {
                                        "&::placeholder": {
                                            color: "white",
                                        },
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                placeholder="Enter Password"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "white",
                                        },
                                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "white",
                                        },
                                    },
                                    "& .MuiInputLabel-outlined": {
                                        color: "white",
                                    },
                                    "& .MuiInputBase-input": {
                                        "&::placeholder": {
                                            color: "white",
                                        },
                                    },
                                }}
                            />
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <FormControlLabel
                                    control={<Checkbox color="primary" />}
                                    label="Remember me"
                                    sx={{ mt: 1, color: "gray" }}
                                />
                                <Link style={{ color: "white" }} to="/forgot-password"><Typography variant="body2" >Forgot Password</Typography></Link>
                            </Box>
                            <Button type="submit" variant="contained" fullWidth sx={{ mt: 4 }}>Log In</Button>
                        </Box>
                        <Divider sx={{ my: 1, color: "white" }}>OR</Divider>
                        <Box>
                            <Button type="submit" variant="contained" fullWidth startIcon={<GoogleIcon />} >Continue With Google</Button>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="white" sx={{ mt: 4 }}>{`Don't`} Have an Account?<Link to="/registration" style={{ color: "white", marginLeft: "5px" }}>Join Now</Link></Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Login