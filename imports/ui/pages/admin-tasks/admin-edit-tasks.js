import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tasks } from '/imports/api/tasks/tasks.js';
import { NoEmpty } from '../../../../client/js/validations.js';
import './admin-edit-tasks.html';

Template.admin_edit_tasks.onRendered( () => {
  	//alert("id " + FlowRouter.getParam("_id"));
});

Template.admin_edit_tasks.onCreated( () =>  { 
	
});

Template.admin_edit_tasks.events({
	'submit #form-task-edit'(event, instance) {
  		event.preventDefault();

  		const task = {	
  						_id         : FlowRouter.getParam("_id"),
  						name 		: document.getElementById('name_task').value,
  						description : document.getElementById('description_task').value,
  					 };

  		edit_task(task);			 
  	},
});

Template.admin_edit_tasks.helpers({

  	task: () =>  {
       return Tasks.findOne({ _id : FlowRouter.getParam("_id")});
    },
    
});

function edit_task (task) {

	if ( NoEmpty('name_task' , task.name ) &&  NoEmpty('description_task' , task.description ) ) {

		Meteor.call('tasks.edit',task,(error, response)=>{
		    if(error){

		    	alert("Error " + error);
		    	

		    }else{
		    	 
		    	alert("Good Edit Task");
		    	
		    }
		});
			
	} else {

		alert("Fields Empty");
	}
}