import React, { useRef, useState, useEffect, useMemo, useCallback, useReducer } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import _ from 'lodash';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case 'REMOVE': {
      return state.filter((row) => row.id !== action.targetId);
    }
    case 'EDIT': {
      return state.map((row) => (row.id === action.targetId ? { ...row, content: action.newContent } : row));
    }
    default:
      return state;
  }
};

function App() {
  // const [data, setData] = useState([]);

  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const getData = useCallback(async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) => res.json());

    const initData = res.slice(0, 20).map((row) => {
      const emotion = Math.floor(Math.random() * 5) + 1;
      const id = dataId.current++;
      return {
        author: row.email,
        content: row.body,
        emotion: emotion,
        created_date: new Date().getTime(),
        id: id,
      };
    });

    dispatch({ type: 'INIT', data: initData });
    // setData(initData);
  });

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    //   const created_date = new Date().getTime();
    //   const newItem = {
    //     author,
    //     content,
    //     emotion,
    //     created_date,
    //     id: dataId.current,
    //   };

    dispatch({ type: 'CREATE', data: { author, content, emotion, id: dataId.current } });
    dataId.current += 1;

    // setData((data) => [newItem, ...data]); // 함수형 업데이트
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: 'REMOVE', targetId });
    // setData((data) => data.filter((row) => row.id !== targetId));
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: 'EDIT', targetId, newContent });
    // setData((data) => data.map((row) => (row.id === targetId ? { ...row, content: newContent } : row)));
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((row) => row.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100.0;

    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div>
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio} %</div>
      <DiaryList onRemove={onRemove} onEdit={onEdit} diaryList={data} />
    </div>
  );
}

export default App;
