/* * app/framework/Services
  * @author Ravi Tripathi
  */

define(function() {
        'use strict';
        var Services = function () {
            var url='http://localhost:8080/rest/orders',
                result = { status : false, data : '' };
            return {
                makeRequest : function(method, data, callback) {
                    $.ajax({
                        type: method,
                        url: url,
                        dataType : 'json',
                        contentType : 'application/json',
                        data : data,
                        error : function (data) {
                            result.status = false;
                            result.data = data;
                        },
                        success : function (data) {
                            result.status = true;
                            result.data = data;
                            callback(result);
                        }
                    });
                },
                makeDeleteRequest : function(method, callback) {
                    $.ajax({
                        type: method,
                        url: url,
                        dataType : 'json',
                        contentType : 'application/json',
                        error : function (data) {
                            result.status = false;
                            result.data = data;
                        },
                        success : function (data) {
                            result.status = true;
                            result.data = data;
                            callback(result);
                        }
                    });
                }
            };
        };
        return Services;
    });
