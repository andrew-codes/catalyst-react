'use strict';

import React from 'react';
import {getArticles} from './../../src/api/articlesApi';

export default React.createClass({
    statics: {
        fetchData: (token, params, query) => {
            return getArticles(token);
        }
    },
    render() {
        //console.log(this.props.data.home.data);
        return (
            <div>
                <h1>Home</h1>
            </div>
        );
    }
});
