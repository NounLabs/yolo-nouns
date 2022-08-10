import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Modal from '../Modal';
import classes from './ShowNounModal.module.css';
import Confetti from 'react-dom-confetti';
import loadingNoun from '../../assets/loading-skull-noun.gif';
//import { provider } from '../../config';

import { ImageData, getNounData } from '@nouns/assets';
import { buildSVG } from '@nouns/sdk';
import { contract as YOLOTokenContract } from '../../wrappers/yoloNounsToken';
import NounTraitsOverlay from '../NounTraitsOverlay';

const { palette } = ImageData;

const ShowNounModal: React.FC<{}> = props => {

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
  const emptyParts: any = null;

  // local state variables
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [imgSrc, setImgSrc] = useState(loadingNoun);
  const [imgParts, setImgParts] = useState(emptyParts);
  const [showConfetti, setConfetti] = useState(false);
  const [shareCopy, setShareCopy] = useState("");
  const [mediaURL, setMediaURL] = useState("https://yolonouns.wtf/");
  
  //const prevSettledBlockHash = useAppSelector(state => state.settlement.prevSettledBlockHash);
  //const attemptedSettleBlockHash = useAppSelector(state => state.settlement.attemptedSettleBlockHash);
  //const nextNounId = useAppSelector(state => state.noun.nextNounId);

  const showYOLONounId = useAppSelector(state => state.application.showYOLONounId);
    
  const showModalHandler = () => {
    setShowConnectModal(true);
  };

  const hideModalHandler = () => {
    setShowConnectModal(false);
  };

  // get the image of the most recently minted Noun from Twitter
  useEffect(() => {
  	if (showYOLONounId === undefined || showYOLONounId === null) return;  	
  	
    if (showConnectModal && /*successfulSettle &&*/ showYOLONounId > 0) {
      setShareCopy(encodeURI("YOLO! Check out this Noun at @YOLONouns! "));
           
      setConfetti(false);
    }
  }, [showConnectModal, /*successfulSettle,*/ showConfetti, showYOLONounId, mediaURL]);

  useEffect(() => {
	const getNounImg = async () => {
      if (showYOLONounId === undefined || showYOLONounId === null) return;

      
      const seed = await YOLOTokenContract.seeds(showYOLONounId);
      
      setMediaURL(encodeURIComponent("https://yolonouns.wtf/share/share-noun?bg=" + seed.background + "&b=" + seed.body + "&a=" + seed.accessory + "&h=" + seed.head + "&g=" + seed.glasses));
      
      const { parts, background } = getNounData(seed);
      
      const svgBinary = buildSVG(parts, palette, background);
      setImgSrc(`data:image/svg+xml;base64,${btoa(svgBinary)}`);
      setImgParts(parts);
    }

    if (showYOLONounId) {
      setImgSrc(loadingNoun);
      setImgParts(emptyParts);
      getNounImg();
      //setSuccessfulSettle(true);
      showModalHandler();
      //dispatch(resetPrevSettledBlockHash());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showYOLONounId, dispatch]);



  const title = 'YOLO!';
  const yoloNounContent = (
    <>
    <Confetti active={showConfetti} config={confettiConfig}/>
    <h3>{title}</h3>
	<img src={imgSrc} className={classes.NounImg} alt={`YOLO Noun`} data-tip data-for="noun-traits-show-modal"/>
    <p className={classes.Footer}>
    	If you were YOLOing this Noun could've been yours!
    </p>
    <p>
    	<a className={classes.twitterBtn} href={`https://twitter.com/intent/tweet/?text=${shareCopy + mediaURL}`}>Tweet This!</a>    
    </p>
    
    </>
    );

  return (
    <div className={classes.ModalWrapper}>
      {showConnectModal && <Modal content={yoloNounContent} onDismiss={hideModalHandler}/>}
	  {Boolean(imgParts?.length) && <NounTraitsOverlay parts={imgParts!} toolTipId="noun-traits-show-modal" />}      
    </div>
  )
};
export default ShowNounModal;