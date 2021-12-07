import React from 'react';
import { CardState } from './constants/Card';
import FaceDownCardImg from './images/face_down.png';

interface Props {
  cardState: CardState;
  onClick: () => void;
}

export default function Card(props: Props): React.ReactElement {
  const { cardState, onClick } = props;
  return <img src={FaceDownCardImg} alt="" />;
}
