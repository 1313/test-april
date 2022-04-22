import React from 'react';
import styles from './style.module.scss';
import CharacterGridCard from '../CharacterGridCard';
import { useFavorite } from '../../context/FavoriteContext';

export default function CharacterGrid({ characters }) {
  const { favorites } = useFavorite();

  if (!characters) {
    return null;
  }

  if (characters.length < 1) {
    return (
      <div className={styles.noResults}>
        <h2>No results to show</h2>
      </div>
    );
  }
  return (
    <ul className={styles.wrapper} key={favorites}>
      {characters.map((item) => {
        return (
          <CharacterGridCard name={item.name} id={item.id} key={item.id} />
        );
      })}
    </ul>
  );
}
