// @flow
import React, { Component, createRef, type Node } from 'react';
import { SyntheticEvent, SyntheticKeyboardEvent } from 'react-dom';
import shallowEqual from 'shallowequal';
import keyboardKey from 'keyboard-key';
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
  customControlArrow?: (props: any) => Node,
  customControlProps: { [key: string]: any },
  onControlClick: (evt: SyntheticEvent<HTMLButtonElement>) => void,
  onControlKeyDown: (evt: SyntheticKeyboardEvent<HTMLInputElement>) => void,

  // Menu / Item
  customItem: (props: any) => Node,
  menuClassName: ClassName,
  itemsWrapperClassName: ClassName,
  itemClassName: ClassName,
  onSelect: Item => void,
  onItemKeyDown: (evt: SyntheticKeyboardEvent<HTMLButtonElement>) => void,
  onClose: () => void,

  // Other
  closeOnSelect: boolean,
  customNoResults: Node,
  footer?: (props: any) => Node,
  header?: (props: any) => Node,
  getLabel: Item => string,
  getValue: Item => string,
};

type State = {
  open: boolean,
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
    customControl: ({ ...props }) => <input type="text" {...props} />,
    controlWrapperClassName: '',
    customControlProps: {},
    onControlClick: () => {},
    onControlKeyDown: () => {},

    // Menu / Item
    customItem: ({ item, getLabel, ...props }) => (
      <DropdownItem item={item} {...props}>
        {getLabel(item)}
      </DropdownItem>
    ),
    menuClassName: '',
    itemsWrapperClassName: '',
    itemClassName: '',
    onSelect: () => {},
    onItemKeyDown: () => {},
    onClose: () => {},

    // Other
    closeOnSelect: true,
    customNoResults: <div>Nothing found</div>,
    getLabel: x => x.name,
    getValue: x => x._id,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      open: props.defaultOpen,
    };
  }

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
    const { value, options, getValue } = this.props;
    return (value && options.find(x => getValue(x) === value)) || null;
  }

  getItemsElements(): NodeList<HTMLElement> | [] {
    return (this.menuRef.current && this.menuRef.current.querySelectorAll('.cub-dropdown-item')) || [];
  }

  handleControlClick(evt: SyntheticEvent<HTMLButtonElement>): void {
    if (!this.state.open) this.toggleMenu(true);
    this.props.onControlClick(evt);
  }

  handleControlKeyDown(evt: SyntheticKeyboardEvent<HTMLInputElement>): void {
    const { target } = evt;
    const { options, onSelect } = this.props;
    const { open } = this.state;
    const key = keyboardKey.getCode(evt);

    // Close dropdown and unfocusing input
    if (key === keyboardKey.Escape) {
      this.toggleMenu(false);
      target.blur();
    }

    // Open dropdown on press any key
    if (!open) {
      evt.preventDefault();
      this.toggleMenu(true);
    }

    // Close dropdown and select first item
    if (key === keyboardKey.Enter && open && options[0]) {
      evt.preventDefault();
      onSelect(options[0]);
      this.toggleMenu(false);
    }

    // Focus first/last item
    if ([keyboardKey.ArrowDown, keyboardKey.ArrowUp].includes(key) && open) {
      evt.preventDefault();
      const $items = this.getItemsElements();
      const idx = key === keyboardKey.ArrowDown ? 0 : $items.length - 1;
      // $FlowFixMe
      if (idx >= 0 && $items[idx]) $items[idx].focus();
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
    if ([keyboardKey.ArrowDown, keyboardKey.ArrowUp].includes(key)) {
      evt.preventDefault();
      const $items = Array.from(this.getItemsElements());
      const currentIdx = $items.indexOf(target);
      const $next = $items[currentIdx + 1] ? $items[currentIdx + 1] : $items[0];
      const $prev = $items[currentIdx - 1] ? $items[currentIdx - 1] : $items[$items.length - 1];
      const $item = key === keyboardKey.ArrowDown ? $next : $prev;
      if ($item) $item.focus();
    }

    this.props.onItemKeyDown(evt);
  }

  handleItemClick(evt: SyntheticEvent<HTMLButtonElement>, item: Item): void {
    this.props.onSelect(item);
    if (this.props.closeOnSelect) this.toggleMenu(false);
  }

  outsideClick(evt: SyntheticEvent<any>): void {
    if (this.dropdownRef.current && this.dropdownRef.current.contains((evt.target: any))) return;
    this.toggleMenu(false);
  }

  toggleMenu(open: boolean): void {
    this.setState({ open });
    const action = open ? 'addEventListener' : 'removeEventListener';
    // $FlowFixMe
    document[action]('click', this.handleOutsideClick, false);
    if (!open) this.props.onClose();
  }

  renderControl(): Node {
    const {
      customControl,
      customControlArrow,
      value,
      disabled,
      customControlProps,
      controlWrapperClassName,
    } = this.props;
    const { open } = this.state;

    const controlWrapperCn = classNames('cub-dropdown-control-wrapper', controlWrapperClassName);
    const controlCn = classNames('cub-dropdown-control', customControlProps.className);
    const defaultProps = { tabIndex: 1, placeholder: 'Select' };
    const props = { ...defaultProps, ...customControlProps, className: controlCn };

    return (
      <div className={controlWrapperCn}>
        {React.createElement(customControl, {
          value,
          disabled,
          ...props,
          autoComplete: 'off',
          className: controlCn,
          onClick: e => this.handleControlClick(e),
          onKeyDown: e => this.handleControlKeyDown(e),
        })}
        {customControlArrow && React.createElement(customControlArrow, { open })}
      </div>
    );
  }

  renderOption(item: Item) {
    const { getValue, getLabel, customItem, itemClassName } = this.props;
    const itemCn = classNames('cub-dropdown-item', itemClassName);
    return React.createElement(customItem, {
      item,
      key: getValue(item),
      selected: this.getSelectedValue(),
      className: itemCn,
      getLabel,
      onClick: e => this.handleItemClick(e, item),
      onKeyDown: e => this.handleItemKeyDown(e),
    });
  }

  rennderHeader(): Node {
    const { header } = this.props;
    if (!header) return false;
    return React.createElement(header, {
      // Close menu from header/footer
      handleClose: () => this.toggleMenu(false),
      // DropdownItem keyboard navigation
      handleItemKeyDown: evt => this.handleItemKeyDown(evt),
    });
  }

  rennderFooter(): Node {
    const { footer } = this.props;
    if (!footer) return false;
    return React.createElement(footer, {
      // Close menu from header/footer
      handleClose: () => this.toggleMenu(false),
      // DropdownItem keyboard navigation
      handleItemKeyDown: evt => this.handleItemKeyDown(evt),
    });
  }

  renderMenu(): Node {
    const { options, customNoResults, menuClassName, itemsWrapperClassName } = this.props;
    const { open } = this.state;

    const menuCn = classNames('cub-dropdown-menu', { '-open': open, '-empty': !options.length }, menuClassName);
    const itemsCn = classNames('cub-dropdown-items', itemsWrapperClassName);

    return (
      <div className={menuCn} ref={this.menuRef}>
        {options.length <= 0 && customNoResults}
        {options.length > 0 && (
          <div className="cub-dropdown-menu-inner">
            {this.rennderHeader()}
            <div className={itemsCn}>{options.map(this.renderOption.bind(this))}</div>
            {this.rennderFooter()}
          </div>
        )}
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
