/**
 * Copyright 2013 Archfirst
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * app/widgets/login/LoginWidget
 *
 * @author Naresh Bhatia
 */
define(
    [
        'app/domain/Repository',
        'backbone',
        'app/framework/Message',
        'keel/MessageBus',
        'keel/BaseView',
        'text!app/widgets/createOrderDialogBox/createOrderTemplateDialogBox.html',
        'jquery',
        'jqueryui',
        'randomOrderCreator',
        'app/framework/Services'
    ],
    function(Repository, Backbone, Message, MessageBus, BaseView, createOrderTemplateDialogBox, $, jqueryui, randomOrderCreator, Services ) {
        'use strict';
        var services = new Services();

        return BaseView.extend({
            tagName: 'div',
            id : 'popUpDiv',

            initialize: function () {
                this.listenTo(MessageBus, Message.openPopup, this.loadDialogBox);
            },

            template: {
                name: 'createOrderTemplateDialogBox',
                source: createOrderTemplateDialogBox
            },

            events: {
                'click #cancelBtn': 'closeDialogBox',
                'click #createBtn':'createOrders',
                'keypress': 'createOrdersOnEnter'
            },
            render :function(){
                return this;
            },
            closeDialogBox:function(){
                $('#dialogBoxDiv').remove();
            },
            loadDialogBox:function(){
                var temp= this.template.source;
                var popUp = $(temp)[0];
                $(popUp).dialog(
                    {
                        title : 'Create Multiple Trades'
                    },
                    {
                        autoOpen:true,
                        modal: true,
                        draggable:false,
                        closeOnEscape: true,
                        width:300,
                        height:180
                    },
                    {
                        appendTo : this.$el
                    }
                  );
                $('#errorMesg').html('');
            },
            orderRequest: function(num) {
                var callback = function (){};
                for (var i = 0; i < num; i++) {
                    services.makeRequest('POST', randomOrderCreator(), callback);
                }
            },
            createOrders: function () {
                var order = $('#noOfOrders').val(),
                    reg = /^[1-9][0-9]*$/;
                if(reg.test(order)) {
                    this.orderRequest(order);
                    this.closeDialogBox();
                    Repository.fetchOrders();
                }
                else {
                    $('#errorMesg').html('Invalid Input');
                }
                // if(order === '' || order <= 0 || order % 1 !== 0) {
                //     $('#errorMesg').html('Invalid Input');
                // }
                // else {
                //      var orderRequest = function(num) {
                //         for (var i = 0; i < num; i++) {
                //             services.makeRequest('POST', randomOrderCreator());
                //         }
                //     };
                //     this.orderRequest(order);
                //     this.closeDialogBox();
                //     Repository.fetchOrders();
                // }
            },
            createOrdersOnEnter: function(event){
                if (event.which === 13 ) {
                    event.preventDefault();
                    this.createOrders();
                }
            }
        });
    }
);

