import React, { useRef, useState, useEffect, useMemo, useCallback, useReducer, useContext } from 'react';
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

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
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
  });

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({ type: 'CREATE', data: { author, content, emotion, id: dataId.current } });
    dataId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: 'REMOVE', targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: 'EDIT', targetId, newContent });
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((row) => row.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100.0;

    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div>
          <DiaryEditor onCreate={onCreate} />
          <div>?????? ?????? : {data.length}</div>
          <div>?????? ?????? ?????? ?????? : {goodCount}</div>
          <div>?????? ?????? ?????? ?????? : {badCount}</div>
          <div>?????? ?????? ?????? ?????? : {goodRatio} %</div>
          <DiaryList onRemove={onRemove} onEdit={onEdit} />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
