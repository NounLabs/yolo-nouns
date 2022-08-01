import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Modal from '../Modal';
import classes from './MintedNounModal.module.css';
import Confetti from 'react-dom-confetti';
//import axios from 'axios';
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
  const [img, setImg] = useState("");
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
      
      // wait for 750ms, then fetch image from twitter
      /*
      setTimeout(() => {
        axios.get('/.netlify/functions/twitter', {params: {id: localNounId}})
        .then( res => {
          const data = res.data;
          setMediaURL(data.mediaUrl);
          setShowTwitter(mediaURL !== "");
          //reload the twitter widgets
          if (window) {
            (window as any).twttr.widgets.load();
          }
        });
      }, 15000);
      */
     
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

      setMediaURL(encodeURIComponent("https://yolonouns.wtf/share/share-noun?n=" + lastAttemptedNextNounId + "&h=" + lastMintedBlockHash));

      const seed = getNounSeedFromBlockHash(lastAttemptedNextNounId, lastMintedBlockHash);
      const { parts, background } = getNounData(seed);
  
      const svgBinary = buildSVG(parts, palette, background);
      setImg(btoa(svgBinary));      
    }

    if (lastMintedBlockNumber) {
      setImg("");
      getNounImg();
      //setSuccessfulSettle(true);
      showModalHandler();
      //dispatch(resetPrevSettledBlockHash());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMintedBlockNumber, lastAttemptedNextNounId, dispatch]);



  const title = 'YOLO! You minted a Noun!';
  const settledAuctionContent = (
    <>
    <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
    <Confetti active={showConfetti} config={confettiConfig}/>
    <h3>{title}</h3>
    <img src={`data:image/svg+xml;base64,${img}`} className={classes.NounImg} alt={`Minted Noun`}/>
    <p className={classes.Footer}>
    	See another one you like? Keep YOLOing!
    	<br />
    	<a className='twitter-share-button' href={`https://twitter.com/intent/tweet/?text=${shareCopy + mediaURL}`}>Tweet Me!</a>
    </p>
    
    </>
    );

  return (
    <div className={classes.ModalWrapper}>
      {showConnectModal && <Modal content={settledAuctionContent} onDismiss={hideModalHandler}/>}
    </div>
  )
};
export default MintedNounModal;