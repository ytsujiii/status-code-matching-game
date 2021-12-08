import { makeStyles } from '@material-ui/styles';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Card from './Card';
import { Card as CardType } from './constants/Card';
import { LocaleCode } from './constants/Locale';
import statusCodes from './status_codes.json';

// Fisher-Yates shuffle
const shuffle = (arr: Array<any>): void => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
};
const localeCode: LocaleCode = 'ja-JP';
const statusCodeCount = 10;
const statusCodeIndexes: number[] = Array.from(Array(statusCodes.length), (_, idx) => idx);
shuffle(statusCodeIndexes);

const useStyles = makeStyles({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
  },
});

export default function Game(): React.ReactElement {
  const [cards, setCards] = useState<CardType[]>([]);
  const [faceUpCards, setFaceUpCards] = useState<CardType[]>([]);
  const [faceUpCardCount, setFaceUpCardCount] = useState<number>(0);
  const cardsRef = useRef<CardType[]>([]);
  useEffect(() => {
    const initialCardData: CardType[] = [];
    statusCodeIndexes.slice(0, statusCodeCount).forEach((statusCodeIdx) => {
      // コードと短い説明のカード
      initialCardData.push({
        id: statusCodes[statusCodeIdx].code,
        header: statusCodes[statusCodeIdx].code.toString(),
        body: statusCodes[statusCodeIdx].note,
        state: 'faceDown',
      });
      // 詳細説明のカード
      initialCardData.push({
        id: 1000 + statusCodes[statusCodeIdx].code,
        body: statusCodes[statusCodeIdx].description[localeCode],
        state: 'faceDown',
      });
    });
    setCards(initialCardData);
    shuffle(initialCardData);
  }, []);
  useEffect(() => {
    setFaceUpCards(cards.filter((card) => card.state === 'faceUp'));
    cardsRef.current = cards;
  }, [cards]);
  useEffect(() => {
    setFaceUpCardCount(faceUpCards.length);
  }, [faceUpCards]);
  useEffect(() => {
    if (faceUpCards.length !== 2) return;

    const c1 = faceUpCards[0];
    const c2 = faceUpCards[1];
    if (c1.id % 1000 === c2.id % 1000) {
      // ステータスコードがそろった
      setTimeout(() => {
        setCards(
          cardsRef.current.map((card) => {
            if (card.id === c1.id || card.id === c2.id) {
              return { ...card, state: 'removed' };
            } else {
              return card;
            }
          })
        );
      }, 1000);
    } else {
      setTimeout(() => {
        setCards(
          cardsRef.current.map((card) => {
            if (card.id === c1.id || card.id === c2.id) {
              return { ...card, state: 'faceDown' };
            } else {
              return card;
            }
          })
        );
      }, 3000);
    }
  }, [faceUpCards, faceUpCardCount]);

  const onCardClicked = useCallback(
    (cardId: number): void => {
      if (faceUpCardCount >= 2 || faceUpCardCount < 0) {
        return;
      }
      // 1枚目と同じカードをめくった
      if (faceUpCardCount === 1 && faceUpCards[0].id === cardId) {
        setCards(
          cardsRef.current.map((card) => {
            if (card.id !== cardId) return card;
            else return { ...card, state: 'faceDown' };
          })
        );
        return;
      }

      const newCards: CardType[] = cardsRef.current.map((card) => {
        if (card.id !== cardId) return card;
        return { ...card, state: 'faceUp' };
      });
      setCards(newCards);
    },
    [faceUpCardCount]
  );

  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      {cards.map((card) => (
        <Card key={card.id} {...card} onClick={() => onCardClicked(card.id)} />
      ))}
    </div>
  );
}
