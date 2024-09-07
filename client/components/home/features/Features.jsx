import { Box } from "@mui/material";
import Test from "./Test";
import Thoughts from "./Thoughts";
import Task from "./Task";
import Time from "./Time";

const Features = () => {
  return (
    <Box>
      <Box data-aos="fade-up">
        <Thoughts />
      </Box>
      <Box data-aos="fade-up">
        <Test />
      </Box>
      <Box data-aos="fade-up">
        <Time />
      </Box>
      <Box data-aos="fade-up">
        <Task />
      </Box>
    </Box>
  );
};

export default Features;
