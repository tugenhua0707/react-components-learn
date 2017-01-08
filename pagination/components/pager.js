
const React = require('react');

class Pager extends React.Component {
  render() {
    const props = this.props;
    const prefixCls = `${props.rootPrefixCls}-item`;
    let cls = `${prefixCls} ${prefixCls}-${props.page}`;
    if (props.active) {
      cls = `${cls} ${prefixCls}-active`;
    }
    if (props.className) {
      cls = `${cls} ${props.className}`;
    }
    return (
      <li title={props.page} className={cls} onClick={props.onClick}>
        <a href='javascript:void(0)'>{props.page}</a>
      </li>
    )
  }
}

Pager.propTypes = {
  page: React.PropTypes.number,
  active: React.PropTypes.bool,
  className: React.PropTypes.string,
};

module.exports = Pager;