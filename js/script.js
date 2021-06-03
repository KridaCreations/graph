var add_button = document.querySelector("#add_button");
var move_button = document.querySelector("#move_button");
var delete_button = document.querySelector("#delete_button");
var connect_button = document.querySelector("#connect_button");
var focus_button = document.querySelector("#focus_button");
var graph_container = document.querySelector("#graph-container");
var graph = document.querySelector("#graph");
var draw_area = document.querySelector("#draw_area");
var foccused_node = null;
graph_container.addEventListener("click",graph_click);
graph_container.addEventListener("mousemove",graph_mouse_over);
var node_number = -1;
function graph_click(event){
	console.log("hello");
	console.log(event.target);
	
	if (event.currentTarget === event.target)
	{
		
		if (add_button.checked === true)
		{
			node_number+=1;
			console.log("a");
			var new_node = document.createElement("div");
			console.log("b");
			new_node.id = "node" + node_number;
			console.log("c");
			graph.append(new_node);
			console.log("d");
			new_node.connections = {};
			console.log("e");
			new_node.other_connections = {};
			console.log("f");
			new_node.className += "node";
			console.log("g");
			new_node.textContent = node_number;
			console.log("h");
			new_node.pressed = false;
			console.log("i");
			new_node.style=`left:${event.offsetX - 25}px;top: ${event.offsetY -25}px;`;
			console.log("j");
			new_node.addEventListener('click',node_click);
			new_node.addEventListener('mouseup',node_mouse_up);
			new_node.addEventListener('mousedown',node_mouse_down);
			
		}
		// console.log("k");
		else if(focus_button.checked === true)
		{
			if(!(foccused_node === null))
			{
				foccused_node.style.border= "4px solid yellow";
				foccused_node = null;
			}
		}
		console.log("l");
	}
	console.log("m");
		
};

var node_drag_offsetX;
var node_drag_offsetY;

function graph_mouse_over(event)
{
	
	while (!(event.currentTarget === event.target))
	{	
		if (!(foccused_node === null))
		{
			if(foccused_node.pressed === true)
			{
				foccused_node.style=`left:${event.offsetX - 25}px;top: ${event.offsetY -25}px;`;
			}
		}
	}
	
}



function node_mouse_down(event)
{
	if (move_button.checked === true)
	{
		this.pressed = true;
		node_drag_offsetX = event.offsetX;
		node_drag_offsetY = event.offsetY;
		if(foccused_node === null)
		{
			this.style.border= "4px solid green";
			foccused_node = this;
		}
		else if (foccused_node === this)
		{
			foccused_node.style.border= "4px solid yellow";
			foccused_node = null;
		}
		else
		{
			foccused_node.style.border= "4px solid yellow";
			this.style.border= "4px solid green";
			foccused_node = this;
		}
		
	}

}

function node_mouse_up(event)
{
	if (this.pressed === true)
	{
		this.pressed = false;
		this.style=`left:${event.offsetX + this.offsetLeft -25 }px;top: ${event.offsetY + this.offsetTop - 25}px;`;
		
	}
	// event.stopPropagation();
	

}






