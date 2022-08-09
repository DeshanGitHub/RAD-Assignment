import { Component } from "react";
import NavBar from "../../components/NavBar";

class Cart extends Component{
    constructor(props) {
        super(props);
      }

      render(){
        return(
            <>
            <NavBar/>
            <h1>Cart Page</h1>
            </>
        )
      }
}

export default Cart;