import React from 'react';

import '../css/group.css';

import GroupCard from '../components/GroupCard.js';
import WarningModal from '../components/WarningModal.js';
import FormModal from '../components/FormModal.js';

import {
  Row,
  Container,
  Button,
  Col,
  OverlayTrigger,
  Popover
} from "react-bootstrap";

import {
  FaPlus,
  FaUserCircle,
  FaQuestionCircle
} from "react-icons/fa";

const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">A Tip</Popover.Header>
    <Popover.Body>
      You can also drag a player from the <b>List Of Connected Player</b> 
      to add them to a group.
    </Popover.Body>
  </Popover>
);

class Group extends React.Component {
    constructor(props){

      super(props);

      this.state={
        groups:[
          {
            'gid': 0,
            'name':'Group Name',
            'members':[
              {
                'pid':0,
                'name':'Player 1',
                'connected':true
              },
              {
                'pid':1,
                'name':'Player 2',
                'connected':true
              },
              {
                'pid':2,
                'name':'Player 3',
                'connected':false
              },
            ],
            'scene':'Front Yard - Garden'
          },
          {
            'gid': 1,
            'name':'Group 2',
            'members':[
              {
                'pid':3,
                'name':'Player 4',
                'connected':true
              },
              {
                'pid':4,
                'name':'Player 5',
                'connected':false
              },
              {
                'pid':5,
                'name':'Player 6',
                'connected':false
              },
            ],
            'scene': 'Scout Area'
          },
        ],
        players:[
          {
            'pid':0,
            'name':'Player 1',
            'connected':true
          },
          {
            'pid':1,
            'name':'Player 2',
            'connected':true
          },
          {
            'pid':2,
            'name':'Player 3',
            'connected':false
          },
          {
            'pid':3,
            'name':'Player 4',
            'connected':true
          },
          {
            'pid':4,
            'name':'Player 5',
            'connected':false
          },
          {
            'pid':5,
            'name':'Player 6',
            'connected':false
          },
          {
            'pid':6,
            'name':'Player 7',
            'connected':false
          },
        ],
        modalShow:false,
        formModalShow:false,
        curGroup: null,
        curMember: null,
        curGroupName: "",
        curMemberName: "",

        dragged: false,
      };

      this.removeMember = this.removeMember.bind(this);
      this.removeMemberWarning = this.removeMemberWarning.bind(this);
      this.getNewGroupData = this.getNewGroupData.bind(this);
    }

  
    componentDidMount() {
      // console.log('Component DID MOUNT!')
    }

    changeTitle = () => {
      this.setState({
        title: "Judul sudah dirubah"
      });
    }

    removeMember = () => {
      let copyOfGroups = this.state.groups.slice();
      copyOfGroups[this.state.curGroup].members.splice(this.state.curMember,1);
      this.setState({
        groups:copyOfGroups,
        modalShow: false
      })
      console.log("Current Groups:", copyOfGroups)
    }

    removeMemberWarning = (gIndex, mIndex) => {
      console.log(`group index: ${gIndex}, member index: ${mIndex}`)
      this.setState({
        curGroup: gIndex,
        curMember: mIndex,
        curGroupName: this.state.groups[gIndex].name,
        curMemberName: this.state.groups[gIndex].members[mIndex].name,
        modalShow: true
      })
    }

    showAddGroupModal = () => {
      this.setState({
        formModalShow:true
      })
    }

    getNewGroupData = (data) => {
      let groupCount = this.state.groups.length;
      let newGroup = {
        'gid': groupCount,
        'name': data.groupName,
        'members': [],
        'scene': data.sceneSequence
      }

      this.setState({
        formModalShow:false,
        groups: [...this.state.groups, newGroup]
      })
    }

    onDragStart = (e, key, pIndex) => {
      e.dataTransfer.setData("id", pIndex)
      this.setState({
        dragged:true
      })
    }

    onDragEnd = (e, key, pIndex) => {
      this.setState({
        dragged:false
      })
    }

    getDroppedData = (gIndex, pIndex) => {
      let droppedPlayer = this.state.players[pIndex]
      let copyOfGroups = this.state.groups.slice();
      let groupTarget = this.state.groups[gIndex]
      let copyOfGroupMembers = groupTarget.members.slice();
      
      //Ensure the player is not already inside the group
      let newMember = true
      copyOfGroupMembers.forEach(m => {
        if(m.pid === droppedPlayer.pid){
          newMember = false
        }
      })

      if(newMember === true){
        copyOfGroups[gIndex].members = [...groupTarget.members, droppedPlayer]

        this.setState({
          groups: copyOfGroups
        })
      }

      console.log(this.state.groups)
    }

