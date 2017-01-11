
import React from 'react';
import ReactDOM from 'react-dom';
import Switch from '../../../../components/switch';

function onChange(value) {
  console.log('switch checked:' + value);
}

const Test = React.createClass({
  getInitialState: function() {
    return {
      disabled: false
    };
  },
  toggle: function() {
    this.setState({
      disabled: !this.state.disabled
    });
  },
  render: function() {
    console.log(this.state.disabled);
    return (
      <div style={{margin: 20}}>
        <Switch onChange={onChange} disabled={this.state.disabled} checkedChildren={'开'} unCheckedChildren={'关'} />
        <div><button onClick={this.toggle}>toggle disabled</button></div>
      </div>
    );
  }
});

ReactDOM.render(<Test />, document.getElementById('switch'));
