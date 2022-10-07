import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import Lifecycle from './Lifecycle';

// https://jsonplaceholder.typicode.com/comments

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) => res.json());
    console.log('res', res);

    const initData = res.slice(0, 20).map((row) => {
      return {
        author: row.email,
        content: row.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };

    dataId.current += 1;

    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    setData(data.filter((row) => row.id !== targetId));
  };

  const onEdit = (targetId, newContent) => {
    setData(data.map((row) => (row.id === targetId ? { ...row, content: newContent } : row)));
  };

  return (
    <div>
      {/* <Lifecycle /> */}
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onRemove={onRemove} onEdit={onEdit} diaryList={data} />
    </div>
  );
}

export default App;
