import React, { Component } from "react";
import { Typography, Box } from "@material-ui/core";

export default class NotFindPage extends Component {
  render() {
    return (
      <div>
        <Typography variant={"h6"}>
          <Box p={2}>Sorry, the page does not exist!</Box>
        </Typography>
      </div>
    );
  }
}
