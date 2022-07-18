import React, { useEffect } from "react";
import VoteButton from '../VoteButton';
import { VOTE_OPTIONS, setVotingBlockHash } from '../../state/slices/vote';
import classes from './VoteBar.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { openVoteSocket } from '../../middleware/voteWebsocket';
import { openEthereumSocket } from '../../middleware/alchemyWebsocket';

import { Col, Row } from 'react-bootstrap';


const VoteBar:React.FC<{}> = (props) => {
  const dispatch = useAppDispatch();
  const activeAuction = useAppSelector(state => state.auction.activeAuction);
  const voteSocketConnected = useAppSelector(state => state.vote.connected);
  const ethereumSocketConnected = useAppSelector(state => state.block.connected);
  const votingActive = useAppSelector(state => state.vote.votingActive);
  const blockhash = useAppSelector(state => state.block.blockHash);

  // Approves a specific blockhash for voting after a period of time. This prevents the user from voting on a Noun by mistake as a new block is received.
  useEffect( () => {
    const timerId = setTimeout(dispatch, 500, setVotingBlockHash(blockhash));
    return () => clearTimeout(timerId);
  }, [blockhash, dispatch])

  const openSocket = () => {
    if (!voteSocketConnected) {
      dispatch(openVoteSocket());
    }
    if (!ethereumSocketConnected) {
      dispatch(openEthereumSocket());
    }    
  }

  const voteOpts = (neutralOption: boolean) => (
    <>
      <VoteButton voteType={VOTE_OPTIONS.voteLike} />
    </>
  );

  /*
  const voteOpts = (neutralOption: boolean) => (
    <>
      <VoteButton voteType={VOTE_OPTIONS.voteDislike} />
      {neutralOption && <VoteButton voteType={VOTE_OPTIONS.voteShrug} />}
      <VoteButton voteType={VOTE_OPTIONS.voteLike} />
    </>
  );
  */

  const reconnectOpt = (
    <span className={classes.reconnect} onClick={openSocket}>Click Here to Reconnect</span>
  );

  const voteReconnectOpt = (
    <span className={classes.reconnect} onClick={openSocket}>Click to Enable YOLO</span>
  )

  return(
  	<div>
      <Row>
        <Col lg={12}>
  
		  
		    <div className={`
		      ${(!votingActive || activeAuction === undefined) ? classes.VoteBarOverlay : ''}
		      ${classes.VoteBar}`}
		    >
		      { (voteSocketConnected && ethereumSocketConnected) ? voteOpts(false)
		        : !ethereumSocketConnected ? reconnectOpt
		        : voteReconnectOpt }
		    </div>  	
          </Col>
        </Row>
  	
        <Row >
          <Col lg={12}>

			    <div>
			      <h1 className={classes.voteTitle}>
			        YOLO Noun 101
			      </h1>
			    </div>

            
          </Col>
        </Row>

        <Row >
          <Col lg={12}>

		    <Row>
		      <Col xs={6} lg={6} className={classes.leftCol}>
		        <h4 className={classes.votePriceTitle}>
		          Price
		        </h4>
		      </Col>
		      <Col xs={6} lg={6}>
		        <h2 className={classes.votePriceText}>
		          Ξ 0.01
		        </h2>
		      </Col>
		    </Row>
            
            
            
          </Col>
        </Row>
      
      <Row>
        <Col lg={12}>

			<strong>HOW TO YOLO:</strong>
			<ul>
				<li> <strong>CLICK</strong> - Click the YOLO button above</li>
				<li> <strong>CONFIRM</strong> - Confirm transaction in your wallet</li>
				<li> <strong>ACT FAST</strong> - Blocks move <i>really</i> fast (~13 seconds)</li>
				<li> <strong>FCFS</strong> - First come, first serve, only 1 Noun per block</li>
			</ul>

        </Col>
      </Row>      
     </div>		    
  );
}

export default VoteBar;