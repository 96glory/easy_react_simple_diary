import React, { useEffect, useState } from 'react';

const Lifecycle = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  useEffect(() => {
    console.log('Mount!');

    return () => {
      console.log('Unmount!');
    };
  }, []);

  useEffect(() => {
    console.log('Update!');
  });

  useEffect(() => {
    console.log('hello count', count);
  }, [count]);

  useEffect(() => {
    console.log('hello text', text);
  }, [text]);

  return (
    <div style={{ padding: 20 }}>
      <div>
        {count}
        <button style={{ marginLeft: 20 }} onClick={() => setCount(count + 1)}>
          +
        </button>
      </div>
      <div style={{ marginTop: 20 }}>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};

export default Lifecycle;
