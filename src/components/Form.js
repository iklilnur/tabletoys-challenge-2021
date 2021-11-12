import React from 'react'

import {
    Row,
    Button,
    Col,
    Form,
    FloatingLabel
} from "react-bootstrap";

import {
} from "react-icons/fa";


// membuat komponen dengan class
class NewGroupForm extends React.Component {
    constructor(props){

      super(props);

      this.state={
          show: this.props.show,
          groupName: "",
          sceneSequence: "",
      };

      this.confirmation = this.confirmation.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }

    static getDerivedStateFromProps(newProps, newState) {  
        return {
            show: newProps.show
        }  
        // this.setState({
        //     show: newProps.show
        // })
    }

    confirmation = async () => {
        this.props.sendConfirmation(true);
    }

    closeModal = () => {
        this.setState({
            show: false
        })
    }
  
    handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        event.preventDefault();

        let inputValues = {
            groupName: event.target.elements[0].value,
            sceneSequence: event.target.elements[1].value
        }

        this.props.sendFormInput(inputValues);
    };
    onSubmit = () => {
        console.log(this.state.val);
    };
  

    render(){
      return (
        <Form onSubmit={this.handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} xs="12" controlId="validationCustom01">
            <FloatingLabel
                controlId="floatingInput"
                label="Group Name"
                className="mb-3"
            >
                <Form.Control
                    required
                    type="text"
                    placeholder="Insert group name here.."
                />
            </FloatingLabel>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} xs="12" controlId="validationCustom02">
            <FloatingLabel
                controlId="floatingInput"
                label="Scene Sequence"
                className="mb-3"
            >
                <Form.Control
                    required
                    type="text"
                    placeholder="Insert scene sequence here.."
                />
            </FloatingLabel>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button variant="success" type="submit" >Add Group</Button>
      </Form>
      );
    }
  }
export default NewGroupForm