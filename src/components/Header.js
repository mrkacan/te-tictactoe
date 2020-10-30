import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import logo from '../assets/image/logo.png';

const Header = ({ isLoading }) => (
  <div className="te-logo-header">
    <div>
      <img className="te-logo" alt="te logo" src={logo} />
    </div>
    <div>
      {
                isLoading && <Spin />
            }
    </div>
  </div>
);

Header.propTypes = {
  isLoading: PropTypes.bool,
};

Header.defaultProps = {
  isLoading: false,
};

export default Header;
