import React, { Component } from "react";
import { Typography, Box } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

export default class NotFindPage extends Component {
  render() {
    return (
      <div>
        <Typography variant={"h6"}>
          <Box p={2}> <FormattedMessage id="page_doest_not_exist" /></Box>
        </Typography>
      </div>
    );
  }
}
