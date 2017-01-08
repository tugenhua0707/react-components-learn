
import Pagination from '../../../../components/pagination';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Pagination className="ant-pagination" defaultCurrent={3} total={450} />,
  document.getElementById('moreId')
);