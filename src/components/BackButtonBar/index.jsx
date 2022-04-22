import React from 'react';
import Icon from '../Icon';
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { colorHex } from '../../helpers/general';

export default function BackButtonBar({ onClick, children }) {
  return (
    <motion.div
      className={styles.bar}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
    >
      <button onClick={onClick} className={styles.button}>
        <Icon name='back_arrow' size='xsmall' fill={colorHex['light']} />
        <span className={styles.label}>{children}</span>
      </button>
    </motion.div>
  );
}
