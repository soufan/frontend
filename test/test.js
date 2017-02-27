/**
 * Created by Sury on 2017/2/27.
 */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
//var expect = require('chai').expect;

var options = {
    cwd: "./src", // views
    sync: true, // 这里不能异步，只能同步
};

var globInstance = new glob.Glob('views/**/page.js', options);

describe('Glob Test', function() {
    it('Test', function() {
        globInstance.found.forEach((page) => {
            var name = /views\/(.*\/page)\.js/.exec(page)[1];
            console.log(name,page);
        })
        //expect(2).to.be.equal(2);
    });
});


