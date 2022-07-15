import React from "react";
import classes from "./Footer.module.css";


const Footer: React.FC<{}> = props => {
  return (
    <div className={classes.Footer}>
      Built by <a href="https://twitter.com/yolonouns" target="_blank" rel="noreferrer">@YOLONouns</a>
    </div>
  )
};

export default Footer;