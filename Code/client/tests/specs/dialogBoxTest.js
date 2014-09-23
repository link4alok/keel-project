require(
	[
	  'app/domain/Repository',
	  '../js/app/widgets/createOrderDialogBox/createOrderDialogBox'
	],
	function (Repository, createOrderDialogBox) {
		var instanceDialogBox = new createOrderDialogBox();	
		describe('Dialog Box Test Cases', function () {
			var spy= sinon.spy(instanceDialogBox,'orderRequest');
			beforeEach(function(){
				$(document.body).append($('<input type=text id=noOfOrders value=20></input>'));
			});
			afterEach(function(){
				$('#noOfOrders').remove();
				spy.reset();
			});
			it('Dialog box input should validate after clicking create button', function () {
				var spy1= sinon.spy(instanceDialogBox,'createOrders');
			    instanceDialogBox.createOrders();
			    assert.isTrue(spy1.called);
			});
			it('Dialog box input should validate positive numbers', function () {
			    instanceDialogBox.createOrders();
			    assert.isTrue(spy.called);
			});
			it('Dialog box input should validate 0 orders', function () {
			    $('#noOfOrders').val(0);
			    instanceDialogBox.createOrders();
			    assert.isFalse(spy.called);			    
			});
			it('Dialog box input should validate negative numbers', function () {
				$('#noOfOrders').val(-10);
			    instanceDialogBox.createOrders();
			    assert.isFalse(spy.called);			    
			});
			it('Dialog box input should validate decimal values', function () {
				$('#noOfOrders').val(1.230);
			    instanceDialogBox.createOrders();
			    assert.isFalse(spy.called);			    
			});
			it('Dialog box input should validate null', function () {
				$('#noOfOrders').val('');
			    instanceDialogBox.createOrders();
			    assert.isFalse(spy.called);			    
			});
			it('Dialog box input should validate string', function () {
				$('#noOfOrders').val('This is String');
			    instanceDialogBox.createOrders();
			    assert.isFalse(spy.called);			    
			});
		});
	    mocha.run().globals(['jquery']);
		// mocha.run();
	});

	