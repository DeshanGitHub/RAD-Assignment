import { Grid } from "@mui/material";
import { Component } from "react";
import NavBar from "../../components/NavBar";
import Typography from '@mui/material/Typography';
import PostService from "../../service/PostService";
import ProductService from "../../service/ProductService";
import CartService from "../../service/CartService";

class DashBoard extends Component{
    constructor(props) {
        super(props);

        this.state={
          userData:[],
          productsData:[],
          cartData:[],

          productCount:"00",
          cartCount:"00",
          userCount:"00"
        }
      }

      setCartCount =async () => {
        let res = await CartService.fetchCarts();

        if (res.status === 200) {
          this.setState({
           // loaded: true,
            cartData: res.data,
          });
          //console.log(this.state.userData.length)
          this.setState({ cartCount: this.state.cartData.length });
          //console.log("res: " + JSON.stringify(res.data));
        }
      };

      setProductCount =async () => {
        let res = await ProductService.fetchProducts();

        if (res.status === 200) {
          this.setState({
           // loaded: true,
            productsData: res.data,
          });
          //console.log(this.state.userData.length)
          this.setState({ productCount: this.state.productsData.length });
          //console.log("res: " + JSON.stringify(res.data));
        }
      };

      setUserCount =async () => {
        let res = await PostService.fetchPost();

        if (res.status === 200) {
          this.setState({
           // loaded: true,
            userData: res.data,
          });
          //console.log(this.state.userData.length)
          this.setState({ userCount: this.state.userData.length });
          //console.log("res: " + JSON.stringify(res.data));
        }
      };

      componentDidMount() {
       // console.log("Post Screen Mounted!");
    
        this.setUserCount();
        this.setProductCount();
        this.setCartCount();
      }

      render(){
        return(
            <>
            <NavBar/>
            
            <Grid container spacing={2}>
              <Grid item align="center" lg={4} md={4} sm={4} xm={4} style={{backgroundColor:"#bdc3c7", margin: "50px 50px 50px 90px", height:"35vh"}}>
                  <Typography variant="h2" gutterBottom component="div">
                    Products
                  </Typography>
                  <Typography variant="h2" gutterBottom component="div">
                    {this.state.productCount}
                  </Typography>
              </Grid>

              <Grid item align="center" lg={4} md={4} sm={4} xm={4} style={{backgroundColor:"#bdc3c7", margin: "50px 50px 50px 240px", height:"35vh"}}>
                  <Typography variant="h2" gutterBottom component="div">
                    Cart
                  </Typography>
                  <Typography variant="h2" gutterBottom component="div">
                    {this.state.cartCount}
                  </Typography>
              </Grid>

              <Grid item align="center" lg={4} md={4} sm={4} xm={4} style={{backgroundColor:"#bdc3c7", margin: "10px 50px 50px 480px", height:"35vh"}}>
                  <Typography variant="h2" gutterBottom component="div">
                    Users
                  </Typography>
                  <Typography variant="h2" gutterBottom component="div">
                    {this.state.userCount}
                  </Typography>
              </Grid>
            </Grid>
            </>
        )
      }
}

export default DashBoard;