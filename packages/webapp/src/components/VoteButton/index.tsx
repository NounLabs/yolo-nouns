import clsx from 'clsx';
import classes from './VoteButton.module.css';
import { VOTE_OPTIONS, setCurrentVote } from '../../state/slices/vote';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendVote } from '../../middleware/voteWebsocket';

export enum EMOJI_TYPE {
    dislike = '👎',
    shrug = '🤷‍♂️',
    like = '👍'
}

/*
const voteToEmoji: Record<VOTE_OPTIONS, string> = {
  [VOTE_OPTIONS['voteDislike']]: '👎',
  [VOTE_OPTIONS['voteShrug']]: '🤷‍♂️',
  [VOTE_OPTIONS['voteLike']]: '👍'
};
*/

const VoteButton: React.FC<{voteType: VOTE_OPTIONS}> = props => {
  //const activeAuction = false; //useAppSelector(state => state.auction.activeAuction);
  const currentVote = useAppSelector(state => state.vote.currentVote);
  const wsConnected = useAppSelector(state => state.vote.connected);
  const blockHash = useAppSelector(state => state.block.blockHash);
  const nextNounId = useAppSelector(state => state.noun.nextNounId);
  //const voteCounts = useAppSelector(state => state.vote.voteCounts);
  //const votingBlockHash = useAppSelector(state => state.vote.votingBlockHash);

  //const votingActive = useAppSelector(state => state.vote.votingActive);

  const { voteType } = props;
  //const voteNotSelected = (currentVote !== undefined) && currentVote !== voteType;
  const dispatch = useAppDispatch();
  const changeVote = () => {
    if (currentVote || !wsConnected) return;
    
    dispatch(setCurrentVote(voteType));
    dispatch(sendVote({"nounId": nextNounId, "blockhash": blockHash, "vote": voteType}));
  }

  //disable always for demo
  const disabled = true;//voteNotSelected || (!votingActive || activeAuction) || blockHash !== votingBlockHash

  return (
      <button className={currentVote === voteType ? clsx(classes.bidBtn, classes.selected) : classes.bidBtn} onClick={changeVote}
      disabled={disabled}>
        <span className={classes.voteText}> YOLO! </span>
      </button>
  );
};
  export default VoteButton;