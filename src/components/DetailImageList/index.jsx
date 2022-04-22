import React from 'react';
import styles from './style.module.scss';
import { getIdFromBase64 } from '../../helpers/general.js';

export default function DetailImageList({ data, title, folder }) {
  if (!data || !folder || data.length < 1) {
    return null;
  }

  return (
    <section className={styles.wrapper}>
      {title && <h2 className='h2'>{title}</h2>}
      <hr className='separator' />
      <ul className={styles.list}>
        {data.map((detail) => {
          return (
            <li key={detail.id}>
              <img
                src={`/img/${folder}/${getIdFromBase64(detail.id)}.jpg`}
                alt={detail.name}
              />

              <p>{detail.name}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
