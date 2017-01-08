// use jsx to render html, do not modify simple.html
import Pagination from '../../../../components/pagination';
import React from 'react';
import ReactDOM from 'react-dom';
const App3 = React.createClass({
  onChange: function(page) {
    console.log(page);
  },
  render: function() {
    return (<Pagination simple defaultCurrent={1} total={50} onChange={this.onChange}/>)
  }
})
ReactDOM.render(
  <App3 />,
  document.getElementById('simpleId')
);
