// @flow
import React, { Component, createRef, type Node } from 'react';
import { SyntheticEvent, SyntheticKeyboardEvent, SyntheticInputEvent } from 'react-dom';
// eslint-disable-next-line import/no-unresolved
import shallowEqual from 'shallowequal';
import keyboardKey from 'keyboard-key';
import classNames from 'classnames';
import { Item, Value, ClassName } from './types';
import DropdownItem from './DropdownItem';

import './Dropdown.css';

type Props = {
  options: Array<Item>,
  defaultValue: Value,
  defaultOpen: boolean,
  disabled: boolean,
  className: { [key: string]: string } | string,
  style: { [key: string]: string | number },

  // Control
  customControl: (props: any) => Node,
  controlWrapperClassName: ClassName,
  controlClassName: ClassName,
  placeholder: string,
  searchable: boolean,
  tabIndex: string | number,
  onControlClick: (evt: SyntheticEvent<HTMLButtonElement>) => void,
  onControlChange: (evt: SyntheticInputEvent<HTMLInputElement>) => void,
  onControlKeyDown: (evt: SyntheticKeyboardEvent<HTMLInputElement>) => void,

  // Menu / Item
  customItem: (props: any) => Node,
  menuClassName: ClassName,
  itemsWrapperClassName: ClassName,
  itemClassName: ClassName,
  onItemClick: (evt: SyntheticEvent<HTMLButtonElement>, item: Item) => void,
  onItemKeyDown: (evt: SyntheticKeyboardEvent<HTMLButtonElement>) => void,

  // Other
  closeOnSelect: boolean,
  noResultsMessage: string,
  showArrow: boolean,
};

type State = {
  open: boolean,
  value: Value,
  query: string,
  searchedOptions: Array<Item>,
};

class Dropdown extends Component<Props, State> {
  static defaultProps: Props = {
    options: [],
    defaultValue: '',
    defaultOpen: false,
    disabled: false,
    className: '',
    style: {},

    // Control
    customControl: ({ defaultValue, selected, query, ...props }) => <input type="text" {...props} />,
    controlWrapperClassName: '',
    controlClassName: '',
    placeholder: 'Select',
    searchable: true,
    tabIndex: 1,
    onControlClick: () => {},
    onControlChange: () => {},
    onControlKeyDown: () => {},

    // Menu / Item
    customItem: ({ item, ...props }) => (
      <DropdownItem item={item} {...props}>
        {item.name}
      </DropdownItem>
    ),
    menuClassName: '',
    itemsWrapperClassName: '',
    itemClassName: '',
    onItemClick: () => {},
    onItemKeyDown: () => {},

    // Other
    closeOnSelect: true,
    noResultsMessage: 'No results found.',
    showArrow: true,
  };

  state: State = {
    open: this.props.defaultOpen,
    value: this.props.defaultValue,
    query: (this.getSelectedValue() || {}).name || '',
    searchedOptions: this.props.options.slice(0),
  };

  dropdownRef: { current: null | HTMLDivElement } = createRef();

  menuRef: { current: null | HTMLDivElement } = createRef();

  handleOutsideClick = this.outsideClick.bind(this);

  componentWillUnmount() {
    this.toggleMenu(false);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return !shallowEqual(nextProps, this.props) || !shallowEqual(nextState, this.state);
  }

  getSelectedValue(): Item {
    let { value } = this.state || {};
    value = value || this.props.defaultValue;
    return (value && this.props.options.find(x => x._id === value)) || null;
  }

  handleControlClick(evt: SyntheticEvent<HTMLButtonElement>): void {
    if (!this.state.open) this.toggleMenu(true);
    this.props.onControlClick(evt);
  }

  handleControlChange(evt: SyntheticInputEvent<HTMLInputElement>): void {
    const { options, onControlChange } = this.props;
    const { value } = evt.target;
    this.setState({
      query: value,
      searchedOptions: options.slice(0).filter(x => x.name.toLowerCase().includes(value.toLowerCase())),
    });
    onControlChange(evt);
  }

