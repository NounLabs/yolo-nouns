import classes from './MintButton.module.css';
import { VOTE_OPTIONS } from '../../state/slices/vote';
import { useAppSelector } from '../../hooks';

import { useEffect, useState, useCallback } from 'react';
import { useContractFunction } from '@usedapp/core';
//import { connectContractToSigner } from '@usedapp/core/dist/cjs/src/hooks';
import { Contract } from '@ethersproject/contracts'
import { utils } from 'ethers';
import { default as config } from '../../config';
import { Spinner } from 'react-bootstrap';
import { useAppDispatch } from '../../hooks';
import { AlertModal, setAlertModal, setLastAttemptedNextNounId, setLastMintedBlockNumber } from '../../state/slices/application';

//import { contract as AuctionContract } from '../../wrappers/nounsAuction';
//import { contract as MinterContract } from '../../wrappers/yoloNounsAuction';


import YOLONounsAuctionHouseABI from '../../libs/abi/YOLONounsAuctionHouse.json';
const address: string = config.yoloAuctionProxyAddress;
const yoloAuctionHouseABI = new utils.Interface(YOLONounsAuctionHouseABI);

const hardPause = config.hardPause;

const reservePrice = utils.parseEther('0.01');
const gasLimit = 285000;

const MintButton: React.FC<{voteType: VOTE_OPTIONS}> = props => {
  //const activeAuction = false; //useAppSelector(state => state.auction.activeAuction);
  //const blockHash = useAppSelector(state => state.block.blockHash);
  const blockNumber = useAppSelector(state => state.block.blockNumber);

  const nextNounId = useAppSelector(state => state.noun.nextNounId);

  //const { library } = useEthers();
  const dispatch = useAppDispatch();
  const setModal = useCallback((modal: AlertModal) => dispatch(setAlertModal(modal)), [dispatch]);
  
  //create new Contract (work-around for type issues)
  const nounsAuctionHouseContract = new Contract(
  	address,
	yoloAuctionHouseABI
  );	  	
  
  const defaultYoloText = <>YOLO!</>;
  const [mintButtonContent, setMintButtonContent] = useState({
    loading: false,
    content: defaultYoloText,
  });

  const { send: sendMintNoun, state: mintNounState } = useContractFunction(
    nounsAuctionHouseContract,
    'mintNoun',
  );

  const mintNounHandler = async () => {
    if (nextNounId === null || nextNounId === undefined) {
    	return;
    }
    
    if (blockNumber === undefined) {
    	return;
    }
    
    //const contract = connectContractToSigner(nounsAuctionHouseContract, undefined, library);    
    //const gasLimit = await contract.estimateGas.mintNoun({value: reservePrice});
    //await contract.mintNoun({value: reservePrice, gasLimit: gasLimit});

	dispatch(setLastAttemptedNextNounId(nextNounId));
    sendMintNoun({
      value: reservePrice,
      gasLimit: gasLimit
    });
  };  

  // settle auction transaction state hook
  useEffect(() => {    
    switch (mintNounState.status) {      
      case 'None':
        setMintButtonContent({
          loading: false,
          content: defaultYoloText,
        });
        break;
      case 'PendingSignature':
        setMintButtonContent({ loading: true, content: <></> });
        break;
      case 'Mining':
        setMintButtonContent({ loading: true, content: <></> });
        break;
      case 'Success':
		const blockNumber: number | undefined = mintNounState.receipt?.blockNumber;
		dispatch(setLastMintedBlockNumber(blockNumber));

        setMintButtonContent({ loading: false, content: defaultYoloText });
        break;
      case 'Fail':
        setModal({
          title: 'Transaction Failed',
          message: mintNounState?.errorMessage || 'Please try again.',
          show: true,
        });
        setMintButtonContent({ loading: false, content: defaultYoloText });
        break;
      case 'Exception':
        setModal({
          title: 'Error',
          message: mintNounState?.errorMessage || 'Please try again',
          show: true,
        });
        setMintButtonContent({ loading: false, content: defaultYoloText });        
        //dispatch(setLastMintedBlockNumber(11105249));//testing
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mintNounState]);


  //disable flag // should check here for paused vs unpaused...
  //const disabled = false;//voteNotSelected || (!votingActive || activeAuction) || blockHash !== votingBlockHash
  //should also check for connected here....
  const disabled = hardPause || (mintNounState.status === 'PendingSignature') || (mintNounState.status === 'Mining');

  return (
      <button className={classes.bidBtn} onClick={mintNounHandler}
      disabled={disabled}>
        <span className={classes.voteText}> 
        	{mintButtonContent.loading ? <Spinner animation="border" /> : mintButtonContent.content}
        </span>
      </button>
  );
};
  export default MintButton;