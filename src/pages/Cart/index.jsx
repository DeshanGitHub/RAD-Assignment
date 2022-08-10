import { Grid, Paper, Typography } from "@mui/material";
import React, { Component } from "react";
import NavBar from "../../components/NavBar";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import PostService from "../../service/PostService";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: [],

      
    };
  }


  getUserData = async () => {
    let res = await PostService.fetchPost();

    if (res.status === 200) {
      this.setState({
        // loaded: true,
        userData: res.data,
      });
      //console.log(this.state.userData)
      //this.setState({ userCount: this.state.userData.length });
      //console.log("res: " + JSON.stringify(res.data));
    }
  };

  componentDidMount() {
    // console.log("Post Screen Mounted!");

    this.getUserData();
  }

  render() {
    

    const paperStyle = {
      padding: 10,
      height: "70vh",
      width: 900,
      margin: "50px auto",
    };
    return (
      <>
        <NavBar />
        <Grid container>
          <Grid item lg={12} md={12} sm={12} xm={12}>
            <Paper elevation={10} style={paperStyle}>
              <Grid container spacing={2}>
                <Grid item align="center" lg={12} md={12} sm={12} xm={12}>
                  <Typography variant="h3" gutterBottom component="div">
                    Cart Manage
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xm={6}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={this.state.userData}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="User Name" />
                    )}
                    getOptionLabel={(option) => option.username}
                    onChange={(e, value) => {
                      console.log(value.username + " " + value.name.firstname);
                    }}
                    size="small"
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xm={6}>
                  
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default Cart;
