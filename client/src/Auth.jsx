import React from "react";
import { withRouter } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  }
}));

const Auth = props => {
  const classes = useStyles();
  const getToken = async code => {
    await axios({
      method: "post",
      url: "user/oauth",
      data: {
        code: code
      }
    }).then(res => {
      console.log(res);
    });
  };
  React.useEffect(() => {
    let code = props.location.search
      .split("?")[1]
      .split("&")[0]
      .split("=")[1];
    // let state = props.location.search
    //   .split("?")[1]
    //   .split("&")[1]
    //   .split("=")[1];
    getToken(code);
  });
  return (
    <div>
      <CircularProgress className={classes.progress} color="secondary" />
    </div>
  );
};
export default withRouter(Auth);
