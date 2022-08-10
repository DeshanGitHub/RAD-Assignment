import { Component } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Avatar, Button } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Link from "@mui/material/Link";
import LoginService from "../../service/LoginService";
import SnackBar from "../../components/common/SnackBar";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formDataForLogin: {
        username: "",
        password: "",
      },

      alert: false,
      message: "",
      severity: "",
    };
  }

  LoginUser =async () => {
    let formDataForLogin = this.state.formDataForLogin;

    let res = await LoginService.postUserNameAndPassword(formDataForLogin);

    console.log(res); //print the promise

    if (res.status === 200) {
      window.location.href = "http://localhost:3000/dashBoard";
      
    } else {
      this.setState({
        alert: true,
        message: "Invalid User name password..!!",
        severity: "error",
      });
    }
  };

  goToDashBoard =  () => {
    //console.log(this.state.formDataForLogin)
    //  window.location.href = "http://localhost:3000/dashBoard";

    
  };

  render() {
    const btnStyle = {
      margin: "8px 0",
      width: 200,
    };

    const paperStyle = {
      padding: 20,
      height: "70vh",
      width: 500,
      margin: "70px auto",
    };

    const avatarStyle = {
      backgroundColor: "#006680",
      width: 50,
      height: 50,
    };

    return (
      <>
      <ValidatorForm ref="form" className="pt-2" onSubmit={this.LoginUser}>
        <Grid container alignContent="center">
          <Grid container spacing={0.5}>
            <Paper elevation={10} style={paperStyle}>
              <Grid container spacing={0.5} rowSpacing={2}>
                <Grid item align="center" lg={12} md={12} sm={12} xm={12}>
                  <Avatar style={avatarStyle}>
                    <LockOpenIcon style={{ width: 40, height: 40 }} />
                  </Avatar>
                  <h2>Login</h2>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xm={12}>
                  <TextValidator
                    id="outlined-size-small"
                    size="small"
                    placeholder="User Name"
                    //fullWidth
                    style={{ width: "100%" }}
                    variant="outlined"
                    value={this.state.formDataForLogin.username}
                    onChange={(e) => {
                      let formDataForLogin = this.state.formDataForLogin;
                      formDataForLogin.username = e.target.value;
                      this.setState({ formDataForLogin });
                    }}
                    validators={["required"]}
                    required
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xm={12}>
                  <TextValidator
                    id="outlined-size-small"
                    size="small"
                    placeholder="Password"
                    //fullWidth
                    style={{ width: "100%" }}
                    variant="outlined"
                    value={this.state.formDataForLogin.password}
                    onChange={(e) => {
                      let formDataForLogin = this.state.formDataForLogin;
                      formDataForLogin.password = e.target.value;
                      this.setState({ formDataForLogin });
                    }}
                    validators={["required"]}
                    required
                  />
                </Grid>
                <Grid item align="center" lg={12} md={12} sm={12} xm={12}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    style={btnStyle}
                    onClick={() => {
                      this.goToDashBoard();
                    }}
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xm={12}>
                  {/* <Typography variant="body2" gutterBottom>
                    Create new user account ? <Link to="/registration">Click here</Link>
                  </Typography> */}

                  <Typography variant="body2" gutterBottom>
                    Create new user account ?{" "}
                    <Link href="http://localhost:3000/registration">
                      Click here
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </ValidatorForm>
      <SnackBar
      open={this.state.alert}
      onClose={() => {
        this.setState({ alert: false });
      }}
      message={this.state.message}
      autoHideDuration={3000}
      severity={this.state.severity}
      variant="filled"
    />
    </>
    );
  }
}

export default Login;
