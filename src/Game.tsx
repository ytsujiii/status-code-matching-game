import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { Card as CardType } from './constants/Card';
import statusCodes from './status_codes.json';

const statusCodeCount = 15;
const statusCodeIndexes: number[] = Array.from(Array(statusCodes.length), (_, idx) => idx);
// Fisher-Yates shuffle
for (let i = statusCodeIndexes.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  const tmp = statusCodeIndexes[i];
  statusCodeIndexes[i] = statusCodeIndexes[j];
  statusCodeIndexes[j] = tmp;
}
const initialCardData: CardType[] = [];
statusCodeIndexes.slice(0, statusCodeCount).forEach((statusCodeIdx) => {
  initialCardData.push({ ...statusCodes[statusCodeIdx], state: 'faceDown' });
  initialCardData.push({ ...statusCodes[statusCodeIdx], state: 'faceDown' });
});

const useStyles = makeStyles({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
  },
});

export default function Game(): React.ReactElement {
  const [cards, setState] = useState<CardType[]>(initialCardData);
  const callback = () => {
    /* TODO: onClick */
  };
  useEffect(() => {
    console.log(cards);
  }, [cards]);

  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      {cards.map((card) => (
        <Card key={card.code} data={card} onClick={callback} />
      ))}
    </div>
  );
}
