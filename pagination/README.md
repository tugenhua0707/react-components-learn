## 分页的思路是：
<p>1. 当总页数小于或者等于9的时候，页码在页面上完全显示出来，为1，2，3，4，5，6，7，8，9 </p>
<p>2. 当总页数大于9的时候，获取当前页码 然后当前页码进行如下计算：</p>
    let left = Math.max(1, current - 2);
    let right = Math.min(current + 2, allPages);
<p>第一个left就是取当前页面 减去 2 取最大值，也就是说，前面留2个页码，第二个right 取当前页+2 和 总页数的最小值，也就是想后面也留2个页码，</p>
<p>如下代码：如果当前页码等于或者小于3的话，那么right = 5</p>
<pre>
if (current - 1 <= 2) {
  right = 1 + 4;
}
</pre>
<p>如果总页数 减去 当前页码的时候 小于或者等于2的话，那么left = 总页数 - 4</p>
<pre>
if (allPages - current <= 2) {
  left = allPages - 4;
}
</pre>
<p>如上两个if判断的目的 就是希望页面上只保留5个页码按钮；</p>
<p>然后如下循环一下：</p>
<pre>
for (let i = left; i <= right; i++) {
  const active = current === i;
  pagerList.push(
    <Pager
      locale={props.locale}
      rootPrefixCls={prefixCls}
      onClick={this._handleChange.bind(this, i)}
      key={i}
      page={i}
      active={active}
    />
  );
}
</pre>
<p>把所有的页码渲染出来；</p>

<p>3. 如果当前的页码是大于或者等于5的时候，先复制一份第一页的页码，然后在所有页码之前插入省略号；如下代码：</p>
<pre>
var jumpPrev = (
  <li
    key="prev"
    onClick={this._jumpPrev}
    className={`${prefixCls}-jump-prev`}
  >
    <a href="javascript:void(0)" title={locale.prev_5}></a>
  </li>
);
if (current - 1 >= 4) {
  pagerList[0] = React.cloneElement(pagerList[0], {
    className: `${prefixCls}-item-after-jump-prev`,
  });
  pagerList.unshift(jumpPrev);
}
</pre>
<p>当点击上一页省略号按钮的时候，会触发 _jumpPrev 方法；代码如下：</p>
<pre>
_jumpPrev() {
  this._handleChange(Math.max(1, this.state.current - 5));
}
</pre>
<p>会取 当前页码 - 5 和 1的最大值； 然后调用 _handleChange 这个方法；代码如下：</p>
<pre>
_handleChange(p) {
  let page = p;
  if (this._isValid(page)) {
    // 当前的页码大于总页数的时候 就把总页数赋值给当前页
    if (page > this._calcPage()) {
      page = this._calcPage();
    }
    if (!('current' in this.props)) {
      this.setState({
        current: page,
        _current: page,
      });
    } else {
      // 重新渲染render方法
      this.setState({
        current: page,
      });
    }
    this.props.onChange(page);
  }
} 
</pre>
<p>调用成功后，会调用onChange这个参数传递进来的方法，我们在外面就可以使用该方法获取当前的页面后，可以做自己的事情。
也就是说，如果当前的页面是7的话，点击前五页的省略按钮，那么Math.max(1, this.state.current - 5) 执行这个比较，
最大值变为2，因此会切换到当前第二页的页码。后面会重新排列；如：</p>
#### ![image](https://github.com/tugenhua0707/react-components-learn/blob/master/pagination/page1.png)

<p>点击前面的省略号的时候，变为如下图所示：</p>
#### ![image](https://github.com/tugenhua0707/react-components-learn/blob/master/pagination/page2.png)

<p>4. 如果总页码 - 当前所在的页码 >= 4 的时候，先克隆最后一页的页码，最后在所有页码之后插入一个省略号；如下代码：</p>
    var jumpNext = (
      <li
        key="next"
        onClick={this._jumpNext}
        className={`${prefixCls}-jump-next`}
      >
        <a href="javascript:void(0)" title={locale.next_5}></a>
      </li>
    );
    if (allPages - current >= 4) {
      pagerList[pagerList.length - 1] = React.cloneElement(pagerList[pagerList.length - 1], {
        className: `${prefixCls}-item-before-jump-next`,
      });
      pagerList.push(jumpNext);
    }
