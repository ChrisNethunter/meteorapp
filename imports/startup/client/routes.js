import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/admin-tasks/admin-tasks.js';
import '../../ui/pages/admin-tasks/admin-edit-tasks.js';
// Set up all routes in the app

FlowRouter.route('/', {
  name: 'tasks',
  action() {
    BlazeLayout.render('App_body' , { main : 'admin_tasks'});
  },
});


FlowRouter.route('/edit/tasks/:_id', {
    name:'edit-task',
    subscriptions: function(params, queryParams) {
      this.register('tasks.one', Meteor.subscribe('tasks.one', params._id));
    },
    action: function(params, queryParams) {
      BlazeLayout.render('App_body' , { main : 'admin_edit_tasks'});
    },
});