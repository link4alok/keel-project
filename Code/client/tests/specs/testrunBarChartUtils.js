require(
	[
	'jquery',
	'app/domain/Repository',
	'../js/app/framework/barChartUtils.js'
	],
	function ($, Repository, barChartUtils) {
		describe('Bar Chart Utilities', function () {
      it('should add chart to the DOMNode', function () {
		    // Arrange
		    var dN = $('<div>');
    		// Assert

    		assert.equal(dN.html(), '');

    		// Act 

    		barChartUtils.draw(dN[0]);

		    // Assert
		    assert.isTrue(dN.find('svg').attr('class')=='barChartSVG');
      }); 
      it('should add order', function () {
  		    // Arrange
  		    var order = {
  		    	"id": 101,
  		    	"quantity": 685,
  		    	"quantityPlaced": 0,
  		    	"quantityExecuted": 0,
  		    },
  		    dN,
  		    iCount,
  		    fCount,
  		    iSize,
  		    fSize;

  		    // Act 

  		    dN = $('<div>');

  		    barChartUtils.draw(dN[0]);

  		    iCount = barChartUtils.orderCount();
  		    iSize = Object.keys(barChartUtils.o).length;
  		    barChartUtils.addRow(order);

  		    fCount = barChartUtils.orderCount();
  		    fSize = Object.keys(barChartUtils.o).length;

  		    // Assert
  		    assert.equal(iCount+1, fCount);
        }); 
      it('should update order', function () {
  		    // Arrange
  		    var order = {
  		    	"id": 101,
  		    	"quantity": 685,
  		    	"quantityPlaced": 0,
  		    	"quantityExecuted": 0,
  		    },
  		    newOrder = {
  		    	"id": 101,
  		    	"quantity": 685,
  		    	"quantityPlaced": 200,
  		    	"quantityExecuted": 100,
  		    },
  		    dN = $('<div>'),
  		    iPWidth,
  		    fPWidth,
  		    iEWidth,
  		    fEWidth;

  		    // Act 

  		    barChartUtils.draw(dN[0]);
  		    barChartUtils.addRow(order);

  		    iPWidth = barChartUtils.p[order.id].attr('width');
  		    iEWidth = barChartUtils.e[newOrder.id].attr('width');

  		    barChartUtils.updateRow(newOrder);

  		    fPWidth = barChartUtils.p[order.id].attr('width');
  		    fEWidth = barChartUtils.e[newOrder.id].attr('width');

  		    // Assert
  		    assert.isTrue(iPWidth<fPWidth);
  		    assert.isTrue(iEWidth<fEWidth);
        }); 
      it('should give correct order count', function() {
				    // Arrange
				    var order = {
				    	"id": 101,
				    	"quantity": 685,
				    	"quantityPlaced": 0,
				    	"quantityExecuted": 0,
				    }, 
				    dN = $('<div>'),
				    returnedCount, 
				    orderSize;

            // Act 

            barChartUtils.draw(dN[0]);
            barChartUtils.addRow(order);
            returnedCount = barChartUtils.orderCount();
            orderSize = Object.keys(barChartUtils.o).length;

				    // Assert

				    assert.equal(returnedCount, orderSize);
				    assert.equal(orderSize, 1);
          });
    });

mocha.run().globals(['jquery']);
});
