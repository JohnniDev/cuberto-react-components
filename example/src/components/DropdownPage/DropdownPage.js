import React, { Component } from 'react';
import { Dropdown } from 'cuberto-react-components';

const options = [
  { _id: 'first', name: 'First' },
  { _id: 'second', name: 'Second' },
];

const Control = ({ selected, ...props }) => (<span {...props}>{selected && selected.name || 'null'}</span>);

export default class DropdownPage extends Component {
  state = {
    isOpen: false,
  };

  render() {
    const { isOpen } = this.state;

    return (
      <>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <div className="column">
                <h1 className="title">Dropdown</h1>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="column">
              <Dropdown
                options={options}
                defaultOpen={isOpen}
                defaultValue={options[0]._id}
                itemClassName="button"
                customControl={Control}
              />
            </div>
          </div>
        </section>
      </>
    );
  }
};