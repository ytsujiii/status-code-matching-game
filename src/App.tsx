import React from 'react';
import Card from './Card';

function App() {
  const callback = () => {
    /* TODO: onClick */
  };
  return <Card cardState="faceDown" onClick={callback} />;
}

export default App;
