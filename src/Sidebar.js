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
    <div style={{ position: 'fixed', height: '100vh', width: '250px', zIndex: 100, backgroundColor: '#181818' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#181818">
        <CDBSidebarHeader
          className="d-flex align-items-center justify-content-center"
          style={{
            padding: '15px',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#fff',
            borderBottom: '1px solid #333',
          }}
        >
          <a href="/" className="text-decoration-none" style={{ color: '#fff' }}>
            Profiler App
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content" style={{ backgroundColor: '#181818' }}>
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked" style={{ textDecoration: 'none' }}>
              <CDBSidebarMenuItem
                icon="columns"
                style={{
                  padding: '12px 20px',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.color = '#ccc')}
                onMouseOut={(e) => (e.target.style.color = '#fff')}
              >
                Dashboard
              </CDBSidebarMenuItem>
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

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            textAlign: 'center',
            padding: '15px 0',
            color: '#888',
            fontSize: '12px',
            borderTop: '1px solid #333',
          }}
        >
          &copy; {new Date().getFullYear()} Profiler App
        </div>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
