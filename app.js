/**
 * Created by ronfe on 15-5-12.
 */

var express = require('express');
var request = require('request');
var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var json = require('JSON');
var app = new express();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.get('/', function(req, res){
    var options = {
        url: 'http://kyfw.12306.cn/otn/lcxxcx/query?purpose_codes=ADULT&queryDate=2015-05-16&from_station=BJP&to_station=HHC'
    };
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var newTrainInfo = [];
            var jsonTrainInfo = json.parse(body);
            _.each(jsonTrainInfo.data.datas, function(item){
                var filterTrainInfo = _.pick(item, [
                    'station_train_code',
                    'start_station_telecode',
                    'start_station_name',
                    'end_station_telecode',
                    'end_station_name',
                    'from_station_telecode',
                    'from_station_name',
                    'to_station_telecode',
                    'to_station_name',
                    'start_time',
                    'arrive_time',
                    'lishi',
                    'sale_time',
                    'gg_num',
                    'gr_num',
                    'qt_num',
                    'rw_num',
                    'rz_num',
                    'tz_num',
                    'wz_num',
                    'yb_num',
                    'yw_num',
                    'yz_num',
                    'ze_num',
                    'zy_num',
                    'swz_num'
                ]);
                newTrainInfo.push(filterTrainInfo);
            });
            res.status(200).send(newTrainInfo);
        }
    });
});

app.listen(2413);
console.log('app is listening on 2413');