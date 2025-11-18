import Image from 'next/image';
import React from 'react';
import { Cocktail } from '@/app/lib/definitions';
import styles from './style/cards.module.css';

export default function Card({ cocktail }: { cocktail: Cocktail }) {
  const [imgSrc, setImgSrc] = React.useState(cocktail.Image);
  const fallbackCocktail = require('../fallback_cocktail.jpg');

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
          alt="Picture of a cocktail"
          fill
          sizes='40%'
          className={styles['cards--image']}
          onError={() => setImgSrc(fallbackCocktail)}
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
          <svg className="newTabIcon"
            xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
            <path d="M 19.980469 2.9902344 A 1.0001 1.0001 0 0 0 19.869141 3 L 15 3 A 1.0001 1.0001 0 1 0 15 5 L 17.585938 5 L 8.2929688 14.292969 A 1.0001 1.0001 0 1 0 9.7070312 15.707031 L 19 6.4140625 L 19 9 A 1.0001 1.0001 0 1 0 21 9 L 21 4.1269531 A 1.0001 1.0001 0 0 0 19.980469 2.9902344 z M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 13 A 1.0001 1.0001 0 1 0 19 13 L 19 19 L 5 19 L 5 5 L 11 5 A 1.0001 1.0001 0 1 0 11 3 L 5 3 z"></path>
          </svg>
        </div>
      </div>
    </a>
  );
}