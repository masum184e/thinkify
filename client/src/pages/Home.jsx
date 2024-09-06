import Banner from "../../components/home/Banner";
import FAQ from "../../components/home/FAQ";
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
      <Newsletter />
      <FAQ />
      <Footer />
    </>
  );
};

export default Home;
