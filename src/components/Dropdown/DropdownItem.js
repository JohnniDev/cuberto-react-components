// @flow
import React, { Component } from 'react';
import { Item } from './types';

type Props = {
  item: Item,
};

class DropdownItem extends Component<Props> {
  render() {
    const { item, ...props } = this.props;
    return (
      <button type="button" {...props}>
        {item.name}
      </button>
    );
  }
}

export default DropdownItem;
