import React from "react";
import { Link } from "react-router-dom";

const display = {
  flex: {
    display: "flex",
    margin: "87px",
  },
  size: {
    height: "80vh",
  },
  view: {
    alignSelf: "center",
    textAlign: "center",
  },
};

const NoMatch = () => {
  return (
    <div style={display.flex}>
      <aside>
        <img
          style={display.size}
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4424790/Mirror.png"
          alt="404img"
        />
      </aside>
      <div style={display.view}>
        <h1>Sorry!</h1>
        <p>
          Either you aren't cool enough to visit this page or it doesn't exist{" "}
          <em>. . . like your social life.</em>
        </p>
        <Link to="/">
          <h1> You can go now!</h1>
        </Link>
      </div>
    </div>
  );
};

export default NoMatch;
