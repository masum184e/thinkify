import Banner from "../../components/home/Banner";
import Features from "../../components/home/features/Features";
import Footer from "../../components/home/footer/Footer";
import Membership from "../../components/home/membership/Membership";
import NavBar from "../layouts/NavBar";

const Home = () => {
  return (
    <>
      <NavBar />
      <Banner />
      <Features />
      <Membership />
      <Footer />
    </>
  );
};

export default Home;
