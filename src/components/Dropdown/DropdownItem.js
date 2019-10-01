// @flow
import React, { Component, Children } from 'react';
import { Item } from './types';

type Props = {
  item: Item,
  children: Node,
};

class DropdownItem extends Component<Props> {
  render() {
    const { children, ...props } = this.props;
    return (
      <button type="button" className="cub-dropdown-item" {...props}>
        {Children.toArray(children)}
      </button>
    );
  }
}

export default DropdownItem;
