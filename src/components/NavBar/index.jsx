import { Button } from "@mui/material";
import { Component } from "react";
import { Link } from "react-router-dom";
import ReorderIcon from "@mui/icons-material/Reorder";
import "../../assets/styles/NavBar.css"

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
        <div className="navbar">
        <div
          className="leftSide"
          //id={this.state.isReorderOpen == 0 ? "close" : "open"}
        >
          {/* <img src={car_rental_logo} alt="Car Rental Logo" /> */}
          <div className="hiddenLinks">
            {/* <Link to="/">Home</Link>
            <Link to="/cars">Cars</Link>
            <Link to="/aboutUs">About Us</Link>
            <Link to="/contactUs">Contact Us</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link> */}
          </div>
        </div>
        <div className="rightSide">
          <Link to="/dashBoard">Dash Board</Link>
          <Link to="/product">Product</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/dashBoard">User Name</Link>          
          <Link to="/">Logout</Link>

          {/* Added Reoder Icon */}
          {/* <Button
            onClick={() => {
              this.clickedNavBar();
            }}
          >
            <ReorderIcon />
          </Button> */}
        </div>
      </div>
    )
  }
}

export default NavBar;
