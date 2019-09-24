// @flow
import React, { Component, createRef, type Node } from 'react';
import { SyntheticEvent } from 'react-dom';
import shallowEqual from 'shallowequal';
import classNames from 'classnames';
import { Item, Value, ClassName } from './types';
import DropdownItem from './DropdownItem';

import './Dropdown.css';

type Props = {
  options: Array<Item>,
  defaultValue: Value,
  disabled: boolean,
  defaultOpen: boolean,
  closeOnSelect: boolean,
  noResultsMessage: string,
  controlClassName: ClassName,
  controlWrapperClassName: ClassName,
  menuClassName: ClassName,
  itemsWrapperClassName: ClassName,
  itemClassName: ClassName,
  onControlClick: (evt: SyntheticEvent<HTMLButtonElement>) => void,
  onItemClick: (evt: SyntheticEvent<HTMLButtonElement>, item: Item) => void,
  customControl: (props: any) => Node,
  renderItem: (item: Item, selected: Item) => (props: any) => Node,
};

type State = {
  open: boolean,
  value: Value,
};

class Dropdown extends Component<Props, State> {
  static defaultProps: Props = {
    options: [],
    defaultValue: '',
    disabled: false,
    defaultOpen: false,
    closeOnSelect: true,
    noResultsMessage: 'No results found.',
    controlClassName: '',
    controlWrapperClassName: '',
    menuClassName: '',
    itemsWrapperClassName: '',
    itemClassName: '',
    onControlClick: () => {},
    onItemClick: () => {},
    customControl: ({ selected, ...props }) => (
      <input type="text" defaultValue={(selected && selected.name) || ''} {...props} />
    ),
    renderItem: item => props => (
      <DropdownItem item={item} {...props}>
        {item.name}
      </DropdownItem>
    ),
  };

  state: State = {
    open: this.props.defaultOpen,
    value: this.props.defaultValue,
  };

  dropdownRef: { current: null | HTMLDivElement } = createRef();

  handleOutsideClick = this.outsideClick.bind(this);

  componentWillUnmount() {
    this.toggleMenu(false);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return !shallowEqual(nextProps, this.props) || !shallowEqual(nextState, this.state);
  }

  getSelectedValue(): Item {
    const { value } = this.state;
    return (value && this.props.options.find(x => x._id === value)) || null;
  }

  handleControlClick(evt: SyntheticEvent<HTMLButtonElement>): void {
    if (!this.state.open) this.toggleMenu(true);
    this.props.onControlClick(evt);
  }

  handleItemClick(evt: SyntheticEvent<HTMLButtonElement>, item: Item): void {
    this.setState({ value: item._id });
    this.props.onItemClick(evt, item);
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
  }

  renderControl() {
    const { customControl, defaultValue, disabled, controlClassName, controlWrapperClassName } = this.props;
    const controlWrapperCn = classNames('cub-dropdown-control-wrapper', controlWrapperClassName);
    const controlCn = classNames('cub-dropdown-control', controlClassName);
    return (
      <div className={controlWrapperCn}>
        {React.createElement(customControl, {
          defaultValue,
          disabled,
          selected: this.getSelectedValue(),
          className: controlCn,
          onClick: e => this.handleControlClick(e)
        })}
      </div>
    );
  }

  renderOption(item: Item) {
    const { renderItem, itemClassName } = this.props;
    const itemCn = classNames('cub-dropdown-item', itemClassName);
    const Option = renderItem(item);
    return <Option key={item._id} className={itemCn} onClick={e => this.handleItemClick(e, item)} />;
  }

  renderMenu(): Node {
    const { options, noResultsMessage, menuClassName, itemsWrapperClassName } = this.props;
    const { open } = this.state;

    const menuCn = classNames('cub-dropdown-menu', { '-open': open }, menuClassName);
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

  render() {
    const { open } = this.state;

    return (
      <div className="cub-dropdown" ref={this.dropdownRef}>
        {this.renderControl()}
        {open && this.renderMenu()}
      </div>
    );
  }
}

export default Dropdown;
