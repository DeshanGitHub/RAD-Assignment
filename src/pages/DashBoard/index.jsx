import { Component } from "react";
import NavBar from "../../components/NavBar";

class DashBoard extends Component{
    constructor(props) {
        super(props);
      }

      render(){
        return(
            <>
            <NavBar/>
            <h1>Dash Board Page</h1>
            </>
        )
      }
}

export default DashBoard;