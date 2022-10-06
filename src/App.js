import React, { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

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
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onRemove={onRemove} onEdit={onEdit} diaryList={data} />
    </div>
  );
}

export default App;
