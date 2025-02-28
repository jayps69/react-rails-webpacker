import PropTypes from "prop-types";

const Root = ({ greeting }) => {
  return <>Greeting: {greeting}</>;
};

Root.propTypes = {
  greeting: PropTypes.string
};

export default Root;
