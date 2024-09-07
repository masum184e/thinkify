import {
  Box,
  TextField,
  Button,
  Typography,
  ButtonGroup,
  FormHelperText,
} from "@mui/material";
import PropTypes from "prop-types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useFormContext, Controller } from "react-hook-form";

const AddTask = ({ setSelectedDate, selectedDate }) => {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <Box
      sx={{
        backgroundColor: "#1b2e35",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "595px",
        minHeight: "325px",
        border: "2px solid #59e3a7",
        borderRadius: "5px",
        boxShadow: 24,
        p: 4,
      }}
    >
      <Box sx={{ display: "flex" }}>
        <TextField
          variant="outlined"
          label="Task Title"
          type="text"
          sx={{
            input: { color: "#59e3a7" },
            mt: 1,
            mr: 1,
            width: "50%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#59e3a7",
              },
              "&:hover fieldset": {
                borderColor: "#59e3a7",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#59e3a7",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#59e3a7",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#59e3a7",
            },
          }}
          {...register("title", { required: "Task title is required" })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            value={selectedDate}
            onChange={(newDate) => {
              setSelectedDate(newDate);
              setValue("date", newDate);
            }}
            label="Select a Date"
            renderInput={(params) => <TextField {...params} />}
            sx={{
              mt: 1,
              width: "50%",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#59e3a7",
                },
                "&:hover fieldset": {
                  borderColor: "#59e3a7",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#59e3a7",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#59e3a7",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#59e3a7",
              },
              "& .MuiIconButton-root": {
                color: "#59e3a7",
              },
              "& .MuiInputBase-inputAdornedEnd": {
                color: "#59e3a7",
              },
            }}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ display: "flex", mt: 1 }}>
        <TextField
          multiline
          rows={4}
          sx={{
            textarea: { color: "#59e3a7" },
            mt: 1,
            mr: 1,
            width: "50%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#59e3a7",
              },
              "&:hover fieldset": {
                borderColor: "#59e3a7",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#59e3a7",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#59e3a7",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#59e3a7",
            },
          }}
          variant="outlined"
          label="Task Description"
          {...register("description", {
            required: "Task description is required",
          })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <Box sx={{ width: "50%" }}>
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              mb: 2,
              width: "50%",
              color: "#59e3a7",
            }}
          >
            Task Priority
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Controller
              name="priority"
              control={control}
              rules={{ required: "Please select a priority" }}
              defaultValue=""
              render={({ field }) => (
                <>
                  <ButtonGroup
                    variant="outlined"
                    aria-label="outlined button group"
                    fullWidth
                  >
                    <Button
                      sx={{
                        backgroundColor:
                          field.value === "Low" ? "#59e3a7" : "transparent",
                        border: "1px solid #59e3a7",
                        color: field.value === "Low" ? "white" : "#59e3a7",
                        "&:hover": {
                          border: "1px solid #59e3a7",
                          backgroundColor: "#59e3a7",
                          color: "white",
                        },
                      }}
                      onClick={() => setValue("priority", "Low")}
                    >
                      Low
                    </Button>
                    <Button
                      onClick={() => setValue("priority", "Moderate")}
                      sx={{
                        backgroundColor:
                          field.value === "Moderate"
                            ? "#59e3a7"
                            : "transparent",
                        border: "1px solid #59e3a7",
                        color: field.value === "Moderate" ? "white" : "#59e3a7",
                        "&:hover": {
                          border: "1px solid #59e3a7",
                          backgroundColor: "#59e3a7",
                          color: "white",
                        },
                      }}
                    >
                      Moderate
                    </Button>
                    <Button
                      onClick={() => setValue("priority", "High")}
                      sx={{
                        backgroundColor:
                          field.value === "High" ? "#59e3a7" : "transparent",
                        border: "1px solid #59e3a7",
                        color: field.value === "High" ? "white" : "#59e3a7",
                        "&:hover": {
                          border: "1px solid #59e3a7",
                          backgroundColor: "#59e3a7",
                          color: "white",
                        },
                      }}
                    >
                      High
                    </Button>
                  </ButtonGroup>
                </>
              )}
            />
            {errors.priority && (
              <FormHelperText error>{errors.priority.message}</FormHelperText>
            )}
          </Box>
        </Box>
      </Box>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 2,
          color: "white",
          backgroundColor: "#59e3a7",
          "&:hover": { backgroundColor: "#59e3a7" },
        }}
      >
        Add
      </Button>
    </Box>
  );
};

AddTask.propTypes = {
  setSelectedDate: PropTypes.func.isRequired,
  selectedDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]).isRequired,
};

export default AddTask;
