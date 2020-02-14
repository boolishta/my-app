import React from 'react';
import spinner from '../../../assets/images/spinner.svg';

let Preloader = (props) => {
  return <div>
    <img src={spinner} alt="loading"/>
  </div>
};

export default Preloader;