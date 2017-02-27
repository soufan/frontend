/**
 * Created by sury on 2017/2/7.
 */
import * as es6 from 'components/ES6';
import ShoppingList from 'components/ShoppingList';

import React from 'react';
import ReactDOM from 'react-dom';

require("styles/common.scss");

document.write('Hello Webpack,'+es6.test());

let App = React.createClass({
    render() {
        return(
            <div>
            <h1>Hello, world!123</h1>
            <ShoppingList/>
            </div>
            );
    }
});


ReactDOM.render(<App/>, document.getElementById('example'));
ReactDOM.render(<ShoppingList/>, document.getElementById('shopList'));