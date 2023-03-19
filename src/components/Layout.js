import React from 'react';

export default function Layout({ children }) {
  return (
    <div> 
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand h1" href="/">
      <i className="bi bi-card-list w" style={{marginLeft:'10px', marginRight:'10px'}}></i>
        AskMi
      </a>
    </nav>
      <div>
        {children}
      </div>
    </div>
  ) 
}
