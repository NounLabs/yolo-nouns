import { BigNumber } from 'ethers';
import Section from '../../layout/Section';
import classes from './HistoryCollection.module.css';
import clsx from 'clsx';
import YOLONoun from '../YOLONoun';
import { Container, Row, Col } from 'react-bootstrap';

interface HistoryCollectionProps {
  historyCount: number;
  latestYOLONounId: number | null | undefined;
}

const HistoryCollection: React.FC<HistoryCollectionProps> = (props: HistoryCollectionProps) => {
  const { historyCount, latestYOLONounId } = props;
  if (latestYOLONounId === null || latestYOLONounId === undefined) return null;
  
  const startAtZero = BigNumber.from(latestYOLONounId).sub(historyCount).lt(0);

  let nounIds: Array<BigNumber | null> = new Array(historyCount);
  nounIds = nounIds.fill(null).map((_, i) => {
    if (BigNumber.from(i).lte(latestYOLONounId)) {
      const index = startAtZero
        ? BigNumber.from(0)
        : BigNumber.from(Number(latestYOLONounId) - historyCount + 1);
      return index.add(i);
    } else {
      return null;
    }
  });
  
  nounIds.reverse();
  
  const nounsContent = nounIds.map((nounId, i) => {
    return !nounId ? '' : <YOLONoun key={i} latestYOLONounId={parseInt(nounId?.toString())} />;
  });

  return (
    <div className={classes.HistorySection}>
      <Container fluid="xl">
		<Row>
          <Col lg={{ span: 12 }} >

		    <Section fullWidth={true} className={clsx(classes.historyCollectionSection)}>
		      <Container fluid>
		      	Latest Minted:
		        <Row className="justify-content-md-center">
		          <div className={clsx(classes.historyCollection)}>
		            {nounsContent}
		          </div>
		        </Row>
		      </Container>
		    </Section>

          </Col>
        </Row>
      </Container>

    </div>

  );
};

export default HistoryCollection;
