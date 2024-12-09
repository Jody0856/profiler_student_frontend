import React from 'react';
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarContent, 
  CDBSidebarMenu,
  CDBSidebarMenuItem, 
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{ position: 'fixed', height: '100vh', width: '200px', zIndex: 100 }}>
      <CDBSidebar textColor="#fff" backgroundColor="#000000">
        <CDBSidebarHeader>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Profiler App
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            {/* Uncomment the following lines if you want to add more menu items */}
            {/* <NavLink exact to="/Kategorisasi" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="address-card">Kategorisasi</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/Hasil" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Hasil</CDBSidebarMenuItem>
            </NavLink> */}
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;