import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

const Welcome = props => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Button
        variant="contained"
        className={classes.button}
        onClick={() => {
          props.history.push("/login");
        }}
      >
        Sign In
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => props.history.push("/register")}
      >
        Sign Up
      </Button>

      <div>Welcome</div>
    </React.Fragment>
  );
};
export default withRouter(Welcome);
