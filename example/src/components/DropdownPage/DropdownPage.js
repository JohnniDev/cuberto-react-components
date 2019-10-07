import React, { Component } from 'react';
import { Dropdown, DropdownItem } from 'cuberto-react-components';

const Arrow = ({ open }) => <span className={open ? '-open' : ''}>&darr;</span>;

export default class DropdownPage extends Component {
  state = {
    options: this.getOptions(),
    value: '',
    selected: null,
  };

  getOptions(term = '') {
    const options = [
      { _id: 'first', name: 'First' },
      { _id: 'second', name: 'Second' },
    ];
    return options.filter(x => x.name.toLowerCase().includes(term.toLowerCase()));
  }

  onSelect(evt, selected) {
    this.setState({ selected, value: selected.name });
  }

  onChange(evt) {
    const { value } = evt.target;
    this.setState({ value, options: this.getOptions(value) });
  }

  render() {
    const { options, value, selected } = this.state;

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

        <div className="is-padding-bottom">
          <button type="button" className="button" onClick={() => this.setState({ options: this.getOptions(), value: '', selected: null })}>Clear</button> &nbsp;
        </div>

        <div className="panel is-padding-bottom">
          <p className="panel-heading">Base</p>
          <div className="panel-block">
            <Dropdown
              options={options}
              value={value}
              openOnFocus={true}
              customItemProps={{
                className: 'button',
              }}
              customControlProps={{
                className: 'input',
                placeholder: 'Base',
                onChange: (evt, val) => this.onChange(evt, val),
              }}
              customControlArrow={Arrow}
              onSelect={this.onSelect.bind(this)}
              footer={({ handleClose, handleItemKeyDown }) => (
                <DropdownItem
                  onClick={handleClose}
                  onKeyDown={evt => {
                    evt.preventDefault();
                    handleItemKeyDown(evt);
                  }}
                  className="button"
                >
                  Footer
                </DropdownItem>
              )}
            />
          </div>
        </div>

        <div className="panel is-padding-bottom">
          <p className="panel-heading">Selected</p>
          <div className="panel-block">
            <pre>{JSON.stringify(selected, null, 4)}</pre>
          </div>
        </div>
      </section>
    );
  }
};
