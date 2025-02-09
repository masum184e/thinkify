import PropTypes from "prop-types";

import Footer from "./Footer";
import NavBar from "./NavBar";

const PublicRoute = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;
