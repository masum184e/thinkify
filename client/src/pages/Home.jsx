import Banner from "../../components/home/Banner";
import Features from "../../components/home/features/Features";
import Footer from "../../components/home/footer/Footer";
import Membership from "../../components/home/membership/Membership";
import Newsletter from "../../components/home/Newsletter";
import NavBar from "../layouts/NavBar";

const Home = () => {
  return (
    <>
      <NavBar />
      <Banner />
      <Features />
      <Newsletter />
      <Membership />
      <Footer />
    </>
  );
};

export default Home;
