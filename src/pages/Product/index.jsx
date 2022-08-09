import { Component } from "react";
import NavBar from "../../components/NavBar";

class Product extends Component{
    constructor(props) {
        super(props);
      }

      render(){
        return(
            <>
            <NavBar/>
            <h1>Product Page</h1>
            </>
        )
      }
}

export default Product;