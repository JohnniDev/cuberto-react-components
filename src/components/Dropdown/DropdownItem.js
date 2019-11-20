// @flow
import React, { Component, Children } from 'react';
import classNames from 'classnames';
import { Item } from './types';

type Props = {
  item: Item,
  children: Node,
  className: any,
};

class DropdownItem extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { children, className, ...props } = this.props;
    const buttonCn = classNames(className, 'cub-dropdown-item');
    return (
      <button type="button" className={buttonCn} {...props}>
        {Children.toArray(children)}
      </button>
    );
  }
}

export default DropdownItem;
