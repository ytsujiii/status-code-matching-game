import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';
import { Card as CardType } from './constants/Card';
import FaceDownCardImg from './images/face_down.png';

const useStyles = makeStyles({
  card: {
    width: 120,
    height: 188,
  },
  faceUp: {
    border: '1px solid black',
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignContent: 'center',
    textAlign: 'center',
  },
  code: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  note: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});

export default function Card(props: CardType): React.ReactElement {
  const { header, body, state, onClick } = props;
  const classes = useStyles();

  if (state === 'removed') {
    return <div className={classes.card} />;
  } else if (state === 'faceDown') {
    return <img onClick={onClick} className={classes.card} src={FaceDownCardImg} alt="" />;
  } else {
    return (
      <div onClick={onClick} className={clsx([classes.card, classes.faceUp])}>
        <div className={classes.code}>{header}</div>
        <div className={classes.note}>{body}</div>
      </div>
    );
  }
}
