import React from 'react';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

export default function Header() {
  return (
    // <nav>
    //   <Link to='/'>Home</Link>
    //   <Link to='/character/luke-skywalker'>Details</Link>
    // </nav>

    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <Logo />
      </div>
    </header>
  );
}
