/**
 * Created by ronfe on 15-5-12.
 */

var express = require('express');
var request = require('request');
var fs = require('fs');
var path = require('path');
var certFile = path.resolve(__dirname, 'srca.cer');
var app = new express();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.get('/', function(req, res){
    var options = {
        url: 'http://kyfw.12306.cn/otn/lcxxcx/query?purpose_codes=ADULT&queryDate=2015-05-13&from_station=BJP&to_station=HHC'
    };
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body); // Show the HTML for the Google homepage.
        }
    });
});

app.listen(2413);
console.log('app is listening on 2413');