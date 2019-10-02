import React, { useEffect } from 'react';
import { Dropdown, DropdownItem, useDropdown } from 'cuberto-react-components';

export default function DropdownPageWithHooks() {
  const dropdown = useDropdown([], '', null);

  useEffect(() => {
    dropdown.setOptions(getOptions());
  }, []);

  const getOptions = (term = '') => {
    const options = [
      { _id: 'first', name: 'First' },
      { _id: 'second', name: 'Second' },
    ];
    return options.filter(x => x.name.toLowerCase().includes(term.toLowerCase()));
  };

  const onSelect = selected => {
    dropdown.setValue(selected.name);
    dropdown.setSelected(selected);
  };

  const onChange = evt => {
    const { value } = evt.target;
    this.setState({ value, options: getOptions(value) });
  };

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
            options={dropdown.options}
            value={dropdown.value}
            itemClassName="button"
            customControlProps={{
              className: 'input',
              placeholder: 'Base',
              onChange: (evt, val) => onChange(evt, val),
            }}
            onSelect={selected => onSelect(selected)}
            footer={({ handleClose, handleItemKeyDown }) => (
              <DropdownItem
                onClick={() => {
                  handleClose();
                  console.log('Footer click!');
                }}
                onKeyDown={handleItemKeyDown}
                className="button"
              >
                Footer
              </DropdownItem>
            )}
          />
        </div>
      </div>

      <div className="panel is-padding-bottom">
        <p className="panel-heading">Options</p>
        <div className="panel-block">
          <pre>{JSON.stringify(dropdown.selected, null, 4)}</pre>
        </div>
      </div>
    </section>
  );
}
