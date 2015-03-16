'use strict';

import React from 'react';
import {RouteHandler} from 'react-router';
import {state} from './../src/ApplicationState';

export default React.createClass({
    componentWillMount() {
        state.on('change', () => {
            this.forceUpdate();
        });
    },
    render() {
        let styles = {
            main: {
                margin: '0 auto'
            }
        };
        return (
            <div>
                <main style={styles.main}>
                    <RouteHandler />
                </main>
            </div>
        );
    }
});