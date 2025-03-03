import React, { useEffect, useMemo } from 'react';
import loadingNoun from '../../assets/loading-skull-noun.gif';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveBackground } from '../../state/slices/noun';
import classes from '../Noun/Noun.module.css';
import { default as config } from '../../config';

import { ImageData, getNounSeedFromBlockHash, getNounData } from '@nouns/assets';
import { buildSVG } from '@nouns/sdk';
import NounTraitsOverlay from '../NounTraitsOverlay';

const { palette } = ImageData;

const hardPause = config.hardPause;

function getNounImage(nounId: number, blockhash: string){
  const seed = getNounSeedFromBlockHash(nounId, blockhash);
  const { parts, background } = getNounData(seed);

  const svgBinary = buildSVG(parts, palette, background);
  return {src: `data:image/svg+xml;base64,${btoa(svgBinary)}`, seed, parts};
}

const Noun: React.FC = props => {

  const dispatch = useAppDispatch();

  const blockhash = useAppSelector(state => state.block.blockHash);
  const nextNounId = useAppSelector(state => state.noun.nextNounId)!;
  const ethereumConnected = useAppSelector(state => state.block.connected);

  const nounImageData = useMemo(() => {
    const data = []

    // Return the Loading Noun
    if (hardPause || !blockhash || !nextNounId || !ethereumConnected){
      data.push({seed: {background: 0}, src: loadingNoun, alt: 'Loading Noun', nounId:'', parts: null});
      return data;
    }

    // Push the first Noun
    const {src, seed, parts} = getNounImage(nextNounId, blockhash)
    data.push({seed, src, alt: `Noun ${nextNounId}`, parts})

    // Every 10th Noun, push another Noun
    /*
    if (nextNounId % 10 === 0){
      const {src, seed} = getNounImage(nextNounId+1, blockhash)
      data.push({seed, src, alt: `Noun ${nextNounId+1}`})
    }
    */

    return data;

  }, [nextNounId, blockhash, ethereumConnected]);

  useEffect(()=>{
    // When there's only 1 Noun, change the page background to match
    if (nounImageData.length > 1) return
    dispatch(setActiveBackground(nounImageData[0].seed.background === 0));
  },[dispatch, nounImageData])


  const Imgs = nounImageData.map( ({src, alt, parts}, i) => {
    let imgWrapper = [classes.imgWrapper]


    if (nounImageData.length > 1) imgWrapper.push(classes[`noun-${i+1}`])

    return (
      <div className={`${imgWrapper.join(' ')}`} data-tip data-for="noun-traits">
        <img
          className={classes.img}
          src={src}
          alt={alt}
        />
        {Boolean(parts?.length) && <NounTraitsOverlay parts={parts!} toolTipId="noun-traits" />}
        <div className={classes.nounId}>Noun {nextNounId + i}</div>
      </div>
      )
  })

  let wrapperClass = classes.nounWrapper
  if (nounImageData.length > 1) {
    wrapperClass = classes.nounsWrapper
  }

  return (
    <div className={wrapperClass}>
      {Imgs}
    </div>
  );
};

export default Noun;