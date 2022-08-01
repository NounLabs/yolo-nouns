import React, { useState, useMemo } from 'react';
import loadingNoun from '../../assets/loading-skull-noun.gif';
import { useAppDispatch, useAppSelector } from '../../hooks';
import classes from '../YOLONoun/YOLONoun.module.css';

//import { useEthers } from '@usedapp/core';
import { contract as YOLOTokenContract } from '../../wrappers/yoloNounsToken';
import { setShowYOLONounId } from '../../state/slices/application';

import { ImageData, getNounData } from '@nouns/assets';
import { buildSVG } from '@nouns/sdk';
const { palette } = ImageData;

const YOLONoun: React.FC<{
  yoloNounId: number | null | undefined;
}> = props => {

  let { yoloNounId } = props;

  const dispatch = useAppDispatch();
  //const { library } = useEthers();

  const blockhash = useAppSelector(state => state.block.blockHash);
  const nextNounId = useAppSelector(state => state.noun.nextNounId)!;
  const ethereumConnected = useAppSelector(state => state.block.connected);
  
  const showNounHandler = async () => {
    if (yoloNounId === null || yoloNounId === undefined) {
    	return;
    }
    
	dispatch(setShowYOLONounId(yoloNounId));
  };
    
  const [nounImageData, setNounImageData] = useState({
    seed: null,
    src: '',
    alt: '',
    background: '',
  });

  //const nounImageDataLoader = 
  useMemo(() => {

	//set the loading noun
	setNounImageData({seed: null, src: loadingNoun, alt: 'Loading Noun', background: ''});

    // Return the Loading Noun
    if (!blockhash || !nextNounId || !ethereumConnected){
    	return;
    }

	const loadSeed = async () => {

		const seed = await YOLOTokenContract.seeds(yoloNounId);
		
		const { parts, background } = getNounData(seed);
		
		const svgBinary = buildSVG(parts, palette, background);
  		const src = `data:image/svg+xml;base64,${btoa(svgBinary)}`;
  		
  		setNounImageData({seed: seed, src: src, alt: `YOLO Noun ${yoloNounId}`, background: background});
  		
    };
    loadSeed();
        
	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yoloNounId, ethereumConnected]);

  let wrapperClass = classes.nounWrapper
  let imgWrapper = [classes.imgWrapper]
  
  return (
    <div className={wrapperClass}>

      <div className={`${imgWrapper.join(' ')}`}>
        <img
          className={classes.img}
          src={nounImageData.src}
          alt={nounImageData.alt}
          onClick={showNounHandler}
        />
        <div className={classes.nounId}>Noun {yoloNounId}</div>
      </div>

    </div>
  );
};

export default YOLONoun;