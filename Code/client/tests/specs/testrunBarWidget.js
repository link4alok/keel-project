require(
	[
	'backbone',
	'app/domain/Repository',
	'app/widgets/chart/BarWidget'
	],
	function (Backbone, Repository, BarWidget) {
		describe('Bar Widget', function() {
			it('should call updateOrder when the model(order) is updated by the server', function(){
			    // Arrange
									
				var testModel = new (Backbone.Model.extend({
					url: '/rest/orders',
					defaults: {
						id: 101,
						quantityExecuted: 0,
						quantityPlaced: 20,
						quantity:100
					}
				}));
				
				var	bWInstance = new BarWidget({model: testModel});
				var updateOrderSpy = sinon.spy(bWInstance, 'updateOrder');
				
			    // Act 
				
				bWInstance.initialize();
				testModel.set('quantityExecuted', 10);
				testModel.trigger('change');
				
			    // Assert
				
				assert.isTrue(updateOrderSpy.called);
			});
		});
/*

		mocha.run().globals(['jquery']);*/
});
