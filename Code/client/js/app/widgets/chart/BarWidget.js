/**
 * Copyright 2013 Archfirst
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * app/widgets/chart/ChartWidget
 *
 * @author Naresh Bhatia
 */
define(
    [
    'app/domain/Repository',
    'jquery',
    'backbone',
    'keel/BaseView',
    'text!app/widgets/chart/BarTemplate.html',
    'd3',
    'barChartUtils'
],
    function(Repository, $, Backbone, BaseView, BarTemplate, d3, barChartUtils) {
        'use strict';

        return BaseView.extend({
            tagName: 'section',

            elements: ['userSelector'],

            template: {
                name: 'BarTemplate',
                source: BarTemplate
            },
            initialize: function () {
                // Repository.fetchOrders();
                // this.render();
                this.listenTo(this.model, 'change', this.updateOrder);

            },

            show : function () {
                this.$el.show();
            },

            hide : function () {
                this.$el.hide();
            },

            render: function() {
                var template = this.getTemplate();

                // // Destroy existing children
                this.destroyChildren();


                this._setupElements();

                this.$el.html(template({}));
                barChartUtils.addRow(this.model.toJSON());

                return this;
            },

            updateOrder: function(order) {
                if(!order) {
                    order = this.model;
                }
                barChartUtils.updateRow(order.toJSON());
            }

        });
    }
);