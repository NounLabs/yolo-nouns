import classes from './NavBar.module.css';
//import { useEtherBalance } from '@usedapp/core';
import { Nav, Navbar, Container } from 'react-bootstrap';
//import config from '../../config';
//import { utils } from 'ethers';
//import { buildEtherscanWriteLink, buildEtherscanHoldingsLink } from '../../utils/etherscan';

import WalletConnectModal from "../WalletConnectModal";
import yolologo from './yolologo.png';
import PlayersConnected from '../PlayersConnected';

const NavBar = () => {
  //const treasuryBalance = useEtherBalance(config.fomoSettlerAddress);
  //const settlementHoldingsLink = buildEtherscanHoldingsLink(config.fomoSettlerAddress);
  //const settlementWriteLink = buildEtherscanWriteLink(config.fomoSettlerAddress);

  //const contractFundsLow = treasuryBalance && treasuryBalance.lt(utils.parseEther('1'));

  const scrollTo = (ref: string) => () => {
    const anchor = document.querySelector(ref); console.log(anchor);
    if (!anchor) return;
    anchor.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className={classes.HeaderBar}>
      <Navbar collapseOnSelect expand="lg">
      <Container /*style={{ maxWidth: 'unset' }}*/>
        <Navbar.Brand href="/" className={classes.navBarBrand}>
          <img src={yolologo} alt='YOLO Nouns'
            width="115"
            className={classes.LogoImage}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="nav-items" />
        <Navbar.Collapse id="nav-items" className="justify-content-end">
          <Nav.Item className={classes.nounsNavLink}>
            <PlayersConnected />
          </Nav.Item>
          
          <Nav.Link onClick={scrollTo('#wtf')} className={classes.nounsNavLink}>
            WTF
          </Nav.Link>
          <Nav.Link onClick={scrollTo('#faq')} className={classes.nounsNavLink}>
            FAQ
          </Nav.Link>
          <Nav.Link
            href="https://nouns.wtf/"
            className={classes.nounsNavLink}
            target="_blank"
            rel="noreferrer"
          >
            NOUNS
          </Nav.Link>
          <Nav.Item>
            <WalletConnectModal />
          </Nav.Item>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
