require(
	[
	  'app/domain/Repository',
	  '../js/app/framework/randomOrderCreator'
	],
	function (Repository, randomOrderCreator) {
		var randomOrder = JSON.parse(randomOrderCreator());	
		describe('Random order creator test cases', function () {
			it('randomOrderCreator should return quantity between 1-100', function () {
				var quantity = randomOrder.quantity;
                expect(quantity).to.be.above(1);
                expect(quantity).to.be.at.most(1000);
			});
			it('randomOrderCreator should return limitPrice between 1-500', function () {
				var limitPrice = randomOrder.limitPrice;
                expect(limitPrice).to.be.above(1);
                expect(limitPrice).to.be.at.most(500);
			});
			it('randomOrderCreator should return side value Buy or Sell', function () {
				var side = randomOrder.side;
                assert.isTrue(side === 'Buy' || side === 'Sell');
			});
			it('randomOrderCreator should return random symbol', function () {
				var symbol = randomOrder.symbol;
				var check = false;
				var instruments = Repository.getInstruments();
				instruments.each(function(instrument) {
					if (instrument.attributes.symbol == symbol) {
						check = true;
					}
				});
				assert.isTrue(check);
			});
		});
	});

	