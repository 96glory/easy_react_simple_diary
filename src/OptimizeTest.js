import React, { useState, useEffect, memo } from 'react';

// https://ko.reactjs.org/docs/react-api.html#reactmemo
// 단 react memo는 얕은 비교를 하기 때문에 객체를 넘길 때는 같은 주소값을 가진 객체인지 비교한다.
// memo의 두번째 인자로 비교함수를 넘겨줄 수 있다.

const TextView = memo(({ text }) => {
  return <div>{text}</div>;
});

const CountView = memo(({ count }) => {
  return <div>{count}</div>;
});

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [text, setText] = useState('');

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>count</h2>
        <CountView count={count} />
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <h2>text</h2>
        <TextView text={text} />
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};

export default OptimizeTest;
