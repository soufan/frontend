/**
 * Created by Sury on 2017/2/25.
 */
const content = require('./content.ejs');
const layout = require('layout');

console.log(layout.init({
    pageTitle: '',
}).run(content()));

module.exports = layout.init({
    pageTitle: '',
}).run(content());