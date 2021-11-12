import React from 'react';
import '../css/footer.css';
import NewGroupForm from './Form.js';

import {
    Modal,
    Button,
} from "react-bootstrap";

import {
} from "react-icons/fa";



// membuat komponen dengan class
class FormModal extends React.Component {
    constructor(props){

      super(props);

      this.state={
          show: this.props.show
      };

      this.confirmation = this.confirmation.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.getFormInput = this.getFormInput.bind(this);
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

    confirmation = () => {
        this.props.sendConfirmation(true);
    }

    closeModal = () => {
        this.props.closeFormModal(false)
        // this.setState({
        //     show: false
        // })
    }

    getFormInput = (values) => {
        this.props.sendNewGroupData(values)
    }

    

    render(){
      return (
        <Modal
            size={this.props.size}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.show}
        >
            <Modal.Header>
                <Modal.Title>
                    Add New Group
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <NewGroupForm 
                    sendFormInput={this.getFormInput}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={this.closeModal}>Cancel</Button>
            </Modal.Footer>
        </Modal>
      );
    }
  }
  
export default FormModal;