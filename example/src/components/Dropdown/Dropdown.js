import React from 'react';
import { Dropdown } from 'cuberto-react-components';

const options = [
    { name: 'First' },
    { name: 'Second' },
];

export default () => (
    <>
        <section className="hero">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">Dropdown</h1>
                </div>
            </div>
        </section>

        <section className="section">
            <div className="container">
                <Dropdown options={options} />
            </div>
        </section>
    </>
);