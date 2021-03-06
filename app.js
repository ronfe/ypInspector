/**
 * Created by ronfe on 15-5-12.
 */

var express = require('express');
var request = require('request');
var station = require(__dirname + '/chinarail/station');
var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var jade = require('jade');
var json = require('JSON');
var app = new express();
app.set('views', './public');
app.set('view engine', 'jade');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.get('/', function(req, res){
    res.render('home', {
        title: 'hello',
        message: 'Hello world!'
    });
});

app.get('/info/:date/:from/:to', function(req, res){
    var date = req.params.date;
    var fromS = req.params.from;
    var toS = req.params.to;
    var fromSCode = station.getStationCode(fromS);
    var toSCode = station.getStationCode(toS);
    var options = {
        url: 'http://kyfw.12306.cn/otn/lcxxcx/query?purpose_codes=ADULT&queryDate=' + date + '&from_station=' + fromSCode + '&to_station=' + toSCode
    };
    console.log(options.url);
    res.status(200).send(options.url);
    //request(options, function (error, response, body) {
    //    if (!error && response.statusCode == 200) {
    //        var newTrainInfo = [];
    //        var jsonTrainInfo = json.parse(body);
    //        _.each(jsonTrainInfo.data.datas, function(item){
    //            var filterTrainInfo = _.pick(item, [
    //                'station_train_code',
    //                'start_station_telecode',
    //                'start_station_name',
    //                'end_station_telecode',
    //                'end_station_name',
    //                'from_station_telecode',
    //                'from_station_name',
    //                'to_station_telecode',
    //                'to_station_name',
    //                'start_time',
    //                'arrive_time',
    //                'lishi',
    //                'sale_time',
    //                'gg_num',
    //                'gr_num',
    //                'qt_num',
    //                'rw_num',
    //                'rz_num',
    //                'tz_num',
    //                'wz_num',
    //                'yb_num',
    //                'yw_num',
    //                'yz_num',
    //                'ze_num',
    //                'zy_num',
    //                'swz_num'
    //            ]);
    //            newTrainInfo.push(filterTrainInfo);
    //        });
    //        res.status(200).send(newTrainInfo);
    //    }
    //});
});

app.listen(2413);
console.log('app is listening on 2413');