import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Menu extends Component {
  render() {
    return (
       
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          <a href="/" className="brand-link">
            <img
              src="../../dist/img/AdminLTELogo.png"
              alt="AdminLTE Logo"
              className="brand-image img-circle elevation-3"
              style={{ opacity: ".8" }}
            />
            <span className="brand-text font-weight-light">React App</span>
          </a>
          <div className="sidebar">
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item">
                  <NavLink to="/seasonalGames" className="nav-link" activeClassName="active">
                    <i className="far fa-circle nav-icon" />
                    <p>Seasonal Games</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/dailyGames" className="nav-link" activeClassName="active">
                    <i className="far fa-circle nav-icon" />
                    <p>Daily Games</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/sesonalGameslogs" className="nav-link" activeClassName="active">
                    <i className="far fa-circle nav-icon" />
                    <p>Seasonal Player Gamelogs</p>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
       
    );
  }
}
