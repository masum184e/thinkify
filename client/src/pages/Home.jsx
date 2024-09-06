import Banner from "../../components/home/Banner"
import Footer from "../../components/home/footer/Footer"
import Membership from "../../components/home/membership/Membership"
import NavBar from "../layouts/NavBar"

const Home = () => {
    return (
        <>
            <NavBar />
            <Banner />
            <Membership />
            <Footer />
        </>
    )
}

export default Home