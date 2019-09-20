import React, {Component} from 'react';

class Dropdown extends Component {
    constructor(props) {
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