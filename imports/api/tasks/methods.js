// Methods related to Collection
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Tasks } from './tasks.js';

Meteor.methods({
  	'tasks.insert'(task) {
	    // Make sure the user is logged in before inserting a task
	    if (! Meteor.userId()) {
	      throw new Meteor.Error('not-authorized');
	    }

	    check( task, TasksSchema);


	    task.owner     = Meteor.userId();
	    task.createdAt = new Date(); 
	    Tasks.insert(task);
  	},

  	'tasks.edit'(task) {
	    
	    // Make sure the user is logged in before inserting a task
	    if (! Meteor.userId()) {
	      throw new Meteor.Error('not-authorized');
	    }

	    Tasks.update({_id: task._id}, { $set : { name : task.name  , description : task.description , modifyAt : new Date()}  } );
  	},

  	'tasks.remove'(_id) {
	    
	    // Make sure the user is logged in before inserting a task
	    if (! Meteor.userId()) {
	      throw new Meteor.Error('not-authorized');
	    }

	    Tasks.remove({_id:_id});
  	},



});