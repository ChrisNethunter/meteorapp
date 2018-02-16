import { Meteor } from 'meteor/meteor';
import { Tasks } from '../tasks.js';

Meteor.publish('tasks.all', function () {
  	return Tasks.find();
});

Meteor.publish('tasks.one', function (_id) {
  	return Tasks.find({_id:_id});
});


Meteor.publish('tasks.private', function(user){
	if (!this.userId) {
    	return this.ready();
  	}
  	return Tasks.find({owner:user});
});
