import { Box } from "@mui/material";
import Test from "./Test";
import Thoughts from "./Thoughts";
import Task from "./Task";
import Time from "./Time";

const Features = () => {
  return (
    <Box>
      <Box >
        <Thoughts />
      </Box>
      <Box >
        <Test />
      </Box>
      <Box >
        <Time />
      </Box>
      <Box >
        <Task />
      </Box>
    </Box>
  );
};

export default Features;
