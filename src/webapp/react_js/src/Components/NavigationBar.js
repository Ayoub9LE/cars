import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavigationBar extends React.Component {
    render() {
        const customStyle = { color: 'white' }; // Set the text color to white
        return (
            <Navbar bg="dark" variant="dark">
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/17/Tata_Tamo_Racemo.jpg" width="25" height="25" />
                <Nav className="mr-auto">

                    <Link to="/" className="nav-link" style={customStyle}>
                        Accueil
                    </Link>
                    <Link to="/list" className="nav-link" style={customStyle}>
                        Liste Voiture
                    </Link>
                    <Link to="/add" className="nav-link" style={customStyle}>
                        Ajouter Voiture
                    </Link>

                </Nav>
            </Navbar>
        );
    }
}

export default NavigationBar;
