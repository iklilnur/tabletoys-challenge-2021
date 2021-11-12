import React from 'react';
import '../css/navbar.css';

// import {
//     Link,
//   } from "react-router-dom";
import { 
    FaUserAlt
} from 'react-icons/fa';

import {
    Navbar, 
    Container,
} from "react-bootstrap";


// membuat komponen dengan class
class NavigationBar extends React.Component {
    constructor(props){

      super(props);

      this.state={
      };
    }

    componentWillMount() {
        console.log('Component WILL MOUNT!')
    }
    componentDidMount() {
        console.log('Component DID MOUNT!')
    }

    render(){
    return (
   

        <Navbar className="navbar px-3 py-0" expand={false}>
            <Container fluid>
                <Navbar.Brand href="#" className="my-auto">
                    <img 
                        src={'/logo_tabletoys.png'} 
                        style={{
                            maxHeight:'50px',
                            height: '5vh'
                        }}
                        className="app-logo" 
                        alt="logo" 
                    />
                </Navbar.Brand>
                <Navbar.Text className="text-white" style={{ fontSize:'1rem' }}>
                    <FaUserAlt /> Username
                </Navbar.Text>
            </Container>
        </Navbar>
    );
    }
  }
  
export default NavigationBar;