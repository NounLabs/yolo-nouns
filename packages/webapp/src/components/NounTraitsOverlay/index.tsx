import classes from './NounTraitsOverlay.module.css';
import React from 'react';
import ReactTooltip from 'react-tooltip';

const NounTraitsOverlay: React.FC<{
  parts: { filename: string }[];
  toolTipId: string;
}> = props => {
  const { parts, toolTipId } = props;
  const getNounTrait = (part: { filename: string }) => {
    const splitData: string[] = part.filename.split('-');
    return {trait: splitData[0], value: splitData.slice(1).join(' ')}
  }

  return (
    <ReactTooltip
      id={toolTipId}
      place="top"
      effect="float"
      backgroundColor="white"
      textColor="black"
    >
      <ul className={classes.traitList}>
        {parts.sort((a, b) => a.filename > b.filename ? -1 : 1).map((part) => {
          const { trait, value } = getNounTrait(part);
          return (
            <li key={trait}>
              {trait}: {value}
            </li>
          )
        })}
      </ul>
    </ReactTooltip>
  );
};

export default NounTraitsOverlay;