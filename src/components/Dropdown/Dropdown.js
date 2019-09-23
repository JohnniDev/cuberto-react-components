// @flow
/* eslint-disable react/no-array-index-key */
import React, { Component, createRef } from 'react';
import classNames from 'classnames';
import { Item, Value, ClassName } from './types';
import DropdownItem from './DropdownItem';

import './Dropdown.css';

type Props = {
  options: Array<Item>,
  defaultValue: Value,
  disabled: boolean,
  open: boolean,
  closeOnSelect: boolean,
  noResultsMessage: string,
  controlClassName: ClassName,
  controlWrapperClassName: ClassName,
  menuClassName: ClassName,
  itemsWrapperClassName: ClassName,
  itemClassName: ClassName,
  onControlClick: () => void,
  onItemClick: () => void,
  renderControl: (
    {
      defaultValue: Value,
      disabled: boolean,
      controlClassName: ClassName,
      controlWrapperClassName: ClassName,
    },
    handleClick: () => void,
  ) => React.Node,
  renderItem: (item: Item, { itemClassName: ClassName }, handleClick: () => void) => React.Node | string,
};

type State = {
  open: boolean,
};

class Dropdown extends Component<Props, State> {
  static defaultProps: Props = {
    options: [],
    defaultValue: '',
    disabled: false,
    open: false,
    closeOnSelect: true,
    noResultsMessage: 'No results found.',
    controlClassName: '',
    controlWrapperClassName: '',
    menuClassName: '',
    itemsWrapperClassName: '',
    itemClassName: '',
    onControlClick: () => {},
    onItemClick: () => {},
    renderControl: ({ defaultValue, disabled, controlClassName, controlWrapperClassName }, handleClick) => {
      const controlWrapperCn = classNames('cub-dropdown-control-wrapper', controlWrapperClassName);
      const controlCn = classNames('cub-dropdown-control', controlClassName);
      return (
        <div className={controlWrapperCn}>
          <input
            type="text"
            defaultValue={defaultValue}
            disabled={disabled}
            className={controlCn}
            onClick={handleClick}
          />
        </div>
      );
    },
    renderItem: (item, { itemClassName }, handleClick) => {
      const cn = classNames('cub-dropdown-item', itemClassName);
      return (
        <DropdownItem key={item._id} item={item} className={cn} onClick={handleClick}>
          {item.name}
        </DropdownItem>
      );
    },
  };

  state: State = {
    open: this.props.open,
  };

  dropdownRef: React.Ref = createRef();

  handleOutsideClick = this.outsideClick.bind(this);

  handleControlClick(evt: MouseEvent): void {
    if (!this.state.open) this.toggleMenu(true);
    this.props.onControlClick(evt);
  }

  handleItemClick(evt: MouseEvent): void {
    if (this.props.closeOnSelect) this.toggleMenu(false);
    this.props.onItemClick(evt);
  }

  outsideClick(evt: MouseEvent): void {
    if (this.dropdownRef.current && this.dropdownRef.current.contains(evt.target)) return;
    this.toggleMenu(false);
  }

  toggleMenu(open: boolean): void {
    this.setState({ open });
    const action = open ? 'addEventListener' : 'removeEventListener';
    // $FlowFixMe
    document[action]('click', this.handleOutsideClick, false);
  }

  renderMenu(): React.Node {
    const { options, renderItem, noResultsMessage, menuClassName, itemsWrapperClassName, itemClassName } = this.props;
    const { open } = this.state;

    const menuCn = classNames('cub-dropdown-menu', { '-open': open }, menuClassName);
    const itemsCn = classNames('cub-dropdown-items', itemsWrapperClassName);

    if (!options.length) return <div className={menuCn}>{noResultsMessage}</div>;
    return (
      <div className={menuCn}>
        <div className="cub-dropdown-menu-inner">
          <div className={itemsCn}>
            {options.map(option => renderItem(option, { itemClassName }, this.handleItemClick.bind(this)))}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { renderControl, defaultValue, disabled, controlClassName, controlWrapperClassName } = this.props;

    return (
      <div className="cub-dropdown" ref={this.dropdownRef}>
        {renderControl(
          { defaultValue, disabled, controlClassName, controlWrapperClassName },
          this.handleControlClick.bind(this),
        )}
        {this.renderMenu()}
      </div>
    );
  }
}

export default Dropdown;
