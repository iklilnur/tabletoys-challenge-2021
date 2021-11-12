import React from 'react';
import '../css/footer.css';

import {
    Modal,
    Button,
} from "react-bootstrap";

import {
} from "react-icons/fa";


// membuat komponen dengan class
class WarningModal extends React.Component {
    constructor(props){

      super(props);

      this.state={
          show: this.props.show
      };

      this.confirmation = this.confirmation.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        // console.log('Component DID MOUNT!')
    }
    static getDerivedStateFromProps(newProps, newState) {  
        return {
            show: newProps.show
        }  
        // this.setState({
        //     show: newProps.show
        // })
    }

    // componentWillReceiveProps(newProps) {    
    //     this.setState({
    //         show: newProps.show
    //     })
    // }

    confirmation = async () => {
        this.props.sendConfirmation(true);
    }

    closeModal = () => {
        this.props.closeWarningModal(false);
    }

    render(){
      return (
        <Modal
            size={this.props.size}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.show}
        >
            <Modal.Header 
                className="text-white"
                style={{
                    backgroundColor: 'rgb(235, 52, 73)'
                }}
            >
                <Modal.Title id="contained-modal-title-vcenter">
                    { this.props.title }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    { this.props.content }
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={this.confirmation}>{ this.props.confirm }</Button>
                <Button variant="danger" onClick={this.closeModal}>Cancel</Button>
            </Modal.Footer>
        </Modal>
      );
    }
  }
  
export default WarningModal;