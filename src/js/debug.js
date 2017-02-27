/**
 * Created by Sury on 2017/2/24.
 */
const glob = require('glob');
function test() {
    var files = glob.sync('./*.js');
    var newEntries = {};

    files.forEach(function(f){
        console.log(f);
    });
    console.log(newEntries);
}
console.log("hello world.");
test();
