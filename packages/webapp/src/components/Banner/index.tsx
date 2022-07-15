import classes from './Banner.module.css';
import YOLONoun from './YOLONoun.png';
import { Container, Row, Col } from 'react-bootstrap';

const Banner = () => {
  return (
    <div className={classes.BannerSection}>
      <Container fluid="xl">
		<Row>
          <Col lg={{ span: 6 }} >
          
	        <div className={classes.textWrapper}>
	          <h1>
	            EVERY.
	            <br />
	            BLOCK.
	            <br />
	            FOREVER.
	          </h1>
	        </div>

          </Col>
          <Col lg={{ span: 6 }} >
	        
	        <div className={classes.imgWrapper}>
	          <img src={YOLONoun} alt="YOLO Noun" className={classes.img} />
	        </div>	

          </Col>
        </Row>
      </Container>

    </div>
  );
};

export default Banner;
