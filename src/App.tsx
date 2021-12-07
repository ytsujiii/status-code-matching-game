import React from 'react';
import Card from './Card';
import { Card as CardType } from './constants/Card';

const cardData: CardType = {
  "code": 103,
  "description": {
    "en-US": "This status code is primarily intended to be used with the Link header, letting the user agent start preloading resources while the server prepares a response.",
    "ja-JP": "このステータスコードは主に Link ヘッダーとともに使用され、サーバーがリソースを準備している間、ユーザーエージェントがリソースの先読みを開始できるようにするためのものです。"
  },
  "note": "Early Hints",
  state: "faceUp",
};

function App() {
  const callback = () => {
    /* TODO: onClick */
  };
  return <Card data={cardData} onClick={callback} />;
}

export default App;
