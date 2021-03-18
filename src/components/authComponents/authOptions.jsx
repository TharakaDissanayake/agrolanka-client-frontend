import React, { Component, useContext } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContext from "../../context/UserContext";

function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();
  const login = () => history.push("/login");
  const register = () => history.push("/register");
  const logout = () => {
    try {
      setUserData({
        token: undefined,
        user: undefined,
      });
      localStorage.setItem("auth-token", "");
    }
    catch (err) {
      console.log(err);
    }
  };
  return (
    <React.Fragment>
      {userData.user ? (
        <Button onClick={logout}
        // className="btn btn-success mr-2 mt-1"
        >
          Logout
        </Button>
      ) : (
          <>
            <Button onClick={login}
            // className="btn btn-success mr-2 mt-1"
            >
              Login
          </Button>
            <Button onClick={register}
            //  className="btn btn-success mr-2 mt-1"
            >
              Register
          </Button>
          </>
        )}
    </React.Fragment>
  );
}

export default AuthOptions;
