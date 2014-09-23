require(
	[
	'backbone',
	'app/domain/Repository',
	'app/widgets/chart/ChartWidget'
	],
	function (Backbone, Repository, ChartWidget) {
		describe('Chart Widget', function () {
				var repCol = Repository.getOrders();
				it('should call render when browser supports svg', function(){
				    // Arrange

					var	cWInstance = new ChartWidget({collection: repCol});
					var renderSpy = sinon.spy(cWInstance, 'render');

				    // Act 

					cWInstance.initialize();

					if (Modernizr.svg) {
					    // Assert
						assert.isTrue(renderSpy.called);
					}
					else {
					    // Assert
						assert.isTrue(true);
					}
				});
				it('should call Add Order n times (corresponding to n orders in the Repository)', function(){
				    // Arrange
					var	cWInstance = new ChartWidget({collection: repCol});
					var addOrderSpy = sinon.spy(cWInstance, 'addOrder');

				    // Act 
					cWInstance.render();

				    // Assert
					assert.equal(repCol.models.length, addOrderSpy.callCount)
				});
				it('should be hidden when the hide method is called', function () {
				    // Arrange
					var	cWInstance = new ChartWidget({collection: repCol});

				    // Act 
					cWInstance.hide();

				    // Assert
					assert.equal('none', cWInstance.$el.css('display'));
				});
				it('should be shown when the show method is called', function () {
				    // Arrange
					var	cWInstance = new ChartWidget({collection: repCol});

				    // Act 
					cWInstance.show();

				    // Assert
					assert.notEqual('none', cWInstance.$el.css('display'));
				});
			});
});
