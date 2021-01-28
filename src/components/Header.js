import React from "react"; //if we use class based component, this is necessary
import PropTypes from "prop-types";
import Button from "./Button";

//function based component
const Header = ({ name, children }) => {
  function onClick() {
    console.log("click", children);
  }
  return (
    <header className="header">
      {children}
      <h1 style={{ color: "red", backgroundColor: "black" }}>Hello {name}</h1>
      <h2 style={headingStyle}>Hello {name}</h2>
      <Button text="Add" color="green" onClick={onClick} />
      <Button text="NewAdd" color="blue" />
      <Button text="NewerAdd" />
    </header>
  );
};

const headingStyle = {
  color: "red",
  backgroundColor: "pink",
};

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

//Class based component
//class App extends React.Component{
//render(){
//return <h1>Hello</h1>
//}
//}

export default Header;
