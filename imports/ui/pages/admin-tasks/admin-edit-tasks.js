import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tasks } from '/imports/api/tasks/tasks.js';
import './admin-edit-tasks.html';

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

	if ( task.name != '' &&  task.description  != '' ) {

		Meteor.call('tasks.edit',task,(error, response)=>{
		    if(error){

		    	Bert.alert( 'Error ' + error, 'danger', 'fixed-top', 'fa fa-times' );

		    }else{
		    	 
		    	Bert.alert( 'Se Edito nuestra Tarea correctamente', 'success', 'fixed-top', 'fa fa-check' );
		    	
		    }
		});
			
	} else {

		Bert.alert( 'Campos vacíos!', 'danger', 'fixed-top', 'fa fa-times' );
	}
}