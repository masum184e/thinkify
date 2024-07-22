import { Box } from "@mui/material";
import Footer from "../../components/home/footer/Footer";
import NavBar from "../layouts/NavBar";

const NotFound = () => {
  return (
    <>
      <NavBar />
      <Box maxWidth="1280px" mx="auto">
        <img src="/images/error.jpg" alt="NOTFOUND" style={{ width: "100%" }} />
      </Box>
      <Footer />
    </>
  );
};

export default NotFound;
