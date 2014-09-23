require(
    [
    'app/domain/Repository',
    'app/widgets/ToolBar/ToolbarWidget',
    'app/framework/Services',
    'app/pages/order-table/OrderTablePage'
    ],
    function (Repository, ToolbarWidget, Services, OrderTablePage) {
        describe('Tool Bar Button Tests', function () {
            var newTool = new ToolbarWidget();
            var newOrderTable =  new OrderTablePage();
            it('should pass the test',function(){
                assert.isTrue(true,"Passed")
            });
            it('delete function is called',function(){
                $(document.body).append($('<input type=button id=deleteButton class=btn></input>'));
                 var spy = sinon.spy(newTool,'deleteTrade');
                $('#deleteButton').on('click', newTool.deleteTrade);
                $('#deleteButton').trigger('click');
                assert.isTrue(spy.called);
                $('.btn').remove();
            });
            it('refresh function is called',function(){
                $(document.body).append($('<input type=button id=refreshButton class=btn></input>'));
                 var spy = sinon.spy(newTool,'refreshTrade');
                $('#refreshButton').on('click', newTool.refreshTrade);
                $('#refreshButton').trigger('click');
                assert.isTrue(spy.called);
                $('.btn').remove();
            });
            it('Trade function is called',function(){
                $(document.body).append($('<input type=button id=tradeButton class=btn></input>'));
                 var spy = sinon.spy(newOrderTable,'openTradePopUp');
                $('#tradeButton').on('click', newOrderTable.openTradePopUp);
                $('#tradeButton').trigger('click');
                assert.isTrue(spy.called);
                $('.btn').remove();
            });
        });
    });
