import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
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
  faceDown: {
    width: '100%',
  },
  header: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  description: {
    padding: 6,
    alignItems: 'center',
    fontSize: 10,
  },
});

export default function Card(props: CardType): React.ReactElement {
  const { header, body, state, onClick } = props;
  const [trimmedBody, setTrimmedBody] = useState<string>();
  const descriptionLength = 145;
  const classes = useStyles();

  useEffect(() => {
    if (body.length <= descriptionLength) {
      setTrimmedBody(body);
    } else {
      const trimmed = body.substring(0, descriptionLength - 1) + '…';
      setTrimmedBody(trimmed);
    }
  }, [body]);

  if (state === 'removed') {
    return <div className={classes.card} />;
  } else if (state === 'faceDown') {
    return (
      <div className={classes.card}>
        <img onClick={onClick} className={classes.faceDown} src={FaceDownCardImg} alt="" draggable={false} />
      </div>
    );
  } else if (header) {
    return (
      <div onClick={onClick} className={clsx([classes.card, classes.faceUp])} draggable={false}>
        <div className={classes.header}>{header}</div>
        <div className={classes.body}>{body}</div>
      </div>
    );
  } else {
    return (
      <div onClick={onClick} className={clsx([classes.card, classes.faceUp])}>
        <div className={clsx([classes.body, classes.description])}>{trimmedBody}</div>
      </div>
    );
  }
}
