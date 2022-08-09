import {
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Component } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import DataTable from "../../components/common/DataTable";
import PostService from "../../service/PostService";
import EditIcon from "@mui/icons-material/Edit";
import SnackBar from "../../components/common/SnackBar";

class UserRegistration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loaded: false,

      formDataForPostUser: {
        email: "",
        username: "",
        password: "",
        name: {
          firstname: "",
          lastname: "",
        },
        address: {
          city: "",
          street: "",
          number: "",
          zipcode: "",
          geolocation: {
            lat: "",
            long: "",
          },
        },
        phone: "",
      },

      alert: false,
      message: "",
      severity: "",

      btnLabel: "Save",
      btnColor: "primary",

      updateUserId: "",
    };
  }

  deleteUser = async (userId) => {
    let res = await PostService.deleteUser(userId);

    if (res.status === 200) {
      this.setState({
        alert: true,
        message: "Successfully Deleted..",
        severity: "success",
      });
      this.clearTextFields();
      this.loadData();
    } else {
      this.setState({
        alert: true,
        message: "Not Deleted User !!",
        severity: "error",
      });
    }
  };

  updateUser = (data) => {
    // console.log(data);

    this.setState({
      btnLabel: "Update",
      btnColor: "secondary",

      updateUserId: data.id,

      formDataForPostUser: {
        email: data.email,
        username: data.username,
        password: data.password,
        name: {
          firstname: data.name.firstname,
          lastname: data.name.lastname,
        },
        address: {
          city: data.address.city,
          street: data.address.street,
          number: data.address.number,
          zipcode: data.address.zipcode,
          geolocation: {
            lat: data.address.geolocation.lat,
            long: data.address.geolocation.long,
          },
        },
        phone: data.phone,
      },
    });

    // console.log(this.state.updateUserId);
  };

  saveUserDetails = async () => {
    let formDataForPostUser = this.state.formDataForPostUser;

    if (this.state.btnLabel === "Save") {
      let res = await PostService.postUser(formDataForPostUser);

      //console.log(res); //print the promise

      if (res.status === 200) {
        this.setState({
          alert: true,
          message: "Saved User..",
          severity: "success",
        });
        this.clearTextFields();
        this.loadData();
      } else {
        this.setState({
          alert: true,
          message: "Not Saved User!!",
          severity: "error",
        });
      }
    } else {
      let res = await PostService.putUser(
        formDataForPostUser,
        this.state.updateUserId
      );

      //console.log(res)

      if (res.status === 200) {
        this.setState({
          alert: true,
          message: "Updated User..",
          severity: "success",
        });
        this.clearTextFields();
        this.loadData();
      } else {
        this.setState({
          alert: true,
          message: "Not Updated User!!",
          severity: "error",
        });
      }
    }
  };

  clearTextFields = () => {
    //console.log("clear textfields method calling")

    this.setState({
      formDataForPostUser: {
        email: "",
        username: "",
        password: "",
        name: {
          firstname: "",
          lastname: "",
        },
        address: {
          city: "",
          street: "",
          number: "",
          zipcode: "",
          geolocation: {
            lat: "",
            long: "",
          },
        },
        phone: "",
      },

      btnLabel: "Save",
      btnColor: "primary",
    });
  };

  // exampleForMap = () => {
  //   this.state.data.map((value, index) => {
  //     console.log(index);
  //     console.log(value);
  //   });
  // };

  loadData = async () => {
    let res = await PostService.fetchPost();

    if (res.status === 200) {
      this.setState({
        loaded: true,
        data: res.data,
      });
      //console.log(this.state.data)
      //console.log("res: " + JSON.stringify(res.data));
    }

    // this.exampleForMap();
  };

  componentDidMount() {
    //console.log("Post Screen Mounted!");

    this.loadData();
  }

  render() {
    const btnStyle = {
      margin: "8px 0",
      width: 130,
    };

    const paperStyle = {
      padding: 20,
      height: "65vh",
      width: "90vw",
      margin: "20px auto",
    };

    return (
      <>
        <ValidatorForm
          ref="form"
          className="pt-2"
          onSubmit={this.saveUserDetails}
        >
          <Grid container alignContent="center">
            <Grid container spacing={0.5}>
              <Paper elevation={10} style={paperStyle}>
                <Grid container spacing={4} rowSpacing={2}>
                  <Grid item align="center" lg={12} md={12} sm={12} xm={12}>
                    <Typography variant="h3" gutterBottom component="div">
                      User Registration
                    </Typography>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xm={6}>
                    <TextValidator
                      id="outlined-size-small"
                      size="small"
                      placeholder="First Name"
                      //fullWidth
                      style={{ width: "100%" }}
                      variant="outlined"
                      value={this.state.formDataForPostUser.name.firstname}
                      onChange={(e) => {
                        let formDataForPostUser =
                          this.state.formDataForPostUser;
                        formDataForPostUser.name.firstname = e.target.value;
                        this.setState({ formDataForPostUser });
                      }}
                      validators={["required"]}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xm={6}>
                    <TextValidator
                      id="outlined-size-small"
                      size="small"
                      placeholder="Last Name"
                      //fullWidth
                      style={{ width: "100%" }}
                      variant="outlined"
                      value={this.state.formDataForPostUser.name.lastname}
                      onChange={(e) => {
                        let formDataForPostUser =
                          this.state.formDataForPostUser;
                        formDataForPostUser.name.lastname = e.target.value;
                        this.setState({ formDataForPostUser });
                      }}
                      validators={["required"]}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xm={6}>
                    <TextValidator
                      id="outlined-size-small"
                      size="small"
                      placeholder="Email"
                      //fullWidth
                      style={{ width: "100%" }}
                      variant="outlined"
                      value={this.state.formDataForPostUser.email}
                      onChange={(e) => {
                        let formDataForPostUser =
                          this.state.formDataForPostUser;
                        formDataForPostUser.email = e.target.value;
                        this.setState({ formDataForPostUser });
                      }}
                      validators={["required"]}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xm={6}>
                    <TextValidator
                      id="outlined-size-small"
                      size="small"
                      placeholder="User Name"
                      //fullWidth
                      style={{ width: "100%" }}
                      variant="outlined"
                      value={this.state.formDataForPostUser.username}
                      onChange={(e) => {
                        let formDataForPostUser =
                          this.state.formDataForPostUser;
                        formDataForPostUser.username = e.target.value;
                        this.setState({ formDataForPostUser });
                      }}
                      validators={["required"]}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xm={6}>
                    <TextValidator
                      id="outlined-size-small"
                      size="small"
                      placeholder="Password"
                      //fullWidth
                      style={{ width: "100%" }}
                      variant="outlined"
                      value={this.state.formDataForPostUser.password}
                      onChange={(e) => {
                        let formDataForPostUser =
                          this.state.formDataForPostUser;
                        formDataForPostUser.password = e.target.value;
                        this.setState({ formDataForPostUser });
                      }}
                      validators={["required"]}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xm={6}>
                    <TextValidator
                      id="outlined-size-small"
                      size="small"
                      placeholder="City"
                      //fullWidth
                      style={{ width: "100%" }}
                      variant="outlined"
                      value={this.state.formDataForPostUser.address.city}
                      onChange={(e) => {
                        let formDataForPostUser =
                          this.state.formDataForPostUser;
                        formDataForPostUser.address.city = e.target.value;
                        this.setState({ formDataForPostUser });
                      }}
                      validators={["required"]}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xm={6}>
                    <TextValidator
                      id="outlined-size-small"
                      size="small"
                      placeholder="Street"
                      //fullWidth
                      style={{ width: "100%" }}
                      variant="outlined"
                      value={this.state.formDataForPostUser.address.street}
                      onChange={(e) => {
                        let formDataForPostUser =
                          this.state.formDataForPostUser;
                        formDataForPostUser.address.street = e.target.value;
                        this.setState({ formDataForPostUser });
                      }}
                      validators={["required"]}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xm={6}>
                    <TextValidator
                      id="outlined-size-small"
                      size="small"
                      placeholder="Street No"
                      //fullWidth
                      style={{ width: "100%" }}
                      variant="outlined"
                      value={this.state.formDataForPostUser.address.number}
                      onChange={(e) => {
                        let formDataForPostUser =
                          this.state.formDataForPostUser;
                        formDataForPostUser.address.number = e.target.value;
                        this.setState({ formDataForPostUser });
                      }}
                      validators={["required"]}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xm={6}>
                    <TextValidator
                      id="outlined-size-small"
                      size="small"
                      placeholder="Zip Code"
                      //fullWidth
                      style={{ width: "100%" }}
                      variant="outlined"
                      value={this.state.formDataForPostUser.address.zipcode}
                      onChange={(e) => {
                        let formDataForPostUser =
                          this.state.formDataForPostUser;
                        formDataForPostUser.address.zipcode = e.target.value;
                        this.setState({ formDataForPostUser });
                      }}
                      validators={["required"]}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xm={6}>
                    <TextValidator
                      id="outlined-size-small"
                      size="small"
                      placeholder="Lat Value"
                      //fullWidth
                      style={{ width: "100%" }}
                      variant="outlined"
                      value={
                        this.state.formDataForPostUser.address.geolocation.lat
                      }
                      onChange={(e) => {
                        let formDataForPostUser =
                          this.state.formDataForPostUser;
                        formDataForPostUser.address.geolocation.lat =
                          e.target.value;
                        this.setState({ formDataForPostUser });
                      }}
                      validators={["required"]}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xm={6}>
                    <TextValidator
                      id="outlined-size-small"
                      size="small"
                      placeholder="Long Value"
                      //fullWidth
                      style={{ width: "100%" }}
                      variant="outlined"
                      value={
                        this.state.formDataForPostUser.address.geolocation.long
                      }
                      onChange={(e) => {
                        let formDataForPostUser =
                          this.state.formDataForPostUser;
                        formDataForPostUser.address.geolocation.long =
                          e.target.value;
                        this.setState({ formDataForPostUser });
                      }}
                      validators={["required"]}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xm={6}>
                    <TextValidator
                      id="outlined-size-small"
                      size="small"
                      placeholder="Mobile No"
                      //fullWidth
                      style={{ width: "100%" }}
                      variant="outlined"
                      value={this.state.formDataForPostUser.phone}
                      onChange={(e) => {
                        let formDataForPostUser =
                          this.state.formDataForPostUser;
                        formDataForPostUser.phone = e.target.value;
                        this.setState({ formDataForPostUser });
                      }}
                      validators={["required"]}
                      required
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#95a5a6", color: "black" }}
                      onClick={() => {
                        //console.log("clicked!");
                        this.clearTextFields();
                      }}
                    >
                      Clear
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      color={this.state.btnColor}
                      variant="contained"
                      style={btnStyle}
                    >
                      {this.state.btnLabel}
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </ValidatorForm>

        <Grid container style={{ marginTop: "20px" }}>
          <Grid
            item
            align="center"
            style={{ backgroundColor: "#bdc3c7" }}
            lg={12}
            md={12}
            sm={12}
            xm={12}
          >
            <Typography variant="h3" gutterBottom component="div">
              User Table
            </Typography>
          </Grid>
        </Grid>

        <Grid container style={{ marginTop: "20px" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Customer table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">User ID</TableCell>
                  <TableCell align="left">First Name</TableCell>
                  <TableCell align="left">Last Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Phone</TableCell>
                  <TableCell align="left">Address</TableCell>

                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.data.map((row) => (
                  <TableRow>
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.name.firstname}</TableCell>
                    <TableCell align="left">{row.name.lastname}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">{row.address.city}</TableCell>

                    <TableCell align="left">
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => {
                            //console.log("Edit icon clicked");
                            this.updateUser(row);
                          }}
                        >
                          <EditIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => {
                            //console.log("Delete icon clicked");
                            this.deleteUser(row.id);
                          }}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
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

export default UserRegistration;
