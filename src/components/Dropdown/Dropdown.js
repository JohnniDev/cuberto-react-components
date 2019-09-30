// @flow
import React, { Component, createRef, type Node } from 'react';
import { SyntheticEvent, SyntheticInputEvent } from 'react-dom';
import shallowEqual from 'shallowequal';
import classNames from 'classnames';
import { Item, Value, ClassName } from './types';
import DropdownItem from './DropdownItem';

import './Dropdown.css';

type Props = {
  options: Array<Item>,
  value: Value,
  defaultOpen: boolean,
  disabled: boolean,
  className: { [key: string]: string } | string,
  style: { [key: string]: string | number },

  // Control
  customControl: (props: any) => Node,
  controlWrapperClassName: ClassName,
  controlClassName: ClassName,
  onControlClick: (evt: SyntheticEvent<HTMLButtonElement>) => void,
  onControlChange: (evt: SyntheticInputEvent<HTMLInputElement>) => void,
  placeholder: string,
  searchable: boolean,

  // Menu / Item
  menuClassName: ClassName,
  itemsWrapperClassName: ClassName,
  itemClassName: ClassName,
  onSelect: (evt: SyntheticEvent<HTMLButtonElement>, item: Item) => void,
  renderItem: (item: Item, selected: Item) => (props: any) => Node,

  // Other
  closeOnSelect: boolean,
  noResultsMessage: string,
};

type State = {
  open: boolean,
  searchedOptions: Array<Item>,
};

class Dropdown extends Component<Props, State> {
  static defaultProps: Props = {
    options: [],
    value: '',
    defaultOpen: false,
    disabled: false,
    className: '',
    style: {},

    // Control
    customControl: ({ selected, query, ...props }) => <input type="text" {...props} value={query} />,
    controlWrapperClassName: '',
    controlClassName: '',
    onControlClick: () => {},
    onControlChange: () => {},
    placeholder: 'Select',

    // Menu / Item
    menuClassName: '',
    itemsWrapperClassName: '',
    itemClassName: '',
    onSelect: () => {},
    renderItem: item => props => (
      <DropdownItem item={item} {...props}>
        {item.name}
      </DropdownItem>
    ),

    // Other
    closeOnSelect: true,
    noResultsMessage: 'No results found.',
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      open: props.defaultOpen,
      searchedOptions: props.options.slice(0),
    };
  }

  dropdownRef: { current: null | HTMLDivElement } = createRef();

  handleOutsideClick = this.outsideClick.bind(this);

  componentWillUnmount() {
    this.toggleMenu(false);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return !shallowEqual(nextProps, this.props) || !shallowEqual(nextState, this.state);
  }

  getSelectedValue(): Item {
    const { value, options } = this.props;
    return (value && options.find(x => x._id === value)) || null;
  }

  handleControlClick(evt: SyntheticEvent<HTMLButtonElement>): void {
    if (!this.state.open) this.toggleMenu(true);
    this.props.onControlClick(evt);
  }

  handleControlChange(evt: SyntheticInputEvent<HTMLInputElement>): void {
    const { options, onControlChange } = this.props;
    const { value } = evt.target;
    this.setState({
      searchedOptions: options.slice(0).filter(x => x.name.toLowerCase().includes(value.toLowerCase())),
    });
    onControlChange(evt);
  }

  handleItemClick(evt: SyntheticEvent<HTMLButtonElement>, item: Item): void {
    this.props.onSelect(evt, item);
    if (this.props.closeOnSelect) this.toggleMenu(false);
  }

  outsideClick(evt: SyntheticEvent<any>): void {
    if (this.dropdownRef.current && this.dropdownRef.current.contains((evt.target: any))) return;
    this.toggleMenu(false);
  }

  toggleMenu(open: boolean): void {
    this.setState({ open });
    if (!open) this.setState({ searchedOptions: this.props.options });
    const action = open ? 'addEventListener' : 'removeEventListener';
    // $FlowFixMe
    document[action]('click', this.handleOutsideClick, false);
  }

  renderControl(): Node {
    const { customControl, value, disabled, placeholder, controlClassName, controlWrapperClassName } = this.props;
    const controlWrapperCn = classNames('cub-dropdown-control-wrapper', controlWrapperClassName);
    const controlCn = classNames('cub-dropdown-control', controlClassName);
    const selected = this.getSelectedValue();
    return (
      <div className={controlWrapperCn}>
        {React.createElement(customControl, {
          value,
          query: (selected && selected.name) || '',
          disabled,
          placeholder,
          selected,
          className: controlCn,
          onClick: e => this.handleControlClick(e),
          onChange: e => this.handleControlChange(e),
        })}
      </div>
    );
  }

  renderOption(item: Item): Node {
    const { renderItem, itemClassName } = this.props;
    const itemCn = classNames('cub-dropdown-item', itemClassName);
    const Option = renderItem(item);
    return <Option key={item._id} className={itemCn} onClick={e => this.handleItemClick(e, item)} />;
  }

  renderMenu(): Node {
    const { options, noResultsMessage, menuClassName, itemsWrapperClassName } = this.props;
    const { open } = this.state;

    const menuCn = classNames('cub-dropdown-menu', { '-open': open, '-empty': !options.length }, menuClassName);
    const itemsCn = classNames('cub-dropdown-items', itemsWrapperClassName);

    if (!options.length) return <div className={menuCn}>{noResultsMessage}</div>;

    return (
      <div className={menuCn}>
        <div className="cub-dropdown-menu-inner">
          <div className={itemsCn}>{options.map(this.renderOption.bind(this))}</div>
        </div>
      </div>
    );
  }

  render(): Node {
    const { style, className } = this.props;
    const { open } = this.state;

    const dropdownCn = classNames('cub-dropdown', { '-opened': open }, className);

    return (
      <div className={dropdownCn} ref={this.dropdownRef} style={style}>
        {this.renderControl()}
        {open && this.renderMenu()}
      </div>
    );
  }
}

export default Dropdown;