  handleControlKeyDown(evt: SyntheticKeyboardEvent<HTMLInputElement>): void {
    const { target } = evt;
    const { open } = this.state;
    const key = keyboardKey.getCode(evt);

    // Close dropdown and unfocusing input
    if (key === keyboardKey.Escape) {
      this.toggleMenu(false);
      target.blur();
    }

    // Open dropdown on press spacebar/enter
    if ([keyboardKey.Spacebar, keyboardKey.Enter].includes(key) && !open) {
      evt.preventDefault();
      this.toggleMenu(true);
    }

    // Focus first/last item
    if ([keyboardKey.ArrowDown, keyboardKey.ArrowUp].includes(key) && this.menuRef.current && open) {
      const direction = key === keyboardKey.ArrowDown ? 'first' : 'last';
      const item = this.menuRef.current.querySelector(`.cub-dropdown-item:${direction}-child`);
      if (item) item.focus();
    }
  }

  handleItemKeyDown(evt: SyntheticKeyboardEvent<HTMLButtonElement>): void {
    const { target } = evt;
    const key = keyboardKey.getCode(evt);

    // Close dropdown and unfocusing input
    if (key === keyboardKey.Escape) {
      this.toggleMenu(false);
      // TODO: Сделать фокус на control
    }

    // Focus next/prev item
    if ([keyboardKey.ArrowDown, keyboardKey.ArrowUp].includes(key) && this.menuRef.current) {
      const item =
        key === keyboardKey.ArrowDown
          ? target.nextElementSibling || this.menuRef.current.querySelector('.cub-dropdown-item:first-child')
          : target.previousElementSibling || this.menuRef.current.querySelector('.cub-dropdown-item:last-child');
      if (item) item.focus();
    }

    this.props.onItemKeyDown(evt);
  }

  handleItemClick(evt: SyntheticEvent<HTMLButtonElement>, item: Item): void {
    this.setState({ value: item._id, query: item.name });
    this.props.onItemClick(evt, item);
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

  renderControl() {
    const {
      customControl,
      defaultValue,
      disabled,
      tabIndex,
      placeholder,
      showArrow,
      controlClassName,
      controlWrapperClassName,
    } = this.props;
    const { query } = this.state;
    const controlWrapperCn = classNames('cub-dropdown-control-wrapper', controlWrapperClassName);
    const controlCn = classNames('cub-dropdown-control', controlClassName);
    return (
      <div className={controlWrapperCn}>
        {React.createElement(customControl, {
          defaultValue,
          value: query,
          disabled,
          tabIndex,
          placeholder,
          selected: this.getSelectedValue(),
          className: controlCn,
          onClick: e => this.handleControlClick(e),
          onChange: e => this.handleControlChange(e),
          onKeyDown: e => this.handleControlKeyDown(e),
        })}
        {showArrow && <span className="cub-dropdown-arrow">&rsaquo;</span>}
      </div>
    );
  }

  renderOption(item: Item) {
    const { customItem, itemClassName } = this.props;
    const itemCn = classNames('cub-dropdown-item', itemClassName);
    return React.createElement(customItem, {
      item,
      key: item._id,
      selected: this.getSelectedValue(),
      className: itemCn,
      onClick: e => this.handleItemClick(e, item),
      onKeyDown: e => this.handleItemKeyDown(e, item),
    });
  }

  renderMenu(): Node {
    const { options, searchable, noResultsMessage, menuClassName, itemsWrapperClassName } = this.props;
    const { open, query, searchedOptions } = this.state;

    const menuCn = classNames('cub-dropdown-menu', { '-open': open }, menuClassName);
    const itemsCn = classNames('cub-dropdown-items', itemsWrapperClassName);

    const visibleOptions = searchable && query ? searchedOptions : options;

    return (
      <div className={menuCn} ref={this.menuRef}>
        {!visibleOptions.length && noResultsMessage}
        {visibleOptions.length > 0 && (
          <div className="cub-dropdown-menu-inner">
            <div className={itemsCn}>{visibleOptions.map(this.renderOption.bind(this))}</div>
          </div>
        )}
      </div>
    );
  }

  render() {
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
