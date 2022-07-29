import { useEffect, useMemo } from 'react';
import { useEthers } from '@usedapp/core';
import { useAppDispatch, useAppSelector } from './hooks';

import { contract as AuctionContract } from './wrappers/nounsAuction';
import { contract as YOLOAuctionContract } from './wrappers/yoloNounsAuction';
//import { contract as YOLOTokenContract } from './wrappers/yoloNounsToken';
import { setAuctionEnd } from './state/slices/auction';
import { setNextNounId } from './state/slices/noun';
import { setLatestYOLONounId } from './state/slices/yoloNoun';
import { setBlockAttr } from './state/slices/block';
import { provider } from './config';

import { Container, Row, Col } from 'react-bootstrap';

import classes from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/css/globals.css';

import NavBar from './components/NavBar';
import Noun  from './components/Noun';
import HistoryCollection  from './components/HistoryCollection';
import Title from './components/Title';
import MintBar from './components/MintBar';
import Documentation from './components/Documentation';
import Banner from './components/Banner';
import Footer from './components/Footer';
import AlertModal from './components/Modal';
import MintedNounModal from './components/MintedNounModal';
import { setAlertModal } from './state/slices/application';

import { setActiveAccount } from './state/slices/account';
import { openVoteSocket, markVoterInactive } from './middleware/voteWebsocket';
import { openEthereumSocket } from './middleware/alchemyWebsocket';


function App() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { account } = useEthers();
  const dispatch = useAppDispatch();
  const useGreyBg = useAppSelector(state => state.noun.useGreyBg);
  const missedVotes = useAppSelector(state => state.vote.missedVotes);

  const latestYOLONounId = useAppSelector(state => state.yoloNoun.latestNounId);

  useMemo(async ()=> { // Initalized before mount
    const [{number: blocknumber, hash: blockhash}, auction, yoloAuction] = await Promise.all([
      provider.getBlock('latest'),
      AuctionContract.auction(),
      YOLOAuctionContract.auction()
      //YOLOTokenContract.totalSupply()
    ])

    const nextNounId = parseInt(auction?.nounId) + 1;
    const auctionEnd = auction?.endTime.toNumber();
    const yoloTotalSupply = parseInt(yoloAuction[0].toString());

    dispatch(setNextNounId(nextNounId));
    dispatch(setAuctionEnd(auctionEnd));
    dispatch(setBlockAttr({blocknumber, blockhash}))
	dispatch(setLatestYOLONounId(yoloTotalSupply - 1)); //0 indexed
    
  }, [dispatch])

  useEffect(() => {
    dispatch(setActiveAccount(account));
  }, [dispatch, account]);

  useEffect(() => { // Only initialize after mount
    dispatch(openVoteSocket());
    dispatch(openEthereumSocket());
  }, [dispatch]);

  // Deal with inactive users
  useEffect(() => {
    if (missedVotes > 3) {
      dispatch(markVoterInactive());
    }
  }, [dispatch, missedVotes]);

  const alertModal = useAppSelector(state => state.application.alertModal);

  return (
    <div className={`${classes.App} ${useGreyBg ? classes.bgGrey : classes.bgBeige}`}>
      <NavBar />
      {alertModal.show && (
        <AlertModal
          title={alertModal.title}
          content={<p>{alertModal.message}</p>}
          onDismiss={() => dispatch(setAlertModal({ ...alertModal, show: false }))}
        />
      )}
      <MintedNounModal/>

      <Container fluid="xl">
        <Row>
          <Col lg={{ span: 6 }} className={classes.nounContentCol}>
          	<Noun />
          </Col>
          <Col lg={{ span: 6 }} className={classes.auctionActivityCol}>
          	<Title/>
          	<MintBar />
          </Col>
        </Row>
      </Container>

      <HistoryCollection
        latestYOLONounId={latestYOLONounId}
        historyCount={10}
      />

      <Banner />
      <Documentation />
      <Footer/>
    </div>
  );
}

export default App;
