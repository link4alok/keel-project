define(
    [
        'app/domain/Repository',
        'backbone',
        'keel/BaseView',
        'text!app/widgets/ToolBar/ToolbarTemplate.html',
        'app/framework/Services',
        'app/framework/Message',
        'keel/MessageBus'
    ],
    function (Repository, Backbone, BaseView, ToolbarTemplate, Services, Message, MessageBus) {
        'use strict';
        var services = new Services();
        return BaseView.extend({
            tagName: 'div',
            id : 'toolBar',

            template: {
                name: 'ToolbarTemplate',
                source: ToolbarTemplate
            },
            events: {
                'click #deleteButton': 'deleteTrade',
                'click #refreshButton': 'refreshTrade',
                'click #tableIcon': 'toggleTableIcon',
                'click #chartIcon': 'toggleChartIcon'
            },
            deleteTrade: function() {
                    services.makeDeleteRequest('DELETE', function () {
                    });
                },
            refreshTrade: function() {
                    Repository.fetchOrders();
                },
            toggleTableIcon: function(){
                if ($('#tableIcon').hasClass('active')) {
                    return;
                }
                $('#tableIcon, #chartIcon').toggleClass('active');
                MessageBus.trigger(Message.tableActive);
            },
            toggleChartIcon: function(){
                if ($('#chartIcon').hasClass('active')) {
                    return;
                }
                $('#chartIcon, #tableIcon').toggleClass('active');
                MessageBus.trigger(Message.chartActive);
            }
        });
    }
);