/* eslint func-names: 0, no-console: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from '../../../../components/pagination';
const App = React.createClass({
  getInitialState: function() {
    return {
      current: 3
    };
  },
  onChange: function(page) {
    console.log(page);
  },
  render: function() {
    return <Pagination onChange={this.onChange} current={this.state.current} total={25} />
  }
});

ReactDOM.render(<App />, document.getElementById('defaultId'));
