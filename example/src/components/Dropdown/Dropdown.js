import React from 'react';
import { Dropdown } from 'cuberto-react-components';

const options = [
  { _id: 'first', name: 'First' },
  { _id: 'second', name: 'Second' },
];

export default () => (
  <>
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Dropdown</h1>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <Dropdown
          options={options}
          defaultValue={options[0]._id}
          controlWrapperClassName="ui input"
          itemsWrapperClassName="ui vertical buttons"
          itemClassName="ui button"
        />
      </div>
    </section>
  </>
);