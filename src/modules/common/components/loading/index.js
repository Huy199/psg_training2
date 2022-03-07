import React from 'react';

import './loading.css';

const Loading = ({ isStudent }) => {
  return (
    <div id='loading'>
      <div className={`loader ${isStudent && 'student'}`}></div>
    </div>
  );
};

export default Loading;
