import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  ButtonGroup,
} from "@mui/material";
import PropTypes from "prop-types";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import { useState } from "react";

const AddTask = ({ openModal, setOpenModal }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { control, handleSubmit, register, setValue } = useForm();
  const onSubmit = (data) => {
    console.log(data, selectedDate.format("MMMM D, YYYY"));
  };
  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        backgroundColor: "#1b2e35",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "595px",
        height: "325px",
        border: "2px solid #59e3a7",
        borderRadius: "5px",
        boxShadow: 24,
        p: 4,
      }}
      slotProps={{
        backdrop: {
          style: { borderRadius: "5px" },
        },
      }}
    >
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              {...register("title", { required: true })}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                sx={{
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
                  "& .MuiOutlinedInput-input": {
                    color: "#59e3a7",
                  },
                }}
                components={["DesktopDatePicker "]}
              >
                <DesktopDatePicker
                  value={selectedDate}
                  onChange={(newDate) => {
                    setSelectedDate(newDate);
                  }}
                  label="Select a Date"
                />
              </DemoContainer>
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
              {...register("description", { required: true })}
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
                }}
              >
                <Controller
                  name="priority"
                  control={control}
                  rules={{ required: "Please select a priority" }}
                  defaultValue={null}
                  render={({ field }) => (
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
                          color:
                            field.value === "Moderate" ? "white" : "#59e3a7",
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
                  )}
                />
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
        </form>
      </Box>
    </Modal>
  );
};

AddTask.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};

export default AddTask;
