import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

/**
 * 빈 배열 useEffect 시 두번 실행되는 사유
 * https://velog.io/@hyes-y-tag/React-useEffect%EA%B0%80-%EB%91%90%EB%B2%88-%EC%8B%A4%ED%96%89%EB%90%9C%EB%8B%A4%EA%B3%A0
 *
 */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
