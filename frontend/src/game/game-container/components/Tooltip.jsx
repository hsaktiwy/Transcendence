import React from 'react';
// import styled from 'styled-components';
import './Tooltip.css'

const Tooltip = () => {
  return (
      <div className="item-hints">
        <div className="hint" data-position={4}>
          <span className="hint-radius" />
          <span className="hint-dot">Tip</span>
          <div className="hint-content do--split-children">
            <p>Use Navbar to navigate the website quickly and easily.</p>
          </div>
        </div>
      </div>
  );
}

export default Tooltip;

