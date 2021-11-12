import React from 'react';
import '../css/footer.css';
import {
    Navbar, 
    Container
} from "react-bootstrap";


// membuat komponen dengan class
class Footer extends React.Component {
    constructor(props){

      super(props);

      this.state={
      };
    }

    componentDidMount() {
        console.log('Component DID MOUNT!')
    }

    render(){
      return (
        <Navbar className='footer px-3 py-0'>
            <Container fluid>
                <p className='my-auto text-white'>
                    Created by Iklil | 2020 - 2021 | Tabletoys Indonesia | Credits | Help
                </p>
            </Container>
        </Navbar>
      );
    }
  }
  
export default Footer;