<p>和上面的是一个道理的，点击后面的省略号，会调用这个方法  _jumpNext；代码如下：</p>
<pre>
_jumpNext() {
  this._handleChange(Math.min(this._calcPage(), this.state.current + 5));
}
</pre>
<p>总页码 和 当前的页码 + 5  最小值进行比较；如果当前的页面是6的话，如下所示：</p>
#### ![image](https://github.com/tugenhua0707/react-components-learn/blob/master/pagination/page3.png)

<p>点击第二个省略号的时候，就会变为如下图所示：</p>
#### ![image](https://github.com/tugenhua0707/react-components-learn/blob/master/pagination/page4.png)


<p>5. 最后判断下 left 是不是等于1 和 right 是不是等于总页数，如果不是的话，就把刚刚克隆的第一页 添加
到第一页去，克隆的最后一页放到最后一页去；如下代码：</p>
<pre>
if (left !== 1) {
  pagerList.unshift(firstPager);
}
if (right !== allPages) {
  pagerList.push(lastPager);
}
</pre>
<p>6. 最后把在页面上显示的文本加上去；比如当前页面是2的话，那么前面显示的文案就是 11-20 of 455 items</p>
<p>代码如下：</p>
    let totalText = null;
    if (props.showTotal) {
      totalText = (
        <span className={`${prefixCls}-total-text`}>
          {props.showTotal(
            props.total,
            [
              (current - 1) * pageSize + 1,
              current * pageSize > props.total ? props.total : current * pageSize,
            ]
          )}
        </span>
      );
    }
<p>页面上调用方法如下：</p>
<pre>
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
</pre>
<p>效果如下：</p>
#### ![image](https://github.com/tugenhua0707/react-components-learn/blob/master/pagination/page5.png)

#### 第一个分页是显示总页数，第二个分页显示 开始页和结束页，及总页数；showTotal函数会返回二个参数，第一个是总页数，第二个是一个数组
，当前页码的，开始页和结束页码；
<p>最后return返回如下代码：</p>
    return (
      <ul
        className={`${prefixCls} ${props.className}`}
        style={props.style}
        unselectable="unselectable"
      >
        {totalText}
        <li
          onClick={this._prev}
          className={`${this._hasPrev() ? '' : `${prefixCls}-disabled`} ${prefixCls}-prev`}
        >
          <a href="javascript:void(0)" title={locale.prev_page}></a>
        </li>
        {pagerList}
        <li
          onClick={this._next}
          className={`${this._hasNext() ? '' : `${prefixCls}-disabled`} ${prefixCls}-next`}
        >
          <a href="javascript:void(0)" title={locale.next_page}></a>
        </li>
        <Options
          locale={props.locale}
          rootPrefixCls={prefixCls}
          selectComponentClass={props.selectComponentClass}
          selectPrefixCls={props.selectPrefixCls}
          changeSize={this.props.showSizeChanger ? this._changePageSize.bind(this) : null}
          current={this.state.current}
          pageSize={this.state.pageSize}
          pageSizeOptions={this.props.pageSizeOptions}
          quickGo={this.props.showQuickJumper ? this._handleChange.bind(this) : null}
        />
      </ul>
    );
<p>支持所有的分页如下所示：</p>
![image](https://github.com/tugenhua0707/react-components-learn/blob/master/pagination/page6.png)

## API

### props

### Pagination

| Parameter        | Description                        | Type          | Default                  |
|------------------|------------------------------------|---------------|--------------------------|
| defaultCurrent   | uncontrolled current page          | Number        | 1                        |
| current          | current page                       | Number        | undefined                |
| total            | items total count                  | Number        | 0                        |
| defaultPageSize  | default items per page             | Number        | 10                       |
| pageSize         | items per page                     | Number        | 10                       |
| onChange         | page change callback               | Function([changedTo])      | -                     |
| showTotal        | show total records and range            | Function(total, [from, to]) | -               |
| className        | className of pagination            | String        | -                         |
| simple           | when set, show simple pager        | Object        | null                     |
| locale           | to set l10n config                 | Object        | [zh_CN](https://github.com/react-component/pagination/blob/master/src/locale/zh_CN.js) |
| style            | the style of pagination            | Object        | {}                       |