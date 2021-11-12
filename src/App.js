import React from "react";
import './css/App.css';

//pages
import Group from './pages/Group';
import Puzzle from './pages/Puzzle';

//components
import NavigationBar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

//modules
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button
} from "react-bootstrap";
import { 
  FaBars
} from 'react-icons/fa';


class App extends React.Component {
  constructor(props){

    super(props);

    this.state={
      sidearToggle: false
    };

    this.switchSidebarToggle = this.switchSidebarToggle.bind(this);
  }

  switchSidebarToggle = () => {
    this.setState({
      sidebarToggle: !this.state.sidebarToggle
    })
  }
 
  render(){
    return (
      <Router>
        <div>
          <NavigationBar />

          {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
          <div className="main-section">
            <Container fluid className="p-0" style={{ minHeight:'84vh', maxHeight:'100%' }}>
              <Row className="h-100 g-0" style={{ minHeight:'84vh', maxHeight:'100%' }}>
                <Col className="p-0 d-none d-md-block" md="auto">
                  <Sidebar toggle={ this.state.sidebarToggle } />
                </Col>
                <Col className="p-0 page-container">
                  <div className="d-block d-md-none">
                    <Sidebar 
                      toggle={ this.state.sidebarToggle } 
                    />
                  </div>
                  <Button 
                    className="d-block d-md-none m-3"
                    style={{
                      borderRadius: '10px',
                      position: 'sticky'
                    }}
                    onClick={this.switchSidebarToggle}
                  >
                    <FaBars />
                  </Button>
                  <Routes>
                    <Route path="/" element={<Group/>} />
                    <Route path="/puzzle" element={<Puzzle/>} />
                  </Routes>
                </Col>
              </Row>
            </Container>
          </div>

          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
