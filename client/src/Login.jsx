import React, { useRef, useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Context from "./store/context";
import { withRouter } from "react-router";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Login = props => {
  let loginName = useRef();
  let loginPass = useRef();
  const classes = useStyles();
  const context = useContext(Context);
  React.useEffect(() => {});
  const github = async () => {
    await axios.get("user/redirect");
  };
  const submit = async () => {
    await axios
      .post("user/login", {
        loginname: loginName.current.value,
        password: loginPass.current.value
      })
      .then(res => {
        if (!res.data.result) {
          context.changeState("wrong password or username");
        } else {
          window.localStorage.setItem("jwt", res.data.jwt);
          props.history.push({
            pathname: "/detail"
          });
        }
      })
      .catch(e => {
        console.log("axios error" + e);
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address or username"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={loginName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={loginPass}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => {
              submit();
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            Sign In
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => {
              window.location.href =
                "https://github.com/login/oauth/authorize?client_id=Iv1.87ee071250205a09";
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            Github
          </Button>
          <span style={{ color: "red" }}>{context.state && context.state}</span>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
export default withRouter(Login);
