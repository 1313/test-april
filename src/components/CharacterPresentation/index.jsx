import React from 'react';
import styles from './style.module.scss';
import { colorHex, getIdFromBase64 } from '../../helpers/general.js';
import DetailImageList from '../DetailImageList';
import { motion } from 'framer-motion';
import { useFavorite } from '../../context/FavoriteContext';
import Icon from '../Icon';

export default function CharacterPresentation({ data }) {
  const personId = getIdFromBase64(data.id);
  const { isFavorite, toggleFavorite } = useFavorite();

  const details = [
    { label: 'Born', value: data.birthYear },
    { label: 'Homeworld', value: data.homeworld?.name },
    { label: 'Height (cm)', value: data.height },
    { label: 'Eye color', value: data.eyeColor },
    { label: 'Hair color', value: data.hairColor },
  ];

  return (
    <article>
      <header className={styles.header}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.3, duration: 0.3 },
          }}
        >
          <div className={styles.imageWrapper}>
            <img src={`/img/characters/${personId}.jpg`} alt={data.name} />
          </div>
        </motion.div>
        <motion.div
          className={styles.textWrapper}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.4, duration: 0.3 },
          }}
        >
          <h1 className='h1'>{data.name}</h1>
          <hr className='separator' />
          <ul className={styles.details}>
            {details.map((detail) => {
              if (detail.value) {
                return (
                  <li key={`detail-${detail.label}-${detail.value}`}>
                    <strong>{detail.label}:</strong> {detail.value}
                  </li>
                );
              }
            })}
          </ul>
          <div className={styles.favoriteWrapper}>
            <button
              onClick={() => {
                toggleFavorite(data.id);
              }}
            >
              <Icon
                name='star'
                fill={
                  isFavorite(data.id)
                    ? colorHex['primary']
                    : colorHex['neutral']
                }
              />
              <span>
                {isFavorite(data.id)
                  ? 'Marked as favorite'
                  : 'Mark as favorite'}
              </span>
            </button>
          </div>
        </motion.div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.3, duration: 0.3 },
        }}
      >
        <DetailImageList
          title='Starships'
          folder='starships'
          data={data.starshipConnection?.starships}
        />
        <DetailImageList
          title='Vehicles'
          folder='vehicles'
          data={data.vehicleConnection?.vehicles}
        />
        {data.filmConnection?.films?.length > 0 && (
          <section className={styles.moviesWrapper}>
            <h2 className='h2'>Movies</h2>
            <ul className={styles.moviegrid}>
              {data.filmConnection.films.map((movie) => {
                return (
                  <li key={movie.id}>
                    <img
                      src={`/img/films/${getIdFromBase64(movie.id)}.jpg`}
                      alt={movie.title}
                    />
                    <p>{movie.title}</p>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </motion.div>
    </article>
  );
}
