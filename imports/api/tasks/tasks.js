import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

TasksSchema = new SimpleSchema({

	name        :{
					type  : String,
					label : "Titulo",
					max   : 200
			 	},
	description :{
					type  : String,
					label : "Descripcion",
					max   : 200
			 	},

	owner   : 	{
					type  : String,
					label : "Autor",
					optional: true,
					autoValue : () =>{
						return this.userId
					}
			 	},
	createdAt:  {
					type  : Date,
					label : "Creado",
					autoValue : () =>{
						return new Date()
					} 
				}				
});


//Tasks.attachSchema(TasksSchema);
