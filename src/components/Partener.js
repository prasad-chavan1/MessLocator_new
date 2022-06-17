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
import validate from "./validatePartener";
import "../Form.css";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GeoLocation from "./GeoLocation";
import SchoolIcon from '@mui/icons-material/School';
import Axios from "axios";

 
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



const useForm = (callback, validate,location,url) => {
  const [errors, setErrors] = useState({});
  const [ErrorsFlag, setErrorsFlag] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // console.log(location);

  const [values, setValues] = useState({
    MessName: "",
    OwnerName: "",
    HalfTime:"",
    FullTime:"",
    email: "",
    phone: "",
    password: "",
    clgname:"",
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
      
      let tosendval = {
        messname: values.MessName,
        ownername: values.OwnerName,
        halftime:values.HalfTime,
        fulltime:values.FullTime,
        email: values.email,
        phone: values.phone,
        password: values.password,
        clgname:values.clgname,
        url:url,
        location:location
      };
      // console.log(tosendval);
      async function sendReq() {
        fetch("http://localhost:5000/messes/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tosendval),
        })
          .then((res) => {
            console.log(res.status);
            if (res.status === 200) {
              console.log(res);
              alert("Mess Details added ...");
              window.location.href = "/SignIn";
            }
            if (res.status === 500) {
              setErrors({ email: "Email already exists" });
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

const Partener = ({ submitForm }) => {
  const classes = useStyles();
  const location = GeoLocation();
  // console.log(location);
  const [url,setUrl] = useState("");
  const uploadImage =(e)=>{
  
  const formData = new FormData();
  formData.append("file",e);
  formData.append("upload_preset","nagfhhez");
  formData.append("cloud_name","dyvtnooia");
  fetch("	https://api.cloudinary.com/v1_1/dyvtnooia/image/upload",{
            method:"post",
            body:formData
      }).then(res=>res.json())
        .then(data=>setUrl(data.url))
        .catch(err=>console.log(err))
    
  } 

  const { handleChange, values, handleSubmit, errors, ErrorsFlag } = useForm(
    submitForm,
    validate,
    location,
    url
  );

  return (
    <div className="container-signup">
      <div className="partener-content">
        <form onSubmit={handleSubmit} noValidate>
          <Typography variant="h4">Welcome</Typography>
          <Grid item xs={12}>
            <label htmlFor="MessName" className="form-label"></label>
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
              id="MessName"
              name="MessName"
              className="form-input"
              label="Mess Name"
              margin-right="20px"
              variant="standard"
              value={values.MessName}
              onChange={handleChange}
              error={ErrorsFlag.MessName}
            />
            <Typography variant="caption">
              {errors.MessName && <p style={{ color: "red" }}>{errors.MessName}</p>}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <label htmlFor="OwnerName" className="form-label"></label>
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
              id="OwnerName"
              name="OwnerName"
              className="form-input"
              label="Owner Name"
              margin-right="20px"
              style={{ marginTop: "20px" }}
              variant="standard"
              value={values.OwnerName}
              onChange={handleChange}
              error={ErrorsFlag.OwnerName}
            />
            <Typography variant="caption">
              {errors.OwnerName && <p style={{ color: "red" }}>{errors.OwnerName}</p>}
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
                fullWidth
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
              <label htmlFor="clgname" className="form-label"></label>

              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SchoolIcon />
                    </InputAdornment>
                  ),
                }}
                required={true}
                type="text"
                id="clgname"
                variant="standard"
                name="clgname"
                fullWidth
                style={{ marginTop: "20px" }}
                className="form-input"
                label="College Nearby"
                value={values.clgname}
                onChange={handleChange}
                error={ErrorsFlag.clgname}
              />

              <Typography variant="caption">
                {errors.clgname && (
                  <p style={{ color: "red" }}>{errors.clgname}</p>
                )}
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <label htmlFor="HalfTime" className="form-label"></label>

              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CurrencyRupeeIcon />
                    </InputAdornment>
                  ),
                }}
                required={true}
                type="text"
                id="HalfTime"
                variant="standard"
                name="HalfTime"
                fullWidth
                style={{ marginTop: "20px" }}
                className="form-input"
                label="Half Time Rate"
                value={values.HalfTime}
                onChange={handleChange}
                error={ErrorsFlag.HalfTime}
              />

              <Typography variant="caption">
                {errors.HalfTime && <p style={{ color: "red" }}>{errors.HalfTime}</p>}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <label htmlFor="FullTime" className="form-label"></label>

              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CurrencyRupeeIcon />
                    </InputAdornment>
                  ),
                }}
                required={true}
                type="text"
                id="FullTime"
                variant="standard"
                name="FullTime"
                fullWidth
                style={{ marginTop: "20px" }}
                className="form-input"
                label="Full Time Rate"
                value={values.FullTime}
                onChange={handleChange}
                error={ErrorsFlag.FullTime}
              />

              <Typography variant="caption">
                {errors.FullTime && (
                  <p style={{ color: "red" }}>{errors.FullTime}</p>
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}> 
            <label htmlFor="location" className="form-label"></label>

            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LocationOnIcon />
                  </InputAdornment>
                ),
              }}
              required={true}
              fullWidth
              variant="standard"
              style={{ marginTop: "20px" }}
              id="location"
              type="text"
              name="location"
              className="form-input"
              label="location"
              value={location.coordinates.lat+"/"+location.coordinates.lng}
              onChange={handleChange}
              error={ErrorsFlag.location}
            />
            <Typography variant="caption">
              {errors.location && (
                <p style={{ color: "red" }}>{errors.location}</p>
              )}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}> 
            <label htmlFor="image" className="form-label"></label>
            <input type="file"
            onChange={(event)=>{
              uploadImage(event.target.files[0]);
            }}
            />
          </Grid>

        </Grid>
          <Button
            type="submit"
            style={{ marginTop: "20px", backgroundColor: "black" }}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Done !
          </Button>
        </form>
        <div className="partener-img">
            <h1>Thank Your <br/>For Being <br/>Our Paretner</h1>
        </div>
      </div>
    </div>
  );
};

export default Partener;
