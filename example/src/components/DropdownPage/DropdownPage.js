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
      <section className="section is-paddingless">
        <div className="container is-padding-bottom">
          <h1 className="title">
            Dropdown
          </h1>
          <h2 className="subtitle">
            Dropdown subtitle
          </h2>
        </div>

        <div className="panel is-padding-bottom">
          <p className="panel-heading">Base</p>
          <div className="panel-block">
            <Dropdown
              options={options}
              defaultOpen={isOpen}
              defaultValue={options[0]._id}
              itemClassName="button"
              controlClassName="input"
              placeholder="Base"
            />
          </div>
        </div>

        <div className="panel is-padding-bottom">
          <p className="panel-heading">Custom control</p>
          <div className="panel-block">
            <div>
              Lorem ipsum

              <Dropdown
                options={options}
                defaultOpen={isOpen}
                defaultValue={options[0]._id}
                itemClassName="button"
                customControl={Control}
                style={{ display: 'inline-block', padding: '0 5px' }}
              />

              sit amet, consectetur adipisicing elit. Accusamus accusantium at beatae cum,
              dolor fugiat fugit iste laborum, laudantium neque nulla obcaecati odio pariatur quam qui reiciendis
              repudiandae saepe similique tenetur voluptatum. Aliquam dolor iure, iusto maxime nesciunt possimus sequi
              similique vel. Ab accusantium, assumenda dolores earum illum minus modi.
            </div>
          </div>
        </div>
      </section>
    );
  }
};