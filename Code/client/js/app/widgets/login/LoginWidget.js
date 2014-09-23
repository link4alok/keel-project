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
 * app/widgets/login/LoginWidget
 *
 * @author Naresh Bhatia
 */
define(
    [
        'app/domain/Repository',
        'backbone',
        'keel/BaseView',
        'text!app/widgets/login/LoginTemplate.html'
    ],
    function(Repository, Backbone, BaseView, LoginTemplate) {
        'use strict';

        return BaseView.extend({
            tagName: 'form',

            elements: ['userSelector'],

            template: {
                name: 'LoginTemplate',
                source: LoginTemplate
            },

            events: {
                'click .js-loginButton': 'login'
            },

            render: function() {
                var template = this.getTemplate();
                var context = this.collection.toJSON();

                // Destroy existing children
                this.destroyChildren();

                this.$el.html(template({users: context}));
                this._setupElements();

                return this;
            },

            login: function() {
                var loggedInUserId = this.userSelectorElement.val();
                Repository.setloggedInUser(loggedInUserId);
                sessionStorage.setItem('userInform',loggedInUserId);
                Backbone.history.navigate('order-table', true);
                return false;
            }
        });
    }
);