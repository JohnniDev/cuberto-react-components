// @flow
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';

type Props = {
  options: Array<any>,
};

type State = {
  options: Array<any>,
};

class Dropdown extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      options: props.options || [],
    };
  }

  render() {
    const { options } = this.state;

    const items = options.map(({ name }, idx) => (
      <div key={idx}>
        <li>{name}</li>
      </div>
    ));

    return (
      <div>
        <ul>{items}</ul>
      </div>
    );
  }
}

export default Dropdown;
