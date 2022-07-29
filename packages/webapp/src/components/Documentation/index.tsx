// import Section from '../../layout/Section';
import { Col } from 'react-bootstrap';
import classes from './Documentation.module.css';
import Accordion from 'react-bootstrap/Accordion';
import Link from '../Link';

//import config from '../../config';
//import { buildEtherscanContractLink } from '../../utils/etherscan';


const Documentation = () => {

  /*
  const fomoDiscourseLink = (
    <Link text="Nouns DAO Discourse" url="https://discourse.nouns.wtf/t/fomo-nouns-force-mint-our-nouns/117" leavesPage={true} />
  );

  const proposalEightLink = (
    <Link text="Proposal #8" url="https://nouns.wtf/vote/8" leavesPage={true} />
  );

  const gitHubLink = (
    <Link text="YOLO Nouns GitHub" url="https://github.com/NounLabs/yolo-nouns" leavesPage={true} />
  );

  const settlementEtherscanLink = buildEtherscanContractLink(config.fomoSettlerAddress);
  const smartContractLink = (
    <Link text="FOMO Settlement Contract" url={settlementEtherscanLink} leavesPage={true} />
  );
  */

  const nounsDaoLink = (
    <Link text="Nouns" url="https://nouns.wtf" leavesPage={true} />
  );

  const fomoNounsLink = (
    <Link text="FOMO Nouns" url="https://fomonouns.wtf" leavesPage={true} />
  );


  return (
    <div className={classes.Documentation}>
      <Col lg={{ span: 7, offset: 0 }}>
        <div className={classes.headerWrapper} id="wtf">
          <h1>WTF?</h1>
          <p>
            YOLO Nouns is an experimental social project for the {nounsDaoLink} community. 
            In between each Noun that is selected daily, there are “ghost” Nouns that appear with every block and are lost into the ether. Until now. 
            With YOLO Nouns you can capture each Noun and each moment on-chain, block by block.            
            This happens <i>really</i> fast, so if you see a Noun you like, be sure to YOLO quickly!

			<br /><br />
			YOLO Nouns are not Playground Nouns – they follow the same on-chain sequence and provenance as the {nounsDaoLink} DAO, 
			leveraging the same Seeder contract that is used to determine Noun traits during the minting process.
			In fact, you can compare them to what you see on {fomoNounsLink}. So when you mint a YOLO Noun you are minting a Noun that could have actually been minted on-chain.
			<br /><br />
			<strong>WARNING</strong>: To YOLO means to live in the moment and to take risks -  
			due to the speed of blocks, when you YOLO on-chain you run the risk that you may not be fast enough to catch your target, 
			and you may end up minting the Noun on the next block instead - 
			but that doesn't bother you, as they say, YOU ONLY LIVE ONCE!
          </p>
          
        </div>
        <Accordion flush>
          <Accordion.Item eventKey="0" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader} id="faq">Summary</Accordion.Header>
            <Accordion.Body>
              <ul>
                <li>YOLO Nouns lets you watch, block by block, the next possible Noun</li>
                <li>A new unique Noun is available on every block</li>
                <li>There's no guarantee that you'll get the Noun due to the speed of blocks</li>
                <li>Only one Noun can be minted per block</li>
                <li>If someone mints the same Noun before you do, your request will be rejected</li>
                <li>We are not kidding -- these Nouns change REALLY fast, so YOLO quickly!</li>
                <li>A Noun can't always be minted if the chain moves too fast. Keep trying!</li>
                <li><strong>WARNING</strong> - If you're not fast enough, you may mint the Noun on the next block instead</li>
              </ul>
	              
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>We Buy Nouns</Accordion.Header>
            <Accordion.Body>
              <p>
                The goal of YOLO Nouns is to acquire Nouns, and to provide the community with access to the broader Nouns governance model.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>YOLO Vibes</Accordion.Header>
            <Accordion.Body>
              <p>
                YOLO Nouns is all about vibes, but we are also planning on doing Nounish giveaways and other surprises for the community.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>Nouns Artwork</Accordion.Header>
            <Accordion.Body>
              <p>
                Nouns are generated randomly based on Ethereum block hashes. There are no 'if'
                statements or other rules governing noun trait scarcity, which makes all nouns
                equally rare. As of this writing, nouns are made up of:
              </p>
              <ul>
                <li>backgrounds (2)</li>
                <li>bodies (30)</li>
                <li>accessories (137)</li>
                <li>heads (234)</li>
                <li>glasses (21)</li>
              </ul>
              <p>
                Nouns are stored directly on Ethereum and do not utilize pointers to other networks
                such as IPFS. This is possible because noun parts are compressed and stored on-chain
                using a custom run-length encoding (RLE), which is a form of lossless compression.
              </p>
              <p>
                The compressed parts are efficiently converted into a single base64 encoded SVG
                image on-chain. To accomplish this, each part is decoded into an intermediate format
                before being converted into a series of SVG rects using batched, on-chain string
                concatenation. Once the entire SVG has been generated, it is base64 encoded.
              </p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
    </div>
  );
};

export default Documentation;