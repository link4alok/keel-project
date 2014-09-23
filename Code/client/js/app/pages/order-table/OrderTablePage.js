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
 * app/pages/order-table/OrderTablePage
 *
 * @author Naresh Bhatia
 */
define(
    [
        'app/domain/Repository',
        'app/framework/Message',
        'keel/MessageBus',
        'app/widgets/Header/HeaderWidget',
        'app/widgets/ToolBar/ToolbarWidget',
        'app/widgets/chart/ChartWidget',
        'app/widgets/table/TableWidget',
        'keel/BaseView',
        'app/widgets/createOrderDialogBox/createOrderDialogBox',
        'text!app/pages/order-table/OrderTablePageTemplate.html'
    ],
    function(Repository, Message, MessageBus, HeaderWidget, ToolbarWidget,
        ChartWidget, TableWidget, BaseView,  createOrderDialogBox, OrdertablePageTemplate) {
        'use strict';

        return BaseView.extend({
            tagName: 'section',
            id: 'order-table-page',

            template: {
                name: 'OrdertablePageTemplate',
                source: OrdertablePageTemplate
            },

            events: {
                'click #tradeButton': 'openTradePopUp'
            },

            openTradePopUp: function() {
                MessageBus.trigger(Message.openPopup);
            },

            postRender: function() {
                this.addChildren([
                    {
                        id: 'HeaderWidget',
                        viewClass: HeaderWidget,
                        parentElement: this.$el
                    },
                    {
                        id: 'ToolbarWidget',
                        viewClass: ToolbarWidget,
                        parentElement: this.$el
                    },
                    {
                        id: 'ChartWidget',
                        viewClass: ChartWidget,
                        parentElement: this.$el,
                        options: {
                            collection: Repository.getOrders()
                        }
                    },
                    {
                        id: 'TableWidget',
                        viewClass: TableWidget,
                        parentElement: this.$el,
                        options: {
                            collection: Repository.getOrders()
                        }
                    },
                    {
                        id: 'createOrderDialogBox',
                        viewClass: createOrderDialogBox,
                        parentElement: this.$el
                    }
                ]);
                (this.children.TableWidget).show();
                (this.children.ChartWidget).hide();
            },

            tableActive: function () {
                (this.children.TableWidget).show();
                (this.children.ChartWidget).hide();
            },

            chartActive: function () {
                (this.children.ChartWidget).show();
                (this.children.TableWidget).hide();
            },

            initialize: function () {
                this.listenTo(MessageBus, Message.tableActive, this.tableActive);
                this.listenTo(MessageBus, Message.chartActive, this.chartActive);
            }
        });
    }
);