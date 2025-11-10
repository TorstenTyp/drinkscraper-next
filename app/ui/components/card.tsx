import Image from 'next/image';
import React from 'react';
import { Cocktail } from '@/app/lib/definitions';
import styles from './style/cards.module.css';

export default function Card({ cocktail }: { cocktail: Cocktail }) {
  const [imgSrc, setImgSrc] = React.useState(cocktail.Image);
  const placeholder = require('../fallback_cocktail.jpg');

  return (
    <a
      className={styles['cards--container']}
      target="_blank"
      rel="noopener noreferrer"
      href={cocktail.Link}
    >
      <div className={styles['cards--image-container']}>
        <Image
          src={imgSrc}
          alt="Cocktail"
          fill
          className={styles['cards--image']}
          onError={() => setImgSrc(placeholder)}
        />
      </div>
      <div className={styles['cards--content']}>
        <div className={styles['cards--header']}>
          <h1 className={styles['cards--title']}>{cocktail.Name}</h1>
        </div>
        <div className={styles['cards--ingredients']}>
          <h3 className={styles['cards--ingredients-text']}>{cocktail.Ingredients}</h3>
        </div>
        <div className={styles['cards--footer']}>
          <p className={styles['cards--source']}>{cocktail.Source}</p>
        </div>
      </div>
    </a>
  );
}