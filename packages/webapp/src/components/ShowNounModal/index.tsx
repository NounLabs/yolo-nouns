import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Modal from '../Modal';
import classes from './ShowNounModal.module.css';
import Confetti from 'react-dom-confetti';
import loadingNoun from '../../assets/loading-skull-noun.gif';

import { ImageData, getNounData } from '@nouns/assets';
import { buildSVG } from '@nouns/sdk';
import { contract as YOLOTokenContract } from '../../wrappers/yoloNounsToken';
import NounTraitsOverlay from '../NounTraitsOverlay';
import AuctionNavigation from '../AuctionNavigation';
import { setShowYOLONounId } from '../../state/slices/application';

import ShortAddress from '../ShortAddress';
import { getOwnersForNft } from '../../utils/alchemy';
import { default as config } from '../../config';
const address: string = config.yoloTokenAddress;

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
  const [nounOwner, setNounOwner] = useState('0x0000000000000000000000000000000000000000');
  const [showConfetti, setConfetti] = useState(false);
  const [shareCopy, setShareCopy] = useState('');
  const [mediaURL, setMediaURL] = useState('https://yolonouns.wtf/');
  const [navYOLONounId, setNavYOLONounId] = useState(0);
  
  //const prevSettledBlockHash = useAppSelector(state => state.settlement.prevSettledBlockHash);
  //const attemptedSettleBlockHash = useAppSelector(state => state.settlement.attemptedSettleBlockHash);
  //const nextNounId = useAppSelector(state => state.noun.nextNounId);

  const showYOLONounId = useAppSelector(state => state.application.showYOLONounId);
  const latestNounId = useAppSelector(state => state.yoloNoun.latestNounId);
  
    
  const showModalHandler = () => {
    setShowConnectModal(true);
  };

  const hideModalHandler = () => {
  	dispatch(setShowYOLONounId(0));
    setShowConnectModal(false);
  };

  // get the image of the most recently minted Noun from Twitter
  useEffect(() => {
  	if (navYOLONounId === undefined || navYOLONounId === null) return;  	
  	
    if (showConnectModal && /*successfulSettle &&*/ navYOLONounId > 0) {
      setShareCopy(encodeURI("YOLO! Check out this Noun at @YOLONouns! "));
           
      setConfetti(false);
    }
  }, [showConnectModal, /*successfulSettle,*/ showConfetti, navYOLONounId, mediaURL]);

  useEffect(() => {
	const getNounImg = async () => {
      if (navYOLONounId === undefined || navYOLONounId === null) return;

      
      const seed = await YOLOTokenContract.seeds(navYOLONounId);
      
      setMediaURL(encodeURIComponent("https://yolonouns.wtf/share/share-noun?bg=" + seed.background + "&b=" + seed.body + "&a=" + seed.accessory + "&h=" + seed.head + "&g=" + seed.glasses));
      
      const { parts, background } = getNounData(seed);
      
      const svgBinary = buildSVG(parts, palette, background);
      setImgSrc(`data:image/svg+xml;base64,${btoa(svgBinary)}`);
      setImgParts(parts);
      
      const owner = await getOwnersForNft(address, navYOLONounId.toString());
      setNounOwner(owner!);
    }

    if (navYOLONounId) {
      setImgSrc(loadingNoun);
      setImgParts(emptyParts);
      setNounOwner('0x0000000000000000000000000000000000000000');
      
      getNounImg();
      //setSuccessfulSettle(true);
      showModalHandler();
      //dispatch(resetPrevSettledBlockHash());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navYOLONounId, dispatch]);

  useEffect(() => {
  	setNavYOLONounId(showYOLONounId!);
  }, [showYOLONounId, dispatch]);


  const title = 'YOLO Noun ';
  const isFirstAuction = (navYOLONounId <= 0);
  const isLastAuction = (navYOLONounId >= latestNounId!);

  const onPrevAuctionClick = () => {
  	setNavYOLONounId(navYOLONounId - 1);
  };
  const onNextAuctionClick = () => {
  	setNavYOLONounId(navYOLONounId + 1);
  };
  
  /*
    <p className={classes.Footer}>
    	If you were YOLOing this Noun could've been yours!
    </p>
  */
  
  const yoloNounContent = (
    <>
    <Confetti active={showConfetti} config={confettiConfig}/>
    <AuctionNavigation
      isFirstAuction={isFirstAuction}
      isLastAuction={isLastAuction}
      onNextAuctionClick={onNextAuctionClick}
      onPrevAuctionClick={onPrevAuctionClick}
      auctionTitle={title + navYOLONounId}
    />
	<img src={imgSrc} className={classes.NounImg} alt={`YOLO Noun`} data-tip data-for="noun-traits-show-modal"/>
	<ShortAddress size={24} address={nounOwner} avatar={true} />
	<br />
    <p className={classes.Footer}>
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