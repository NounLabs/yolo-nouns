import React from "react";
import classes from "./Footer.module.css";
import { buildEtherscanAddressLink } from '../../utils/etherscan';
import config from '../../config';

const Footer: React.FC<{}> = props => {

  const etherscanURL = buildEtherscanAddressLink(config.yoloTokenAddress);
	
  return (
    <div className={classes.Footer}>
      <a href={etherscanURL} target="_blank" rel="noreferrer">Etherscan</a>
      &nbsp;&nbsp; | &nbsp;&nbsp;
      <a href="https://twitter.com/yolonouns" target="_blank" rel="noreferrer">@YOLONouns</a>
    </div>
  )
};

export default Footer;