import React from 'react';
import '../css/groupcard.css';

import {
    Card,
    Dropdown
} from "react-bootstrap";

import {
    FaPlusCircle,
    FaTimesCircle,
    FaUserPlus
} from "react-icons/fa";


// membuat komponen dengan class
class GroupCard extends React.Component {
    constructor(props){

      super(props);

      this.state={
        draggedThere: false,
        membersPid: [],
      };
    }

    componentDidMount() {
        let membersPid = []
        this.props.group.members.forEach(m => {
            membersPid.push(m.pid)
        })
        this.setState({
            membersPid: membersPid
        })
    }

    // static getDerivedStateFromProps(newProps, newState) {  
    //     let membersPid = []
    //     this.props.group.members.forEach(m => {
    //         membersPid.push(m.pid)
    //     })
    //     return{
    //         membersPid: membersPid
    //     }
    // }
    componentWillReceiveProps(newProps) {  
        let membersPid = []
        this.props.group.members.forEach(m => {
            membersPid.push(m.pid)
        })
        this.setState({
            membersPid: membersPid
        })  
    }

    memberToBeRemoved(gIndex, mIndex){
        this.props.removedMemberData(gIndex, mIndex);
    }

    sendNewMemberData(newMember, gIndex){
        this.props.sendMemberData(newMember, gIndex)
    }

    onDragOver = (e) => {
        let event = e;
        event.stopPropagation();
        event.preventDefault();
    }

    onDrop = (e, msg) => {
        let memberIndex = e.dataTransfer.getData("id");
        let groupIndex = e.target.id;

        if(groupIndex !== ""){
            this.props.sendDroppedData(groupIndex, memberIndex);
        }
    }

    render(){
      return (
        <Card
            onDragOver = {(e) => this.onDragOver(e)}
            onDrop = {(e) => this.onDrop(e, 'complete')}
            text="light"
            style={{
                backgroundColor:'#484848'
            }}
        >
            <div
                className="text-center drop-area"
                id={this.props.groupIndex}
                style={ 
                        this.props.memberDragged ? 
                        {height:'100px', backgroundColor:'#46A3DB'} : {height:'0px', backgroundColor:'#46A3DB'}
                    }
            >
                <span 
                    className="mt-5 text-white"
                    style={{
                        fontSize: '2rem'
                    }}
                >
                    { this.props.memberDragged ? <FaUserPlus /> : '' }
                </span>
            </div>
            
            
            <Card.Body
            >
            <Card.Title>{ this.props.group.name }</Card.Title>
            <Card.Title
                style={{
                    fontSize:'1.1rem'
                }}
                >
                Who's in this group:
            </Card.Title>
            <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle 
                    id="dropdown-autoclose-true"
                    className="me-2 d-inline"
                    size="sm"
                    variant="success"
                    style={{
                        borderRadius:'15px'
                    }}    
                >
                    <FaPlusCircle /> Add
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {
                        this.props.players.map( (player, pIndex) => 
                                !this.state.membersPid.includes(player.pid)
                                &&
                                <Dropdown.Item key={pIndex} onClick={() => this.sendNewMemberData(pIndex, this.props.groupIndex)}>{ player.name }</Dropdown.Item>
                        )
                    }
                </Dropdown.Menu>
            </Dropdown>
            { 
                this.props.group.members.length > 0 ?
                    this.props.group.members.map((member, memberIndex) => 
                        <p 
                            key={member.pid}
                            className="d-inline-block group-member py-1 px-2 me-2 "
                        >
                        { member.name } 
                        <span 
                            className="ms-2" 
                            style={{
                            cursor:"pointer"
                            }}
                            onClick={() => this.memberToBeRemoved(this.props.groupIndex, memberIndex)}
                            >
                            <FaTimesCircle />
                        </span>
                        </p>
                    ) : <span></span>
                    
            }
            <Card.Title
                style={{
                    fontSize:'1.1rem'
                }}
                >
                Scene Sequence:
            </Card.Title>
            <Card.Text>
                { this.props.group.scene }
            </Card.Text>
            </Card.Body>
        </Card>
      );
    }
  }
  
export default GroupCard;