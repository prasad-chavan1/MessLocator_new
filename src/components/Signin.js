import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
// import API from "../api";
import avatar from "../images/avatar.png";
import validate from "./ValidateSignin";
import "../Form.css";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    alignSelf: "center",
  },
}));

const useForm = (callback, validate) => {
  const [errors, setErrors] = useState({});
  const [ErrorsFlag, setErrorsFlag] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [values, setValues] = useState({
    username: "",
    password: "",
    role:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorsFlag(validate(values).errorsFlag);
    setErrors(validate(values).errors);
    setIsSubmitting(true);
  };

  const handleLogin = async (data) => {
    // try {
    //   await API.login(data);
    //   localStorage.setItem("isLoggedIn", true);
    //   alert("Logged In successfully!");
    // } catch (error) {
    //   console.error(error);
    // }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {

      let tosendval = {
        username: values.username,
        password: values.password,
        role:values.role
      };
      console.log(tosendval);
      async function sendReqStu() {
        fetch("http://localhost:5000/users/login",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(tosendval)
        }).then((res)=>{
          console.log(res);
          if(res.status===200){
            localStorage.setItem("username",values.username);
            localStorage.setItem("role",values.role);
            alert("Signed In Successfully....");
            window.location.href = "/";
          }
          else if (res.status === 500) {
            setErrors({ username: "Username doesn't exists" });
          }
          else if(res.status === 401){
            setErrors({ password: "Wrong Password" });
          }
        })
        .catch((err) => {
          console.log(err);
        })
      }

      async function sendReqOwn() {
        axios.post("http://localhost:5000/messes/login",tosendval)
        .then((res)=>{
          console.log(res);
          if(res.status===200){
            localStorage.setItem("username",res.data._id);
            localStorage.setItem("role",values.role);
            alert("Signed In Successfully....");
            window.location.href = `/EditMenu/${res.data._id}`;
          }
          else if (res.status === 500) {
            setErrors({ username: "Username doesn't exists" });
          }
          else if(res.status === 401){
            setErrors({ password: "Wrong Password" });
          }
        })
        .catch((err) => {
          console.log(err);
        })
      }

      if(values.role == "student"){
        sendReqStu();
      }
      else{
        sendReqOwn();
      }
      
      setIsSubmitting(false);
    }
  }, [errors, isSubmitting, callback, values]);
  return { handleChange, values, handleSubmit, errors, ErrorsFlag };
};

const Signin = ({ submitForm }) => {
  const classes = useStyles();

  const { handleChange, values, handleSubmit, errors, ErrorsFlag } = useForm(
    submitForm,
    validate
  );

  return (
    <div className="container-signup">
      <div className="login-content">
        <div className="login-img">
          <h1>Sign In <br/>Here</h1>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <img src={avatar} alt="login-avatar" />
          <Typography variant="h3">Welcome</Typography>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
                <InputLabel id="Role">Select Role</InputLabel>
                <Select
                  labelId="Role"
                  id="Role"
                  value={values.role}
                  label="role"
                  onChange={handleChange}
                  variant="standard"
                  name="role"
                >
                 <MenuItem value="student" key="student">
                     student
                  </MenuItem>
                  <MenuItem value="Owner" key="owner">
                      Owner
                  </MenuItem>
      
                </Select>
              </FormControl>
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="username" className="form-label"></label>

            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
              required={true}
              id="username"
              fullWidth
              style={{ marginTop: "20px" }}
              type="text"
              name="username"
              variant="standard"
              label="Username"
              value={values.username}
              onChange={handleChange}
              error={ErrorsFlag.Username}
            />

            <Typography variant="caption">
              {errors.username && (
                <p style={{ color: "red" }}>{errors.username}</p>
              )}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="password" className="form-label"></label>

            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <VpnKeyIcon />
                  </InputAdornment>
                ),
              }}
              required={true}
              fullWidth
              variant="standard"
              style={{ marginTop: "20px" }}
              id="password"
              type="password"
              name="password"
              className="form-input"
              label="Password"
              value={values.password}
              onChange={handleChange}
              error={ErrorsFlag.Password}
            />

            <Typography variant="caption">
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
              )}
            </Typography>
          </Grid>
          {/* <a href="#" style={{ marginTop: "4px" }}>
            Forgot Password?
          </a> */}
          <Button
            type="submit"
            style={{ marginTop: "20px", backgroundColor: "black" }}
            variant="contained"
            color="primary"
            className={"btn" + classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
