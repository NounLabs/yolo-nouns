import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Modal from '../Modal';
import classes from './MintedNounModal.module.css';
import Confetti from 'react-dom-confetti';
import loadingNoun from '../../assets/loading-skull-noun.gif';
import { provider } from '../../config';

import { ImageData, getNounSeedFromBlockHash, getNounData } from '@nouns/assets';
import { buildSVG } from '@nouns/sdk';
//import { resetPrevSettledBlockHash } from '../../state/slices/settlement';
const { palette } = ImageData;

const MintedNounModal: React.FC<{}> = props => {

  const confettiConfig = {
      angle: 80,
      spread: 180,
      startVelocity: 70,
      elementCount: 150,
      dragFriction: 0.12,
      duration: 9000,
      stagger: 8,
      width: "10px",
      height: "10px",
      colors: ["#a864fd", "#29cdff", "#8efc62", "#fa5768", "#fdff6a", '#f9b9f2']
  };

  const dispatch = useAppDispatch();

  // local state variables
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [imgSrc, setImgSrc] = useState(loadingNoun);
  const [showConfetti, setConfetti] = useState(false);
  const [shareCopy, setShareCopy] = useState("");
  const [mediaURL, setMediaURL] = useState("https://yolonouns.wtf/");
  
  //const prevSettledBlockHash = useAppSelector(state => state.settlement.prevSettledBlockHash);
  //const attemptedSettleBlockHash = useAppSelector(state => state.settlement.attemptedSettleBlockHash);
  //const nextNounId = useAppSelector(state => state.noun.nextNounId);

  const lastAttemptedNextNounId = useAppSelector(state => state.application.lastAttemptedNextNounId);
  const lastMintedBlockNumber = useAppSelector(state => state.application.lastMintedBlockNumber);
  
  const showModalHandler = () => {
    setShowConnectModal(true);
  };

  const hideModalHandler = () => {
    setShowConnectModal(false);
  };

  // get the image of the most recently minted Noun from Twitter
  useEffect(() => {
  	if (lastAttemptedNextNounId === undefined || lastAttemptedNextNounId === null) return;  	
  	
    if (showConnectModal && /*successfulSettle &&*/ lastAttemptedNextNounId > 0) {
      setShareCopy(encodeURI("YOLO! I just minted this Noun at @YOLONouns! "));
           
      setConfetti(true);
    }
  }, [showConnectModal, /*successfulSettle,*/ showConfetti, lastAttemptedNextNounId, mediaURL]);

  useEffect(() => {
	const getNounImg = async () => {
      if (lastAttemptedNextNounId === undefined || lastAttemptedNextNounId === null) return;
      if (!lastMintedBlockNumber) return;
      
      //get the proper hash 
      const lastBlock = await provider.getBlock(lastMintedBlockNumber - 1);
      const lastMintedBlockHash = lastBlock.hash;

      const seed = getNounSeedFromBlockHash(lastAttemptedNextNounId, lastMintedBlockHash);

      setMediaURL(encodeURIComponent("https://yolonouns.wtf/share/share-noun?bg=" + seed.background + "&b=" + seed.body + "&a=" + seed.accessory + "&h=" + seed.head + "&g=" + seed.glasses));

      const { parts, background } = getNounData(seed);
  
      const svgBinary = buildSVG(parts, palette, background);
      setImgSrc(`data:image/svg+xml;base64,${btoa(svgBinary)}`);
    }

    if (lastMintedBlockNumber) {
      setImgSrc(loadingNoun);
      getNounImg();
      //setSuccessfulSettle(true);
      showModalHandler();
      //dispatch(resetPrevSettledBlockHash());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMintedBlockNumber, lastAttemptedNextNounId, dispatch]);

  const title = 'YOLO! You minted a Noun!';
  const yoloNounContent = (
    <>
    <Confetti active={showConfetti} config={confettiConfig}/>
    <h3 style={{ display: 'block'}}>{title}</h3>
    <img src={imgSrc} className={classes.NounImg} alt={`Minted Noun`}/>
    <p className={classes.Footer}>
    	See another one you like? Keep YOLOing!
    </p>
    <p>
    	<a className={classes.twitterBtn} href={`https://twitter.com/intent/tweet/?text=${shareCopy + mediaURL}`}>Tweet This!</a>    
    </p>
    
    </>
    );

  return (
    <div className={classes.ModalWrapper}>
      {showConnectModal && <Modal content={yoloNounContent} onDismiss={hideModalHandler}/>}
    </div>
  )
};
export default MintedNounModal;