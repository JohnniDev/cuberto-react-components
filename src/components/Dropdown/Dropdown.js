// @flow
import React, { Component, createRef, type Node } from 'react';
// eslint-disable-next-line import/no-unresolved
import { SyntheticEvent, SyntheticKeyboardEvent } from 'react-dom';
import shallowEqual from 'shallowequal';
import keyboardKey from 'keyboard-key';
import classNames from 'classnames';
import { Item, Value, ClassName } from './types';
import DropdownItem from './DropdownItem';

import './Dropdown.css';

const defaultMenuStyles = { top: '100%', bottom: 'auto', visibility: 'hidden' };

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
  customControlProps: {
    [key: string]: any,
    onKeyDown?: (evt: SyntheticKeyboardEvent<HTMLInputElement>) => void,
    onClick?: (evt: SyntheticEvent<HTMLButtonElement>) => void,
    onBlur?: (evt: SyntheticEvent<HTMLButtonElement>) => void,
  },

  // Menu / Item
  customItem: (props: any) => Node,
  menuClassName: ClassName,
  itemsWrapperClassName: ClassName,
  customItemProps: {
    [key: string]: any,
    onKeyDown?: (evt: SyntheticKeyboardEvent<HTMLInputElement>, item: Item, idx: number) => void,
    onClick?: (evt: SyntheticEvent<HTMLButtonElement>, item: Item, idx: number) => void,
  },
  onSelect: (evt: SyntheticEvent<HTMLButtonElement>, item: Item, idx: number) => void,
  onClose: () => void,
  onOpen: () => void,

  // Other
  isOpened: boolean,
  closeOnSelect: boolean,
  openOnFocus: boolean,
  closeOnControlClick: boolean,
  customNoResults: Node,
  getLabel: Item => string,
  getValue: Item => string,
  footer?: (props: any) => Node,
  header?: (props: any) => Node,
};

