import React, { useEffect, useState } from "react";
import classes from './BlockCountdownTimer.module.css';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { endVoting } from '../../state/slices/vote';

dayjs.extend(duration);

const BlockCountdownTimer: React.FC<{}> = props => {
  const dispatch = useAppDispatch();
  const blockTime = useAppSelector(state => state.block.blockTime);
  const votingActive = useAppSelector(state => state.vote.votingActive);

  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const timeSince = dayjs().valueOf() - blockTime;
    const timeLeft = 13000 - timeSince; //6000
    
    if(timeLeft <= 0) {
      setTimeLeft(0);
      dispatch(endVoting());
    } else {
      let timer = setTimeout(() => {
        setTimeLeft(timeLeft - 20);
      }, 20);
      return () => clearInterval(timer);
    }
  }, [dispatch, blockTime, timeLeft]);
  
  const timerDuration = dayjs.duration(timeLeft, 'ms');
  const seconds = Math.floor(timerDuration.seconds());
  const ms = Math.floor(timerDuration.milliseconds() / 10);
  
  const timerThresholdWarning = (seconds <= 10 && seconds >= 5);
  const timerThresholdDanger = seconds <= 5;

  return(
    <div className={`${classes.Wrapper} ${votingActive ? classes.ActiveVote : ''} 
    ${timerThresholdWarning ? classes.ThresholdWarning: ''} ${timerThresholdDanger ? classes.ThresholdDanger: ''} `}>
      {seconds}.{ms}
    </div>
  )
};

export default BlockCountdownTimer;