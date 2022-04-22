import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';
import { getIdFromBase64 } from '../../helpers/general.js';
import { useFavorite } from '../../context/FavoriteContext';
import Icon from '../Icon';

export default function CharacterListCard({ id, personId, name }) {
  const { toggleFavorite, favorites } = useFavorite();

  return (
    <div className={styles.wrapper}>
      <Link to={`/character/${id}`} className={styles.imageWrapper}>
        <img src={`/img/characters/${getIdFromBase64(id)}.jpg`} alt={name} />
      </Link>

      <div className={styles.content}>
        <div className={styles.texts}>
          <h2 className='h3'>{name}</h2>
        </div>
        <div className={styles.footer}>
          <button
            className={styles.favorite}
            onClick={() => toggleFavorite(id)}
          >
            <Icon
              name='star'
              fill={favorites.includes(id) ? '#fcd52e' : '#cccccc'}
            />
          </button>
          <Link to={`/character/${id}`}>Read more</Link>
        </div>
      </div>
    </div>
  );
}