    getDropdownMemberData = (pIndex, gIndex) => {
      let targetPlayer = this.state.players[pIndex];
      let copyOfGroups = this.state.groups.slice();

      copyOfGroups[gIndex].members = [...copyOfGroups[gIndex].members, targetPlayer]

      this.setState({
        groups: copyOfGroups
      })
    }

    closeWarning = (boolean) => {
      this.setState({
        modalShow: boolean
      })
    }

    closeForm = (boolean) => {
      this.setState({
        formModalShow: boolean
      })
    }

    render(){
      return (
        <Container fluid className="h-100">
          <Row className="h-100 g-0">

            {/* Groups */}
            <Col 
              className="px-5 py-4" 
              md="9"
            >
              {/* Title and Add New Group */}
              <Row>
                <Col xs="auto">
                  <h3 className="text-white">ROOMS</h3>
                </Col>
                <Col>
                  <Button 
                    className="text-white"
                    variant="outline-primary"
                    onClick={this.showAddGroupModal}
                    style={{
                      borderRadius:'15px',
                    }} 
                  >
                    <FaPlus /> Add New Group
                  </Button>
                  <OverlayTrigger trigger={['hover' , 'focus']} placement="right" overlay={popover}>
                    <span className="ms-2 text-white" style={{ fontSize:'1.4rem' }}><FaQuestionCircle /></span>
                  </OverlayTrigger>
                  <FormModal 
                    show={this.state.formModalShow}
                    size="md"
                    sendNewGroupData = {this.getNewGroupData}
                    closeFormModal = {this.closeForm}
                  />
                </Col>
              </Row>
              
              {/* Groups Card */}
              <Row className="py-4 mt-2" style={{ 
                  overflowY:'auto',
                  height: '70vh'
                }}>
                {
                    this.state.groups.map((group, groupIndex) => 
                      <Col 
                        key={group.gid} 
                        md="6"
                        className="my-2"
                      > 
                          <GroupCard 
                            key={groupIndex}
                            memberDragged={this.state.dragged}
                            removedMemberData={this.removeMemberWarning} 
                            sendDroppedData={this.getDroppedData}
                            sendMemberData={this.getDropdownMemberData}
                            group={group}
                            groupIndex={groupIndex} 
                            players={this.state.players} 
                          />
                      </Col>
                    )
                }
                
                {/* Warning Modal */}
                <WarningModal 
                  closeWarningModal={this.closeWarning}
                  title="Remove Member Confirmation"
                  size="md"
                  content={
                    `Player "${this.state.curMemberName}" will be removed from 
                    Group named "${this.state.curGroupName}". Do you wish to continue?`
                  }
                  confirm="Yes"
                  show={this.state.modalShow}
                  sendConfirmation={this.removeMember}
                />
              </Row>
            </Col>

            {/* Group Menu */}
            <Col className="groups-menu px-2 pt-4 pb-5" md="3">
              {/* List of Connected Players */}
              <p 
                className="text-white text-center"
                style={{
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                LIST OF CONNECTED PLAYERS ({this.state.players.length})
              </p>
              <div
                className="my-3 px-3"
                style={{
                  height: '250px',
                  overflowY: 'scroll',
                  borderBottom: 'solid 2px white'
                }}
              >
                {
                  this.state.players.map((player, pIndex) => 
                    <p 
                      onDragStart= {(e) => this.onDragStart(e, player.pid, pIndex)}
                      onDragEnd= {(e) => this.onDragEnd(e, player.pid, pIndex)}
                      draggable
                      key={player.pid}
                      className="text-white py-1 px-2"
                      style={{
                        backgroundColor: '#46A3DB',
                        borderRadius: '5px',
                        fontWeight: '400',
                      }}  
                    >
                      <FaUserCircle style={{ fontSize:'1.3rem' }} /> <span className="ms-1">{ player.name }</span>
                    </p>
                  )
                }
              </div>
            </Col>

          </Row>
        </Container>
      );
    }
  }
  
export default Group;