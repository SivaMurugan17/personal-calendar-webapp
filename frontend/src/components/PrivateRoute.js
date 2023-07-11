import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  if (JSON.parse(localStorage.getItem("user"))) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
