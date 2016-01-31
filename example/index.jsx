//http://babeljs.io/docs/usage/polyfill/
require("babel-polyfill");

import React, { Component, PropTypes as t } from "react";
import ReactDOM from "react-dom";

import Root from "./root";

ReactDOM.render((
		<Root />
), document.getElementById("react-queryable-container-example"));
