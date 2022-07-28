import classes from './VoteButton.module.css';
import { VOTE_OPTIONS } from '../../state/slices/vote';
import { useAppSelector } from '../../hooks';

//import { useState } from 'react';
import { useEthers } from '@usedapp/core';
import { connectContractToSigner } from '@usedapp/core/dist/cjs/src/hooks';
import { Contract } from '@ethersproject/contracts'
import { utils } from 'ethers';
import { default as config } from '../../config';
//import { contract as AuctionContract } from '../../wrappers/nounsAuction';
//import { contract as MinterContract } from '../../wrappers/yoloNounsAuction';

import YOLONounsAuctionHouseABI from '../../libs/abi/YOLONounsAuctionHouse.json';
const address: string = config.yoloAuctionProxyAddress;

export enum EMOJI_TYPE {
    dislike = '👎',
    shrug = '🤷‍♂️',
    like = '👍'
}

/*
const voteToEmoji: Record<VOTE_OPTIONS, string> = {
  [VOTE_OPTIONS['voteDislike']]: '👎',
  [VOTE_OPTIONS['voteShrug']]: '🤷‍♂️',
  [VOTE_OPTIONS['voteLike']]: '👍'
};
*/

const VoteButton: React.FC<{voteType: VOTE_OPTIONS}> = props => {
  //const activeAuction = false; //useAppSelector(state => state.auction.activeAuction);
  //const blockHash = useAppSelector(state => state.block.blockHash);
  const blockNumber = useAppSelector(state => state.block.blockNumber);

  const nextNounId = useAppSelector(state => state.noun.nextNounId);
  const reservePrice = utils.parseEther('0.01'); //hardcode for now, but should pull from dynamic source

  const { library } = useEthers();
  //const dispatch = useAppDispatch();  
  
  //create new Contract (work-around for type issues)
  const nounsAuctionHouseContract = new Contract(
  	address,
	YOLONounsAuctionHouseABI
  );	  	

  /*
  const [bidButtonContent, setBidButtonContent] = useState({
    loading: false,
    content: 'Place bid',
  });

  const { send: sendMintNoun, state: mintNounState } = useContractFunction(
    nounsAuctionHouseContract,
    'mintNoun',
  );
  */

  const mintNounHandler = async () => {
    if (nextNounId === null || nextNounId === undefined) {
    	return;
    }
    
    if (blockNumber === undefined) {
    	return;
    }
    
    const contract = connectContractToSigner(nounsAuctionHouseContract, undefined, library);    

    //const gasLimit = await contract.estimateGas.mintNoun(nextNounId, {value: reservePrice});
    const gasLimit = 285000;
    await contract.mintNoun(nextNounId, {value: reservePrice, gasLimit: gasLimit});
	/*
    sendMintNoun(nextNounId, {
      reservePrice,
      gasLimit: 10_000, // A 10,000 gas pad is used to avoid 'Out of gas' errors
    });
    */
  };  

  //disable flag // should check here for paused vs unpaused...
  const disabled = false;//voteNotSelected || (!votingActive || activeAuction) || blockHash !== votingBlockHash

  return (
      <button className={classes.bidBtn} onClick={mintNounHandler}
      disabled={disabled}>
        <span className={classes.voteText}> YOLO! </span>
      </button>
  );
};
  export default VoteButton;