import React from "react";
import '../css/sidebar.css';

import { 
  FaPuzzlePiece, 
  FaUserFriends, 
  FaAngleRight, 
  FaAngleLeft,
  FaSignOutAlt
} from 'react-icons/fa';

import {
  Link,
} from "react-router-dom";

import {
} from "react-bootstrap";

import { 
  ProSidebar, 
  Menu, 
  MenuItem, 
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';


// membuat komponen dengan class
class Sidebar extends React.Component {
  constructor(props){

    super(props);

    this.state={
      sidebarCollapsed: false,
      toggled: this.props.toggle
    };

    this.switchCollapse = this.switchCollapse.bind(this);
  }

  componentDidMount() {
      console.log('Component DID MOUNT!')
  }

  componentWillReceiveProps(newProps) {    
    console.log('New Props:',newProps)
    
    this.setState({
      toggled: !this.state.toggled
    })
  }

  switchCollapse = () => {
    this.setState({
      sidebarCollapsed: !this.state.sidebarCollapsed
    });
  }

  handleToggle = () => {
    this.setState({
      toggled: false
    });
  }

  render(){
    return (
      <div className="sidebar-container">
        <ProSidebar 
          breakPoint="md"
          toggled={this.state.toggled}
          collapsed={this.state.sidebarCollapsed}
          className=""
          onToggle={this.handleToggle}
          width={250}
        >
          <SidebarHeader>
            <Menu
              onClick={this.switchCollapse}
            >
              <MenuItem icon={ this.state.sidebarCollapsed ? <FaAngleRight/> : <FaAngleLeft /> }>
                { this.state.sidebarCollapsed ? '' : 'Hide Sidebar' }
              </MenuItem>
            </Menu>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="">
              <MenuItem icon={<FaUserFriends />}>
                <span className="sidebar-item">GROUPS</span>
                <Link to="/" />
              </MenuItem>
              <MenuItem icon={<FaPuzzlePiece />}>
                <span className="sidebar-item">PUZZLE</span>
                <Link to="/puzzle" />
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter className="text-center">
            <Menu iconShape="">
              <MenuItem icon={<FaSignOutAlt />}>
                Log Out
                <Link to="/" />
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    );
  }
}

// const App = ()=> {
//   return (
//     <ProSidebar 
//       breakPoint="sm"
//       className=""
//     >
//       <SidebarHeader>
//         <Menu
//           popperArrow={true}
//         >

//         </Menu>
//       </SidebarHeader>
//       <SidebarContent>
//         <Menu>
//           <MenuItem icon={<FaUserFriends />}>
//             Group
//             <Link to="/" />
//           </MenuItem>
//           <MenuItem icon={<FaPuzzlePiece />}>
//             Puzzle
//             <Link to="/puzzle" />
//           </MenuItem>
//         </Menu>
//       </SidebarContent>
//       <SidebarFooter className="text-center py-2 px-5">
//         <div className="d-grid gap-2">
//           <Button
//             className="logout-button"
//           >
//             Log Out
//           </Button>
//         </div>
//       </SidebarFooter>
//     </ProSidebar>
//   );
// }

export default Sidebar;
