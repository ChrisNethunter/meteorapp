import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tasks } from '/imports/api/tasks/tasks.js';
import './admin-tasks.html';

var handlerTaskSuscription;


Template.admin_tasks.onRendered( () => {

});

Template.admin_tasks.onCreated( () =>  {

	handlerTaskSuscription = Meteor.subscribe("tasks.all");

});

Template.admin_tasks.events({

  	'click #create-task'(event, instance) {
  		event.preventDefault();
  		const form = $('#content-form-create');

	    if (  form.hasClass('toogle') ) {
	    	form.removeClass('toogle');
	    	form.fadeOut('slow');
	    } else {
	    	form.addClass('toogle');
	    	form.fadeIn('slow');
	    };
  	},

  	'submit #form-task'(event, instance) {
  		event.preventDefault();

  		const task = {
  						name 		: document.getElementById('name_task').value,
  						description : document.getElementById('description_task').value,
  					 };

  		insert_task(task);			 
  	},
 	
 	'click .edit'(event, instance) {
  		event.preventDefault();

  		FlowRouter.go('edit-task' , { _id : event.currentTarget.id } ); 
  	},

  	'click .remove'(event, instance) {
  		event.preventDefault();

  		Meteor.call('tasks.remove',event.currentTarget.id,(error, response)=>{
		    if(error){
		    	Bert.alert( 'Error ' + error, 'danger', 'fixed-top', 'fa fa-times' );
		    }
		});
  	}

});

function insert_task (task) {

	if ( task.name != "" &&  task.description !="" ) {


		Meteor.call('tasks.insert',task,(error, response)=>{

		    if(error){

		    	Bert.alert( 'Error ' + error, 'danger', 'fixed-top', 'fa fa-times' );

		    }else{
		  		Bert.alert( 'Se Inserto nuestra Tarea correctamente', 'success', 'fixed-top', 'fa fa-check' );
	
		    }

		});
			
	} else {

		Bert.alert( 'Campos vacíos!', 'danger', 'fixed-top', 'fa fa-times' );
	}
}

Template.admin_tasks.helpers({

  	tasks: (param) =>  {
       return Tasks.find({});
    },
    
});

Template.admin_tasks.onDestroyed(function () {

	handlerTaskSuscription.stop();
  	
});