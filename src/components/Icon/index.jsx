import React from 'react';
import PropTypes from 'prop-types';
import { svgIcons } from './data';

const sizes = {
  xsmall: 20,
  small: 25,
  medium: 30,
};

const Icon = ({ size, fill, name }) => {
  const width = sizes[size];
  const svgIcon = svgIcons[name];

  if (!svgIcon) {
    console.error(`iconName ${name} can't be found of type `, typeof name);
    return null;
  }

  return <>{svgIcon(fill, width)}</>;
};

Icon.defaultProps = {
  name: '',
  fill: '#444444',
  size: 'medium',
};

Icon.propTypes = {
  name: PropTypes.string,
  fill: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium']),
};

export default Icon;
