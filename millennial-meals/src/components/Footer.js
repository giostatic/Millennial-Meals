import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer
            className='site-footer'
            style={{
                position: 'fixed',
                left: 0,
                bottom: 0,
                width: '100%',
                zIndex: 1000,
                background: '#222',
                color: '#fff'
            }}
        >
            <Container>
                <Row className="align-items-center">
                    <Col xs='12' sm='12' className='d-flex justify-content-center'>
                        <Link to='/' className='mx-3'>Home</Link>
                        <Link to='/directory' className='mx-3'>Directory</Link>
                        <Link to='/about' className='mx-3'>About</Link>
                        <a
                            className='mx-3'
                            href='mailto:MillenialMeals.support@gmail.com'
                        >
                            Contact us
                        </a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;