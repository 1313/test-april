import React from 'react';
import { colorHex } from '../../helpers/general';
import Icon from '../Icon';
import styles from './style.module.scss';

export default function OutlineButton({ onClick, children, icon, isActive }) {
  return (
    <button
      className={`${styles.button} ${isActive ? styles.active : null}`}
      onClick={onClick}
    >
      <span className={styles.label}>{children}</span>
      <Icon
        name={icon}
        size='xsmall'
        fill={isActive ? colorHex['light'] : '#333333'}
      />
    </button>
  );
}