type State = {
  open: boolean,
  menuStyles: any,
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

    // Menu / Item
    customItem: ({ item, getLabel, ...props }) => (
      <DropdownItem item={item} {...props}>
        {getLabel(item)}
      </DropdownItem>
    ),
    menuClassName: '',
    itemsWrapperClassName: '',
    customItemProps: {},
    onSelect: () => {},
    onClose: () => {},
    onOpen: () => {},

    // Other
    isOpened: null,
    closeOnSelect: true,
    openOnFocus: false,
    closeOnControlClick: true,
    customNoResults: <div>Nothing found</div>,
    getLabel: x => x && x.name,
    getValue: x => x && x._id,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      open: props.isOpened || props.defaultOpen,
      menuStyles: defaultMenuStyles,
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

  componentWillReceiveProps(nextProps: Props): * {
    this.toggleMenu(nextProps.isOpened)
  }

  getSelectedValue(): Item {
    const { value, options, getValue } = this.props;
    return (value && options.find(x => getValue(x) === value)) || null;
  }

  getItemsElements(): NodeList<HTMLElement> | [] {
    return (this.menuRef.current && this.menuRef.current.querySelectorAll('.cub-dropdown-item')) || [];
  }

  getControlElement(): HTMLElement | null {
    return this.dropdownRef.current && this.dropdownRef.current.querySelector('.cub-dropdown-control');
  }

  makeFocusOnControl(): void {
    const $control = this.getControlElement();
    if ($control) $control.focus();
  }

  setMenuPositions() {
    const $control = this.getControlElement();
    const $menu = this.menuRef.current;
    if ($control && $menu) {
      const { top, height } = $menu.getBoundingClientRect();
      const { innerHeight } = window;
      const menuStyles = {
        top: top + height > innerHeight ? 'auto' : '100%',
        bottom: top + height > innerHeight ? '100%' : 'auto',
        visibility: 'visible',
      };
      this.setState({ menuStyles });
    }
  }

  handleControlClick(evt: SyntheticEvent<HTMLButtonElement>): void {
    const { open } = this.state;
    const { closeOnControlClick, customControlProps, openOnFocus } = this.props;
    if (!open) this.toggleMenu(true);
    if (open && closeOnControlClick && !openOnFocus) this.toggleMenu(false);
    if (customControlProps.onClick) customControlProps.onClick(evt);
  }

  handleControlFocus(evt: SyntheticEvent<HTMLInputElement>): void {
    const { openOnFocus, customControlProps } = this.props;
    if (openOnFocus) this.toggleMenu(true);
    if (customControlProps.onFocus) customControlProps.onFocus(evt);
  }

  handleControlBlur(evt: SyntheticEvent<HTMLInputElement>): void {
    const { customControlProps } = this.props;
    if (customControlProps.onBlur) customControlProps.onBlur(evt);
  }

  handleControlKeyDown(evt: SyntheticKeyboardEvent<HTMLInputElement>): void {
    const { open } = this.state;
    const { customControlProps } = this.props;
    const key = keyboardKey.getCode(evt);
    const $items = this.getItemsElements();
    // $FlowFixMe
    const $firstItem = $items[0];

    if (key === keyboardKey.Tab) this.toggleMenu(false);

    // Close dropdown and focusing input
    if (key === keyboardKey.Escape) {
      this.toggleMenu(false);
      if (open) this.makeFocusOnControl();
    } else if (!open && key !== keyboardKey.Tab) {
      // Open dropdown on press any key
      this.toggleMenu(true);
    }

    // Close dropdown and select first item
    if (key === keyboardKey.Enter && open && $firstItem) {
      evt.preventDefault();
      const customEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
      $firstItem.dispatchEvent(customEvent);
      if(this.props.closeOnSelect) this.toggleMenu(false);
    }

    // Focus first/last item
    if ([keyboardKey.ArrowDown, keyboardKey.ArrowUp].includes(key) && open) {
      evt.preventDefault();
      const idx = key === keyboardKey.ArrowDown ? 0 : $items.length - 1;
      // $FlowFixMe
      if (idx >= 0 && $items[idx]) $items[idx].focus();
    }

    if (customControlProps.onKeyDown) customControlProps.onKeyDown(evt);
  }

  handleItemKeyDown(evt: SyntheticKeyboardEvent<HTMLButtonElement>, item: Item, idx: number): void {
    const { target } = evt;
    const { customItemProps, onSelect } = this.props;
    const key = keyboardKey.getCode(evt);

    if (key === keyboardKey.Tab) this.toggleMenu(false);

    // Close dropdown and focus control
    if (key === keyboardKey.Escape) {
      this.toggleMenu(false);
      if (!this.props.openOnFocus) this.makeFocusOnControl();
    }

    // Select item
    if (key === keyboardKey.Enter && item !== null) {
      evt.preventDefault();
      onSelect(evt, item, idx);
      if(this.props.closeOnSelect) this.toggleMenu(false);
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

    if (customItemProps.onKeyDown) customItemProps.onKeyDown(evt, item, idx);
  }

  handleItemClick(evt: SyntheticEvent<HTMLButtonElement>, item: Item, idx: number): void {
    const { onSelect, closeOnSelect, openOnFocus, customItemProps } = this.props;
    onSelect(evt, item, idx);
    if (closeOnSelect) this.toggleMenu(false);
    if (!openOnFocus) this.makeFocusOnControl();
    if (customItemProps.onClick) customItemProps.onClick(evt, item, idx);
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
    if (open) {
      this.props.onOpen();
      setTimeout(this.setMenuPositions.bind(this));
    } else {
      this.props.onClose();
      this.setState({ menuStyles: defaultMenuStyles });
    }
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
    const defaultProps = { placeholder: 'Select' };
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
          onFocus: e => this.handleControlFocus(e),
          onBlur: e => this.handleControlBlur(e),
        })}
        {customControlArrow && React.createElement(customControlArrow, { open })}
      </div>
    );
  }

  renderOption(item: Item, idx: number) {
    const { getValue, getLabel, customItem, customItemProps } = this.props;
    const itemCn = classNames('cub-dropdown-item', customItemProps.className || '');
    return React.createElement(customItem, {
      item,
      ...customItemProps,
      key: getValue(item),
      selected: this.getSelectedValue(),
      className: itemCn,
      'data-label': getLabel(item),
      'data-value': getValue(item),
      getLabel,
      onClick: e => this.handleItemClick(e, item, idx),
      onKeyDown: e => this.handleItemKeyDown(e, item, idx),
    });
  }

  renderElement(element?: (props: any) => Node): Node {
    if (!element) return false;
    return React.createElement(element, {
      // Close menu from header/footer
      handleClose: () => {
        this.toggleMenu(false);
        if (!this.props.openOnFocus) this.makeFocusOnControl();
      },
      // DropdownItem keyboard navigation
      handleItemKeyDown: evt => this.handleItemKeyDown(evt, null, -1),
    });
  }

  renderMenu(): Node {
    const { options, header, footer, customNoResults, menuClassName, itemsWrapperClassName } = this.props;
    const { open, menuStyles } = this.state;

    const menuCn = classNames('cub-dropdown-menu', { '-open': open, '-empty': !options.length }, menuClassName);
    const itemsCn = classNames('cub-dropdown-items', itemsWrapperClassName);

    return (
      <div className={menuCn} ref={this.menuRef} style={menuStyles}>
        {options.length <= 0 && customNoResults}
        <div className="cub-dropdown-menu-inner">
          {this.renderElement(header)}
          {options.length > 0 && <div className={itemsCn}>{options.map(this.renderOption.bind(this))}</div>}
          {this.renderElement(footer)}
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
