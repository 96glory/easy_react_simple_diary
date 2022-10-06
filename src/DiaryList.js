import DiaryItem from './DiaryItem';

const DiaryList = (props) => {
  const { onDelete, diaryList } = props;

  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      {diaryList.map((row, idx) => (
        <DiaryItem key={row.id} {...row} onDelete={onDelete} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
