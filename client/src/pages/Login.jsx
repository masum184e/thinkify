import { Box, Typography, TextField, FormControlLabel, Checkbox, Button, Divider } from "@mui/material"
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie'
import { useEffect } from "react";

const Login = () => {
    const navigate = useNavigate();
    const { alertMessage, alertBoxOpenStatus, setAlertBoxOpenStatus, setAlertMessage, setAlertSeverity } = useThinkify();
    const { login, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
    });
    const onSubmit = async (data) => {
        try {
            const response = await axios({
                baseURL: import.meta.env.VITE_SERVER_ENDPOINT,
                url: "/users/login",
                withCredentials: true,
                method: "POST",
                data
            });
            if (response.data.status) {
                navigate("/profile")
                console.log(response.data.message);
            } else {
                setAlertBoxOpenStatus(true);
                setAlertSeverity("error");
                setAlertMessage(response.data.message)
                console.log(alertBoxOpenStatus, alertMessage)
            }
        } catch (error) {
            console.log(error);
            setAlertBoxOpenStatus(true);
            setAlertSeverity("error");
            setAlertMessage(error.message)
            console.log(alertBoxOpenStatus, alertMessage)
        }
    };
    useEffect(() => {
        const cookie = Cookies.get(import.meta.env.VITE_COOKIE_KEY)
        if (cookie) {
            navigate("/profile")
        }
    }, [navigate]);

    return (
        <>
            <Box height="100vh" sx={{ display: "flex" }}>
                <Box sx={{
                    flex: "1",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Box>
                        <img src="/images/auth.jpg" alt="" />
                    </Box>
                </Box>
                <Box sx={{ flex: 1, backgroundColor: "#1b2e35", display: "flex", alignItems: "center" }}>
                    <Box width={1 / 2} mx="auto" my="auto" >
                        <Typography variant="h2" component="h2" sx={{ color: "white", fontSize: "2.25rem", fontWeight: "bold" }}>Welcome Back</Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4 }}>
                            <TextField
                                fullWidth
                                placeholder="Enter Email"
                                sx={{
                                    mb: 1,
                                    color: "white",
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
                                {...login("email", { required: true })}
                            />
                            {errors.email && <Typography variant="p" component="p" sx={{ color: "red", mb: 2 }}>{errors.email.message}</Typography>}
                            <TextField
                                fullWidth
                                placeholder="Enter Password"
                                type="password"
                                sx={{
                                    mb: 1,
                                    color: "white",
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
                                {...login("password", { required: true })}
                            />
                            {errors.password && <Typography variant="p" component="p" sx={{ color: "red" }}>{errors.password.message}</Typography>}
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