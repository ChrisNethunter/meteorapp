export function NoEmpty (input,value)  { 

	const element = document.getElementById(input);

	if (value != ''){
		return true;
	} else {
		element.style.border = '1px solid red'; 
		return false;
	}
   

}