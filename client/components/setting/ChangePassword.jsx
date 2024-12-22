import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const handleMouseDownPassword = (event) => event.preventDefault();

  const onSubmit = (data) => {
    console.log("Form data: ", data);
  };

  const validateNewPassword = (value) => {
    return value.length >= 8 || "Password must be at least 8 characters long";
  };

  const validateRetypePassword = (value) => {
    return value === watch("newPassword") || "Passwords do not match";
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        label="Old Password"
        type={showOldPassword ? "text" : "password"}
        {...register("oldPassword", { required: "Old password is required" })}
        error={!!errors.oldPassword}
        helperText={errors.oldPassword ? errors.oldPassword.message : ""}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowOldPassword(!showOldPassword)}
                onMouseDown={handleMouseDownPassword}
              >
                {showOldPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="New Password"
        type={showNewPassword ? "text" : "password"}
        {...register("newPassword", {
          required: "New password is required",
          validate: validateNewPassword,
        })}
        error={!!errors.newPassword}
        helperText={errors.newPassword ? errors.newPassword.message : ""}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowNewPassword(!showNewPassword)}
                onMouseDown={handleMouseDownPassword}
              >
                {showNewPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Retype New Password"
        type={showRetypePassword ? "text" : "password"}
        {...register("retypePassword", {
          required: "Please retype your new password",
          validate: validateRetypePassword,
        })}
        error={!!errors.retypePassword}
        helperText={errors.retypePassword ? errors.retypePassword.message : ""}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowRetypePassword(!showRetypePassword)}
                onMouseDown={handleMouseDownPassword}
              >
                {showRetypePassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        variant="contained"
        type="submit"
        sx={{
          backgroundColor: "#59e3a7",
          "&:hover": { backgroundColor: "#59e3a7" },
        }}
      >
        Change Password
      </Button>
    </Box>
  );
};

export default ChangePassword;
