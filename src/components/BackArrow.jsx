import React from 'react';
import { useHistory } from 'react-router-dom';

export default function BackArrow() {
  const hist = useHistory();
  return (
    <button type="button" className="icon-button" onClick={ hist.goBack } id="back-arrow">
      <img src="https://img.icons8.com/ios-filled/50/000000/circled-left-2.png" alt="previous page arrow" />
    </button>
  );
}
