import {
    Button,
    Grid,
    InputAdornment,
    TextField,
    Typography,
  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import React, { useEffect, useState } from "react";
import avatar from "../images/avatar.png";
import "../Form.css";
import { Edit, PanoramaSharp } from "@material-ui/icons";
import { useParams } from "react-router-dom";
  
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
  
  const useForm = (callback) => {
    const [errors, setErrors] = useState({});
    const [ErrorsFlag, setErrorsFlag] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const [values, setValues] = useState({
        item1:"",
        item2:"",
        item3:"",
        item4:"",
        item5:"",
        item6:"",
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
      setIsSubmitting(true);
    };
    const params = useParams();
    useEffect(() => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        
        let tosendval = {
            item1:values.item1,
            item2:values.item2,
            item3:values.item3,
            item4:values.item4,
            item5:values.item5,
            item6:values.item6,
            messID:params.id
        };
        console.log(tosendval);
        async function sendReq() {
          fetch("http://localhost:5000/menu/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tosendval),
          })
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                console.log(res);
                alert("Menu Updated ...");
                window.location.href = "/";
              }
              if (res.status === 400) {
                alert("Error ... ");
              }
            })
            .catch((err) => {

              console.log(err);
            });
        }
        sendReq();
        setIsSubmitting(false);
      }
    }, [errors, isSubmitting, callback, values]);
    return { handleChange, values, handleSubmit, errors, ErrorsFlag };
  };
  
  const EditMenu = ({ submitForm }) => {
    const classes = useStyles();
  
    const { handleChange, values, handleSubmit, errors, ErrorsFlag } = useForm(
      submitForm,
    );
  
    return (
      <div className="container-signup" id="menu-body">
        <div className="login-content">
        <form onSubmit={handleSubmit} noValidate id="menu-form">
        <Typography variant="h3" style={{"borderBottom":"2px solid grey"}}>Welcome</Typography>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <label htmlFor="item1" className="form-label"></label>
  
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CreateOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                required={true}
                id="item1"
                fullWidth
                style={{ marginTop: "20px" }}
                type="item1"
                name="item1"
                variant="standard"
                label="Item 1"
                value={values.item1}
                onChange={handleChange}
                error={ErrorsFlag.item1}
              />
  
              <Typography variant="caption">
                {errors.item1 && (
                  <p style={{ color: "red" }}>{errors.item1}</p>
                )}
              </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
              <label htmlFor="item2" className="form-label"></label>
  
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CreateOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                required={true}
                fullWidth
                variant="standard"
                style={{ marginTop: "20px" }}
                id="item2"
                type="text"
                name="item2"
                className="form-input"
                label="Item 2"
                value={values.item2}
                onChange={handleChange}
                error={ErrorsFlag.item2}
              />
  
              <Typography variant="caption">
                {errors.item2 && (
                  <p style={{ color: "red" }}>{errors.item2}</p>
                )}
              </Typography>
            </Grid>
            </Grid>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <label htmlFor="item3" className="form-label"></label>
  
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CreateOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                required={true}
                fullWidth
                variant="standard"
                style={{ marginTop: "20px" }}
                id="item3"
                type="text"
                name="item3"
                className="form-input"
                label="Item 3"
                value={values.item3}
                onChange={handleChange}
                error={ErrorsFlag.item3}
              />
  
              <Typography variant="caption">
                {errors.item3 && (
                  <p style={{ color: "red" }}>{errors.item3}</p>
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label htmlFor="item4" className="form-label"></label>
  
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CreateOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                required={true}
                fullWidth
                variant="standard"
                style={{ marginTop: "20px" }}
                id="item4"
                type="text"
                name="item4"
                className="form-input"
                label="Item 4"
                value={values.item4}
                onChange={handleChange}
                error={ErrorsFlag.item4}
              />
  
              <Typography variant="caption">
                {errors.item4 && (
                  <p style={{ color: "red" }}>{errors.item4}</p>
                )}
              </Typography>
            </Grid>
            </Grid>

            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <label htmlFor="item5" className="form-label"></label>
  
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CreateOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                required={true}
                fullWidth
                variant="standard"
                style={{ marginTop: "20px" }}
                id="item5"
                type="text"
                name="item5"
                className="form-input"
                label="Item 5"
                value={values.item5}
                onChange={handleChange}
                error={ErrorsFlag.item5}
              />
  
              <Typography variant="caption">
                {errors.item5 && (
                  <p style={{ color: "red" }}>{errors.item5}</p>
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label htmlFor="item6" className="form-label"></label>
  
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CreateOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                required={true}
                fullWidth
                variant="standard"
                style={{ marginTop: "20px" }}
                id="item6"
                type="text"
                name="item6"
                className="form-input"
                label="Item 6"
                value={values.item6}
                onChange={handleChange}
                error={ErrorsFlag.item6}
              />
  
              <Typography variant="caption">
                {errors.item6 && (
                  <p style={{ color: "red" }}>{errors.item6}</p>
                )}
              </Typography>
            </Grid>
            </Grid>
            <Button
              type="submit"
              style={{ marginTop: "20px", backgroundColor: "black" }}
              variant="contained"
              color="primary"
              className={"btn" + classes.submit}
            >
              Update Menu
            </Button>
          </form>
          <div className="menu-img">
              <h1>Update <br/>Today's Menu </h1>
          </div>
        </div>
      </div>
    );
  };
  
  export default EditMenu;
  