require(
    [
    'jquery',
    'backbone',
    'app/domain/Repository',
    'app/widgets/table/TableWidget',
    'app/widgets/table/RowWidget'
    ],
    function ($, Backbone, Repository, TableWidget, RowWidget) {
     
      describe('Table Testing', function () {

        it('should test', function () {
            assert.isTrue(true);
        });

        it('should contain nothing when no orders are present in the collection', function () {
            var collec = Repository.getOrders(),
                table = new TableWidget({ collection : collec});
            // console.log(table.render().$el.find('td.column1').html());
            // console.log(collec.length);
            assert.equal(collec.length === 0, table.render().$el.find('td.column1').html() === undefined, 'Error');
        });

        it('should contain some rows when the collection has some orders', function () {
            var collec = Repository.getOrders(),
                table = new TableWidget({ collection : collec });
            assert.equal(collec.length !== 0, table.render().$el.find('td.column1').html() !== undefined, 'Error');
        });

        it ("should be able to reflect addition of a new order to the collection", function () {
            var collec = Repository.getOrders(),
                table = new TableWidget({ collection : collec }),
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
            expect(table.collection).to.have.length(collec.length);
        });

        it ("should be able to display the new order added to the collection", function () {
            var collec = Repository.getOrders(),
                table = new TableWidget({ collection : collec }),
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
                },
                newlyAddedID = 0,
                newlyAddedRowsFirstTD = '';
            collec.add(order);
            newlyAddedRowsFirstTD = table.render().$el.find('td.column1')[table.render().$el.find('td.column1').length - 1];
            // console.log(table.render().$el.find('td.column1').length);
            // console.log(newlyAddedRowsFirstTD);
            newlyAddedID = newlyAddedRowsFirstTD.innerText;
            // console.log('Yahan par ', newlyAddedID);
            // console.log(order.id);
            assert.isTrue(parseInt(newlyAddedID, 10) === order.id);
        });

        it('should be able to reflect deletion of all orders from the collection', function () {
            var collec = Repository.getOrders(),
                table = new TableWidget({ collection : collec });
            collec.reset();
            expect(table.collection).to.have.length(collec.length);
        });
    });
});