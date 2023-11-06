import React from 'react';
import { Navbar, Container, Col } from 'react-bootstrap';

class Footer extends React.Component {
    render() {
        let fullYear = new Date().getFullYear();
        return (
            <Navbar fixed="bottom" bg="dark" variant="dark">
                <Container className="text-center  bg-dark text-white">
                    <Col lg={12} >
                        <div >{fullYear} - {fullYear+1},All Rights Reserved by IDSIT</div>

                    </Col>
                </Container>
            </Navbar>
        );
    }
}

export default Footer;