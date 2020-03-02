import React, { PureComponent } from "react";

const ICON = `M512 0C300.8 0 128 172.8 128 384c0 153.6 51.2 198.4 345.6 620.8 19.2 25.6 57.6 25.6 76.8 0C844.8 582.4 896 537.6 896 384 896 172.8 723.2 0 512 0z m224 400c0 17.68-14.32 32-32 32h-144v144c0 17.68-14.32 32-32 32h-32c-17.68 0-32-14.32-32-32v-144H320c-17.68 0-32-14.32-32-32v-32c0-17.68 14.32-32 32-32h144V192c0-17.68 14.32-32 32-32h32c17.68 0 32 14.32 32 32v144h144c17.68 0 32 14.32 32 32v32z`;

const pinStyle = {
  fill: "lightBlue",
  stroke: "none"
};

export default class Pin extends PureComponent {
  render() {
    const { size = 40 } = this.props;

    return (
      <svg height={size} viewBox="0 0 1024 1024" style={pinStyle}>
        <path d={ICON} />
      </svg>
    );
  }
}
