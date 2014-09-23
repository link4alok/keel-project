var define = define;
define(
    [
        'app/domain/Repository',
        'backbone',
        'keel/BaseView',
        'text!app/widgets/table/TableTemplate.html',
        'app/widgets/table/RowWidget'
    ],
    function (Repository, Backbone, BaseView, TableTemplate, RowWidget) {
        'use strict';

        return BaseView.extend({
            tagName: 'div',

            elements: ['orderTable'],

            template: {
                name: 'TableTemplate',
                source: TableTemplate
            },

            initialize : function () {
                this.listenTo(this.collection, 'add', this.addRow);
                this.listenTo(this.collection, 'reset', this.render);
                this.collection.fetch({reset : true});
            },

            show : function () {
                this.$el.show();
            },

            hide : function () {
                this.$el.hide();
            },

            addRow : function (mod) {
                if(this.collection.length === 1) {
                    var template = this.getTemplate();
                    this.$el.html(template({}));
                    this.$el.find('.headerTableDiv').hide();
                    this.$el.find('.noOrder').hide();
                }
                var orderTableRow = new RowWidget({model: mod});
                this.$el.find('table').append(orderTableRow.render().$el);
            },

            render: function () {
                var template = this.getTemplate(),
                    context = this.collection.models,
                    i = 0;

                this.$el.html(template({}));
                if(this.collection.length) {
                    for(i = 0; i < context.length; i++) {
                        this.addRow(context[i]);
                    }

                    // Destroy existing children
                    this.destroyChildren();

                    this._setupElements();

                    this.$el.find('.headerTableDiv').hide();
                    this.$el.find('.noOrder').hide();
                }
                else {
                    this.$el.find('.js-orderTable').hide();
                    this.$el.find('.headerTableDiv').show();
                    this.$el.find('.noOrder').show();
                }
                return this;
            }
        });
    }
);