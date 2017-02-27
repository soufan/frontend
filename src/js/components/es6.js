/**
 * Created by sury on 2017/2/7.
 */
const full = ({ first, last }) => first + ' ' + last;

function log(x, y = 'World') {
    console.log(x, y);
}

function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    });
}

function loadImageAsync(url) {
    return new Promise(function(resolve, reject) {
        var image = new Image();

        image.onload = function() {
            resolve(image);
        };

        image.onerror = function() {
            reject(new Error('Could not load image at ' + url));
        };

        image.src = url;
    });
}

/*
var getJSON = function(url) {
    var promise = new Promise(function(resolve, reject){
        var client = new XMLHttpRequest();
        client.open("GET", url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();

        function handler() {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        };
    });

    return promise;
};
*/

function test(){
    let str = ((a,b)=>a+" "+b)("@hello","world@");

    timeout(1000*5).then((str) => {
        log(str,'test');
    });

   /* //一般来说，不要在then方法里面定义Reject状态的回调函数（即then的第二个参数），总是使用catch方法。
    //bad
    getJSON("/posts.json").then(function(json) {
        console.log('Contents : ' + JSON.stringify(json));
    }, function(error) {
        console.error('出错了', error);
    });
    //good
    getJSON("/posts11.json").then(function(json) {
        console.log('Contents : ' + JSON.stringify(json));
    }).catch(function (error) {
        // 处理 getJSON 和 前一个回调函数运行时发生的错误
        console.log('发生错误！', error);
    });*/

    return str + full({first:'a',last:'edf'});
}

export {test}