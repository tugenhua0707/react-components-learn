import Pagination from '../../../../components/pagination';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
<div>
  <Pagination
    showTotal={(total) => `Total ${total} items`}
    total={455}
  />
  <br />
  <Pagination
    showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total} items`}
    total={455}
  />
</div>
, document.getElementById('showTotal'));