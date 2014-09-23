/**
 *app/widgets/header/Header Widget
 * @author Ravi Tripathi
 */
var define = define;
define([
    'app/domain/Repository',
    'backbone',
    'keel/BaseView',
    'text!app/widgets/header/HeaderTemplate.html'
],
    function (Repository, Backbone, BaseView, HeaderTemplate) {
    'use strict';
    return BaseView.extend({
        tagName: 'div',
        id: 'headerDiv',
        template: {
            name: 'HeaderTemplate',
            source: HeaderTemplate
        },
        events : {
            'click #signOut' : 'signOut'
        },
        render: function () {
            var template = this.getTemplate();
            var loggedInUser = Repository.getloggedInUser();
            if (Repository.getloggedInUser() === null) {
                loggedInUser = Repository.getUser(sessionStorage.getItem('userInform')).get('name');
            }
            else {
                loggedInUser = Repository.getloggedInUser().get('name');
            }
            this.$el.html(template({name : loggedInUser}));
            return this;
        },
        signOut : function () {
            sessionStorage.removeItem('userInform');
        }
    });
});