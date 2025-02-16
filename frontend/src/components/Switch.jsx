import React from 'react';
import styled from 'styled-components';
import { useUIQuality } from '../UIQualityContext.jsx';

const Switch = () => {
  // 1) Read the current value and setter from context
  const { qualityLevel, setQualityLevel } = useUIQuality();

  // 2) Update the context when a radio is chosen
  const handleRadioChange = (e) => {
    // map "on" => 1, "off" => 2, "auto" => 3 (or any scheme you prefer)
    if (e.target.id === 'on') {
      setQualityLevel(1);
    } else if (e.target.id === 'off') {
      setQualityLevel(2);
    } else if (e.target.id === 'auto') {
      setQualityLevel(3);
    }
  };

  return (
    <StyledWrapper>
      <fieldset id="switch" className="radio">
        <input
          name="switch"
          id="on"
          type="radio"
          checked={qualityLevel === 1}
          onChange={handleRadioChange}
        />
        <label htmlFor="on">V1</label>

        <input
          name="switch"
          id="off"
          type="radio"
          checked={qualityLevel === 2}
          onChange={handleRadioChange}
        />
        <label htmlFor="off">V2</label>

        <input
          name="switch"
          id="auto"
          type="radio"
          checked={qualityLevel === 3}
          onChange={handleRadioChange}
        />
        <label htmlFor="auto">V3</label>
      </fieldset>
    </StyledWrapper>
  );
};


const StyledWrapper = styled.div`
  position: fixed; /* z-index works with positioned elements */
  z-index: 9999; /* Adjust this value as needed */
  fieldset {
    position: relative;  /* Ensure positioning context */
    z-index: 5; /* Optional: control fieldset stacking */
  }

  label {
    position: relative;  /* Required to use z-index */
    z-index: 2; /* Adjust as needed */
  }

  input {
    position: relative; /* Required to use z-index */
    z-index: 3; /* Adjust as needed */
  }
    `;


export default Switch;
