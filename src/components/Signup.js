import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import React, { useEffect, useState } from "react";
import avatar from "../images/avatar.png";
import validate from "./validateSignup";
import "../Form.css";

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
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
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

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      console.log(values);
      let tosendval = {
        name: values.name,
        username: values.username,
        email: values.email,
        phone: values.phone,
        password: values.password,
      };
      async function sendReq() {
        fetch("http://localhost:5000/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tosendval),
        })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              console.log(res);
              alert("User added successfully ...");
              window.location.href = "/SignIn";
            }
            if (res.status === 400) {
              setErrors({ username: "Username already exists" });
            }
          })
          .catch((err) => {
            if (err.response.status === 400) {
              setErrors({ username: "Username already exists" });
            }
            console.log(err);
          });
      }
      sendReq();
      setIsSubmitting(false);
    }
  }, [errors, isSubmitting, callback, values]);
  return { handleChange, values, handleSubmit, errors, ErrorsFlag };
};

const Signup = ({ submitForm }) => {
  const classes = useStyles();

  const { handleChange, values, handleSubmit, errors, ErrorsFlag } = useForm(
    submitForm,
    validate
  );

  return (
    <div className="container-signup">
      {/* <div className="img">
        <img src={signup} alt="signup-img" />
      </div> */}
      <div className="login-content">
        <form onSubmit={handleSubmit} noValidate>
          <img src={avatar} alt="signup-alt" />
          <Typography variant="h4">Create an account</Typography>
          <Grid item xs={12}>
            <label htmlFor="name" className="form-label"></label>
            <TextField
              color="success"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
              required={true}
              type="text"
              fullWidth
              id="name"
              name="name"
              className="form-input"
              label="Name"
              margin-right="20px"
              variant="standard"
              value={values.name}
              onChange={handleChange}
              error={ErrorsFlag.name}
            />
            <Typography variant="caption">
              {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <label htmlFor="phone" className="form-label"></label>

              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PhoneAndroidIcon />
                    </InputAdornment>
                  ),
                }}
                required={true}
                type="tel"
                id="phone"
                variant="standard"
                name="phone"
                style={{ marginTop: "20px" }}
                className="form-input"
                label="Phone Number"
                value={values.phone}
                onChange={handleChange}
                error={ErrorsFlag.Phone}
              />

              <Typography variant="caption">
                {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
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
                type="text"
                id="username"
                variant="standard"
                name="username"
                style={{ marginTop: "20px" }}
                className="form-input"
                label="Username"
                value={values.username}
                onChange={handleChange}
                error={ErrorsFlag.username}
              />

              <Typography variant="caption">
                {errors.username && (
                  <p style={{ color: "red" }}>{errors.username}</p>
                )}
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <label htmlFor="email" className="form-label"></label>

            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              required={true}
              fullWidth
              type="text"
              id="email"
              variant="standard"
              name="email"
              style={{ marginTop: "20px" }}
              className="form-input"
              label="E-mail"
              value={values.email}
              onChange={handleChange}
              error={ErrorsFlag.email}
            />

            <Typography variant="caption">
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
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
              error={ErrorsFlag.Password1}
            />

            <Typography variant="caption">
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
              )}
            </Typography>
          </Grid>
          <Button
            type="submit"
            style={{ marginTop: "20px", backgroundColor: "black" }}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
        <div className="signup-img">
            <h1>Sign Up <br/>Here</h1>
        </div>
      </div>
    </div>
  );
};

export default Signup;
