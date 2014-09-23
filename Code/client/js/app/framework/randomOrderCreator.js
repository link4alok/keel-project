define(['jquery'], function($) {
	'use strict';
	var randObj = {
		_side: ['Buy', 'Sell'],
		_quantity: [1, 1000],
		_limitPrice: [1, 500],
		_symbolList: []
	};

	$.getJSON('http://localhost:8080/rest/instruments').done(function(data) {
		window.testdata = data;
		for (var i = 0; i < data.length; i++) {
			randObj._symbolList.push(data[i].symbol);
		}
	});

	function randomOrderCreator () {
		var randomSide = randObj._side[Math.floor(Math.random()*2)];
		var randomSymbol = randObj._symbolList[Math.floor(Math.random()*randObj._symbolList.length)];
		var randomQuantity = Math.ceil(Math.random()*(randObj._quantity[1]-randObj._quantity[0]));
		var randomPrice = Math.ceil(Math.random()*(randObj._limitPrice[1]-randObj._limitPrice[0]));
		var user = sessionStorage.getItem('userInform');
		var toReturn = JSON.stringify({
			side : randomSide,
			symbol : randomSymbol,
			quantity : randomQuantity,
			limitPrice : randomPrice,
			traderId: user
		});
		return toReturn;
	}
	return randomOrderCreator;
});
