const React = require('react');
const classNames = require('classnames');

function noop() {

}

class Switch extends React.Component {
  constructor(props) {
    super(props);
    let checked = false;
    if ('checked' in props) {
      checked = !!props.checked;
    } else {
      checked = !!props.defaultChecked;
    }
    this.state = {
      checked,
    };
    [
      'render', 
      'handleKeyDown',
      'toggle',
      'handleMouseUp'
    ].forEach((method) => this[method] = this[method].bind(this));
  }
  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked
      });
    }
  }
  handleKeyDown(e) {
    if (e.keyCode === 37) {
      this.setChecked(false);
    }
    if (e.keyCode === 39) {
      this.setChecked(true);
    }
  }
  handleMouseUp(e) {
    if (this.refs.node) {
      this.refs.node.blur();
    }
    if (this.props.onMouseUp) {
      this.props.onMouseUp(e);
    }
  }
  toggle() {
    const checked = !this.state.checked;
    this.setChecked(checked);
  }
  setChecked(checked) {
    if (!('checked' in this.props)) {
      this.setState({
        checked,
      });
    }
    this.props.onChange(checked);
  }
  render() {
    const {
      className, 
      prefixCls, 
      disabled, 
      checkedChildren, 
      unCheckedChildren,
      ...restProps
    } = this.props;
    const checked = this.state.checked;
    const switchClassName = classNames({
      [className]: !!className,
      [prefixCls]: true,
      [`${prefixCls}-checked`]: checked,
      [`${prefixCls}-disabled`]: disabled,
    });
    return (
      <span {...restProps}
        className={switchClassName}
        ref="node"
        onKeyDown={this.handleKeyDown}
        onClick={disabled ? noop : this.toggle}
        onMouseUp={this.handleMouseUp}>
        <span className={`${prefixCls}-inner`}>
          {checked ? checkedChildren : unCheckedChildren}
        </span>
      </span>
    );
  }
}

Switch.propTypes = {
  className: React.PropTypes.string,
  prefixCls: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  checkedChildren: React.PropTypes.object,
  unCheckedChildren: React.PropTypes.object,
  onChange: React.PropTypes.func,
  onMouseUp: React.PropTypes.func
};

Switch.defaultProps = {
  prefixCls: 'rc-switch',
  checkedChildren: null,
  unCheckedChildren: null,
  className: '',
  defaultChecked: false,
  onChange: noop
};

module.exports = Switch;