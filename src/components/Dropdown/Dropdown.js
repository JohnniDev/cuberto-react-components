// @flow
import React, { Component, createRef, type Node } from 'react';
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
  customControlProps: { [key: string]: any, onKeyDown?: (evt: any) => {}, onClick?: (evt: any) => {} },
  onControlClick: (evt: SyntheticEvent<HTMLButtonElement>) => void,
  onControlKeyDown: (evt: SyntheticKeyboardEvent<HTMLInputElement>) => void,

  // Menu / Item
  customItem: (props: any) => Node,
  menuClassName: ClassName,
  itemsWrapperClassName: ClassName,
  customItemProps: { [key: string]: any, onKeyDown?: (evt: any) => {}, onClick?: (evt: any, item: Item) => {} },
  onSelect: Item => void,
  onClose: () => void,

  // Other
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
    customItemProps: {},
    onSelect: () => {},
    onClose: () => {},

    // Other
    closeOnSelect: true,
    openOnFocus: false,
    closeOnControlClick: true,
    customNoResults: <div>Nothing found</div>,
    getLabel: x => x.name,
    getValue: x => x._id,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      open: props.defaultOpen,
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
    if (!open) this.toggleMenu(true);
    if (open && this.props.closeOnControlClick) this.toggleMenu(false);
    this.props.onControlClick(evt);
  }

  handleControlKeyDown(evt: SyntheticKeyboardEvent<HTMLInputElement>): void {
    const { open } = this.state;
    const key = keyboardKey.getCode(evt);
    const $items = this.getItemsElements();
    // $FlowFixMe
    const $firstItem = $items[0];

    // Close dropdown and focusing input
    if (key === keyboardKey.Escape) {
      this.toggleMenu(false);
      if (open) this.makeFocusOnControl();
    } else if (!open) {
      // Open dropdown on press any key
      this.toggleMenu(true);
    }

    // Close dropdown and select first item
    if (key === keyboardKey.Enter && open && $firstItem) {
      evt.preventDefault();
      $firstItem.focus();
      $firstItem.click();
      this.toggleMenu(false);
    }

    // Focus first/last item
    if ([keyboardKey.ArrowDown, keyboardKey.ArrowUp].includes(key) && open) {
      evt.preventDefault();
      const idx = key === keyboardKey.ArrowDown ? 0 : $items.length - 1;
      // $FlowFixMe
      if (idx >= 0 && $items[idx]) $items[idx].focus();
    }

    if (this.props.customControlProps.onKeyDown) {
      this.props.customControlProps.onKeyDown(evt);
    }
  }

  handleControlFocus(evt: SyntheticEvent<HTMLInputElement>): void {
    const { openOnFocus, customControlProps } = this.props;
    if (openOnFocus) this.toggleMenu(true);
    if (customControlProps.onFocus) {
      customControlProps.onFocus(evt);
    }
  }

  handleItemKeyDown(evt: SyntheticKeyboardEvent<HTMLButtonElement>): void {
    const { target } = evt;
    const key = keyboardKey.getCode(evt);

    // Close dropdown and focus control
    if (key === keyboardKey.Escape) {
      this.toggleMenu(false);
      this.makeFocusOnControl();
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

    if (this.props.customItemProps.onKeyDown) {
      this.props.customItemProps.onKeyDown(evt);
    }
  }

  handleItemClick(evt: SyntheticEvent<HTMLButtonElement>, item: Item): void {
    this.props.onSelect(item);
    if (this.props.closeOnSelect) this.toggleMenu(false);
    this.makeFocusOnControl();
    if (this.props.customItemProps.onClick) {
      this.props.customItemProps.onClick(evt, item);
    }
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
    if (open) setTimeout(this.setMenuPositions.bind(this));
    if (!open) {
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
          onFocus: e => this.handleControlFocus(e),
        })}
        {customControlArrow && React.createElement(customControlArrow, { open })}
      </div>
    );
  }

  renderOption(item: Item) {
    const { getValue, getLabel, customItem, customItemProps } = this.props;
    const itemCn = classNames('cub-dropdown-item', customItemProps.className || '');
    return React.createElement(customItem, {
      item,
      ...customItemProps,
      key: getValue(item),
      selected: this.getSelectedValue(),
      className: itemCn,
      getLabel,
      onClick: e => this.handleItemClick(e, item),
      onKeyDown: e => this.handleItemKeyDown(e),
    });
  }

  renderElement(element?: (props: any) => Node): Node {
    if (!element) return false;
    return React.createElement(element, {
      // Close menu from header/footer
      handleClose: () => {
        this.toggleMenu(false);
        this.makeFocusOnControl();
      },
      // DropdownItem keyboard navigation
      handleItemKeyDown: evt => this.handleItemKeyDown(evt),
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
