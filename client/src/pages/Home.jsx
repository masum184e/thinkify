import { useEffect } from "react"; // Import useEffect
import AOS from "aos";
import "aos/dist/aos.css";

import Banner from "../../components/home/Banner";
import FAQ from "../../components/home/FAQ";
import Features from "../../components/home/features/Features";
import Footer from "../../components/home/footer/Footer";
import Membership from "../../components/home/membership/Membership";
import Newsletter from "../../components/home/Newsletter";
import NavBar from "../layouts/NavBar";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <>
      <NavBar />
      <Banner />
      <Features />
      <Newsletter />
      <Membership />
      <FAQ />
      <Footer />
    </>
  );
};

export default Home;
