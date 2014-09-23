var define = define;
define(
    [
        'app/domain/Repository',
        'backbone',
        'keel/BaseView',
        'text!app/widgets/table/RowTemplate.html'
    ],
    function (Repository, Backbone, BaseView, RowTemplate) {
        'use strict';

        return BaseView.extend({
            tagName: 'tr',

            elements: ['orderTable'],

            template: {
                name: 'RowTemplate',
                source: RowTemplate
            },

            initialize : function () {
                this.listenTo(this.model, 'change', this.render);
            },

            formatTime : function (creationTime) {
                var date = '',
                    time = '',
                    timeOfDay = 'AM';

                date = ((creationTime).split('T'))[0];
                date = date.split('-')[1] + '/' + date.split('-')[2] + '/' + date.split('-')[0];

                time = ((((creationTime).split('T'))[1]).split('.'))[0];

                timeOfDay = this.findTimeOfDay(parseInt(time.split(':')[0], 10));
                creationTime = date + ' ' + time + ' ' + timeOfDay;
                return creationTime;
            },

            findTimeOfDay : function (hour) {
                if(hour > 11) {
                    return 'PM';
                }
                else {
                    return 'AM';
                }
            },

            render: function () {
                var template = this.getTemplate(),
                    newTime = '',
                    newModeltoJSON = {};

                // Destroy existing children
                this.destroyChildren();
                newTime = this.formatTime(this.model.toJSON().creationTime);
                delete this.model.toJSON().creationTime;
                newModeltoJSON = this.model.toJSON();
                newModeltoJSON.creationTime = newTime;
                newModeltoJSON.limitPrice = '$' + newModeltoJSON.limitPrice;
                this.$el.html(template(newModeltoJSON));
                this._setupElements();

                return this;
            }
        });
    }
);