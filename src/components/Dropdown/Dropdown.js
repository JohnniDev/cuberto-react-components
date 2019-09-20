// @flow
import React, {Component} from 'react';

type Props = {
    options: Array<any>,
};

type State = {
    options: Array<any>,
};

class Dropdown extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            options: props.options || [],
        };
    }

    render() {
        const options = this.state.options.map((option, idx) =>
            <div key={idx}>
                <li>{option.name}</li>
            </div>
        );

        return (
            <div>
                <ul>{options}</ul>
            </div>
        );
    }
}

export default Dropdown;