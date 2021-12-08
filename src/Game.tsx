import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
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
}
const localeCode: LocaleCode = 'ja-JP';
const statusCodeCount = 15;
const statusCodeIndexes: number[] = Array.from(Array(statusCodes.length), (_, idx) => idx);
shuffle(statusCodeIndexes);

const initialCardData: CardType[] = [];
statusCodeIndexes.slice(0, statusCodeCount).forEach((statusCodeIdx) => {
  // コードと短い説明のカード
  initialCardData.push({
    id: statusCodes[statusCodeIdx].code,
    header: statusCodes[statusCodeIdx].code.toString(),
    body: statusCodes[statusCodeIdx].note,
    state: 'faceUp',
    onClick: () => {
      /* TODO */
    },
  });
  // 詳細説明のカード
  initialCardData.push({
    id: statusCodes[statusCodeIdx].code,
    body: statusCodes[statusCodeIdx].description[localeCode],
    state: 'faceUp',
    onClick: () => {
      /* TODO */
    },
  });
});
shuffle(initialCardData);

const useStyles = makeStyles({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
  },
});

export default function Game(): React.ReactElement {
  const [cards, setState] = useState<CardType[]>(initialCardData);

  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      {cards.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
}
