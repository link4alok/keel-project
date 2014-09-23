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
    'text!app/widgets/chart/ChartTemplate.html',
    'text!app/widgets/chart/ChartLegend.html',
    'd3',
    'barChartUtils',
    'app/widgets/chart/BarWidget'
],
    function(Repository, $, Backbone, BaseView, ChartTemplate, ChartLegend, d3, barChartUtils, BarWidget) {
        'use strict';

        return BaseView.extend({
            tagName: 'section',

            elements: ['userSelector'],

            template: {
                name: 'ChartTemplate',
                source: ChartTemplate
            },
            initialize: function () {
                // if(navigator.appVersion.indexOf('MSIE 8') !== -1) {
                if(!Modernizr.svg || !Modernizr.inlinesvg) {
                // if(!Modernizr.svg || !Modernizr.inlinesvg || navigator.appVersion.indexOf('MSIE 8') !== -1) {
                    // window.alert('browser not supported');
                    this.$el.html(null);
                }
                else {
                    // console.log('!initialize else!');
                    Repository.fetchOrders();
                    this.render();
                    this.listenTo(this.collection, 'reset', this.render);
                    this.listenTo(this.collection, 'add', this.addOrder);
                }
            },

            show : function () {
                this.$el.show();
            },

            hide : function () {
                this.$el.hide();
            },

            render: function() {
                // if(navigator.appVersion.indexOf('MSIE 8') !== -1) {
                // if(!Modernizr.svg || !Modernizr.inlinesvg || navigator.appVersion.indexOf('MSIE 8') !== -1) {
                if(!Modernizr.svg || !Modernizr.inlinesvg) {
                    var errorMsg = 'This content cannot be viewed in your browser. Please upgrade to IE9 or above.';
                    this.$el.html(null).append($('<div>').attr('class', 'ieMessage').text(errorMsg));
                    return this;
                }
                var template = this.getTemplate();

                // // Destroy existing children
                this.destroyChildren();


                this._setupElements();

                this.$el.html(template({}));
                var chart = this.$el.find('#chartDiv');
                var msg = this.$el.find('#noOrderMessage');
                this.$el.append($(ChartLegend));
                var legends = this.$el.find('#chartLegends');
                var _myOrders = Repository.getOrders();

                if (_myOrders.length === 0) {
                    chart.hide();
                    legends.hide();
                    // msg.show();
                }
                else {
                    legends.show();
                    msg.hide();
                    var node = chart[0];
                    barChartUtils.draw(node);
                    for (var i = 0; i < _myOrders.models.length; i++) {
                        this.addOrder(_myOrders.models[i]);
                    }

                }
                // console.log('!fetched!');
                // Repository.fetchOrders();
                return this;
            },

            addOrder: function(order) {
                if (Repository.getOrders().length === 1) {
                    var template = this.getTemplate();
                    this.$el.html(template({}));
                    this.$el.append($(ChartLegend));
                    this.$el.find('#chartLegends').show();
                    barChartUtils.draw(this.$el.find('#chartDiv')[0]);
                }
                this.$el.find('#chartDiv').show();
                this.$el.find('#chartLegends').show();
                this.$el.find('#noOrderMessage').hide();
                var addOrder = new BarWidget({model: order});
                addOrder.render();
            }

        });
    }
);