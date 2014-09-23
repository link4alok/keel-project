require(
    [
    'jquery',
    'backbone',
    'app/domain/Repository',
    'app/widgets/table/TableWidget',
    'app/widgets/table/RowWidget'
    ],
    function ($, Backbone, Repository, TableWidget, RowWidget) {
     
        describe('Row Widget', function () {

            it('should test', function () {
                assert.isTrue(true);
            });

            it('should generate a new row when an order is added to the collection', function () {
                var collec = Repository.getOrders(),
                    row = {},
                    order = {
                        "id": 101,
                        "creationTime": "2013-01-01T10:15:35.380Z",
                        "side": "Sell",
                        "symbol": "DIS",
                        "quantity": 10000,
                        "quantityPlaced": 10000,
                        "quantityExecuted": 10000,
                        "limitPrice": 44.25,
                        "priority": 50,
                        "status": "Executed",
                        "traderId": "AM"
                    };
                collec.add(order);
                row = new RowWidget({model : (collec.models[0])});
                assert.equal(collec.length !== 0, row.render().$el.find('td.column1').html() !== '', 'Error');
            });
        });
});