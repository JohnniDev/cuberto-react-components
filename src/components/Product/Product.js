import React, {Component} from 'react';

class Product extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        toDoList: [],
    };

    render() {

        let listToDos = this.state.toDoList.map((toDo) =>
            <div>
                <li>{toDo.id}</li>
            </div>
        );

        return (
            <div>
                <ul>{listToDos}</ul>
            </div>
        );
    }
}

export default Product;