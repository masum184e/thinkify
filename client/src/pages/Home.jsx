import Banner from "../../components/home/Banner";
import Task from "../../components/home/features/Task";
import Thoughts from "../../components/home/features/Thoughts";
import Footer from "../../components/home/footer/Footer";
import Membership from "../../components/home/membership/Membership";
import Newsletter from "../../components/home/Newsletter";
import NavBar from "../layouts/NavBar";

const Home = () => {
  return (
    <>
      <NavBar />
      <Banner />
      <Thoughts />
      <Membership />
      <Task />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
