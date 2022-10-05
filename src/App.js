import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const dummyList = [
  {
    id: 1,
    author: 'glory',
    content: 'hi 1',
    emotion: 5,
    created_date: new Date().getTime(),
  },
  {
    id: 2,
    author: 'song',
    content: 'hi 1222',
    emotion: 2,
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: 'min',
    content: 'hi 1333',
    emotion: 7,
    created_date: new Date().getTime(),
  },
  {
    id: 4,
    author: 'toby',
    content: 'hi 1444',
    emotion: 8,
    created_date: new Date().getTime(),
  },
  {
    id: 5,
    author: 'spring',
    content: 'hi 1555',
    emotion: 1,
    created_date: new Date().getTime(),
  },
];

function App() {
  return (
    <div>
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
