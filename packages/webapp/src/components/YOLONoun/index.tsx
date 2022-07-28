import React, { useEffect, useState, useMemo } from 'react';
import loadingNoun from '../../assets/loading-skull-noun.gif';
import { useAppDispatch, useAppSelector } from '../../hooks';
import classes from '../YOLONoun/YOLONoun.module.css';

//import { useEthers } from '@usedapp/core';
import { contract as YOLOTokenContract } from '../../wrappers/yoloNounsToken';

import { ImageData, getNounData } from '@nouns/assets';
import { buildSVG } from '@nouns/sdk';
const { palette } = ImageData;


/*
function getNounImage(nounId: number, blockhash: string){
  const seed = getNounSeedFromBlockHash(nounId, blockhash);
  const { parts, background } = getNounData(seed);

  const svgBinary = buildSVG(parts, palette, background);
  return {src: `data:image/svg+xml;base64,${btoa(svgBinary)}`, seed};
}
*/

const YOLONoun: React.FC<{
  latestYOLONounId: number | null | undefined;
}> = props => {

  let { latestYOLONounId } = props;

  const dispatch = useAppDispatch();
  //const { library } = useEthers();

  const blockhash = useAppSelector(state => state.block.blockHash);
  const nextNounId = useAppSelector(state => state.noun.nextNounId)!;
  const ethereumConnected = useAppSelector(state => state.block.connected);
  
    
  const [nounImageData, setNounImageData] = useState({
    seed: null,
    src: '',
    alt: '',
    background: '',
  });

  //const nounImageDataLoader = 
  useMemo(() => {
    const data = []

    // Return the Loading Noun
    if (!blockhash || !nextNounId || !ethereumConnected){
      data.push({seed: {background: 0}, src: loadingNoun, alt: 'Loading Noun', nounId:''});
      return data
    }

	//set the loading noun
	setNounImageData({seed: null, src: loadingNoun, alt: 'Loading Noun', background: ''});
	const loadSeed = async () => {

		const seed = await YOLOTokenContract.seeds(latestYOLONounId);
		
		const { parts, background } = getNounData(seed);
		
		const svgBinary = buildSVG(parts, palette, background);
  		const src = `data:image/svg+xml;base64,${btoa(svgBinary)}`;
  		
  		setNounImageData({seed: seed, src: src, alt: `YOLO Noun ${latestYOLONounId}`, background: background});
  		
    };
    loadSeed();
        
	/*
    // Push the first Noun
    const {src, seed} = getNounImage(nextNounId, blockhash)
    data.push({seed, src, alt: `Noun ${nextNounId}`})
    */

    // Every 10th Noun, push another Noun
    /*
    if (nextNounId % 10 === 0){
      const {src, seed} = getNounImage(nextNounId+1, blockhash)
      data.push({seed, src, alt: `Noun ${nextNounId+1}`})
    }
    */

    //return data

	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestYOLONounId, ethereumConnected]);

  useEffect(()=>{
    // When there's only 1 Noun, change the page background to match
    //if (nounImageData.length > 1) return
    if (nounImageData !== null && nounImageData.background !== null) {
	    //dispatch(setActiveBackground(nounImageData.background === '0'));
	}
  },[dispatch, nounImageData])

  /*
  const Imgs = nounImageData.map( ({src, alt}, i) => {
    let imgWrapper = [classes.imgWrapper]


    if (nounImageData.length > 1) imgWrapper.push(classes[`noun-${i+1}`])

    return (
      <div className={`${imgWrapper.join(' ')}`}>
        <img
          className={classes.img}
          src={src}
          alt={alt}
        />
        <div className={classes.nounId}>Noun {nextNounId + i}</div>
      </div>
      )
  })
  */

  let wrapperClass = classes.nounWrapper
  /*
  if (nounImageData.length > 1) {
    wrapperClass = classes.nounsWrapper
  }
  */
  let imgWrapper = [classes.imgWrapper]
  
  return (
    <div className={wrapperClass}>

      <div className={`${imgWrapper.join(' ')}`}>
        <img
          className={classes.img}
          src={nounImageData.src}
          alt={nounImageData.alt}
        />
        <div className={classes.nounId}>Noun {latestYOLONounId}</div>
      </div>

    </div>
  );
};

export default YOLONoun;