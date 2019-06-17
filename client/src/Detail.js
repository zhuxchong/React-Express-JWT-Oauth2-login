import React, { useEffect, useContext, useState } from "react";
import { withRouter } from "react-router";
import Context from "./store/context";
import axios from "axios";
import Button from "@material-ui/core/Button";

const Detail = props => {
  const context = useContext(Context);
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    if (!window.localStorage.jwt) {
      context.changeState("you need login first");
      props.history.push({
        pathname: "/login"
      });
    } else {
      axios({
        method: "post",
        url: "user/auth",
        headers: {
          authorization: window.localStorage.jwt
        }
      }).then(res => {
        setUser(res.data.user);
      });
    }
  }, []);
  const logout = () => {
    window.localStorage.removeItem("jwt");
    props.history.push({
      pathname: "/login"
    });
  };
  return (
    <React.Fragment>
      <div>{user}</div>
      <Button variant="contained" color="primary" onClick={logout}>
        Logout
      </Button>
    </React.Fragment>
  );
};
export default withRouter(Detail);
