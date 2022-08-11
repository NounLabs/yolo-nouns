import React from 'react';
import classes from './AuctionNavigation.module.css';

const AuctionNavigation: React.FC<{
  isFirstAuction: boolean;
  isLastAuction: boolean;
  onPrevAuctionClick: () => void;
  onNextAuctionClick: () => void;
  auctionTitle: string;
}> = props => {
  const { isFirstAuction, isLastAuction, onPrevAuctionClick, onNextAuctionClick, auctionTitle } = props;
  //const isCool = useAppSelector(state => state.application.stateBackgroundColor) === '#758875';
  const isCool = true;
  return (
    <div className={classes.navArrowsContainer}>
      <button
        onClick={() => onNextAuctionClick()}
        className={isCool ? classes.leftArrowCool : classes.leftArrowWarm}
        disabled={isLastAuction}
      >
        ←
      </button>
      <h3>{auctionTitle}</h3>
      <button
        onClick={() => onPrevAuctionClick()}
        className={isCool ? classes.rightArrowCool : classes.rightArrowWarm}
        disabled={isFirstAuction}
      >
        →
      </button>
    </div>
  );
};
export default AuctionNavigation;
