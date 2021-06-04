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
	var p_x = 0;
	var p_y = 0;
	var present_node = event.target;
	while( !(event.currentTarget === present_node))
	{
		p_x += present_node.offsetLeft;
		p_y += present_node.offsetTop;
		present_node = present_node.parentNode;
	}
	event.stopPropagation();
	if (event.currentTarget === present_node)
	{
		
		if (add_button.checked === true)
		{
			node_number+=1;
			var new_node = document.createElement("div");
			new_node.id = "node" + node_number;
			graph.append(new_node);
			new_node.connections = {};
			new_node.other_connections = {};
			new_node.className += "node";
			new_node.textContent = node_number;
			new_node.pressed = false;
			new_node.style=`left:${event.offsetX + p_x - 25}px;top: ${event.offsetY + p_y -25}px;`;
			new_node.addEventListener('click',node_click);
			new_node.addEventListener('mouseup',node_mouse_up);
			new_node.addEventListener('mousedown',node_mouse_down);
			
		}

	}
		
};

var node_drag_offsetX;
var node_drag_offsetY;

function graph_mouse_over(event)
{
	
	if (foccused_node === null)
	{
		return;
	}
	else
	{
		if(foccused_node.pressed === true)
		{
			var p_x = 0;
			var p_y = 0;
			console.log(event.target.nodeName);
			if (event.target.nodeName === "line")
			{
				var present_node = foccused_node;
			}	
			else
			{
				present_node = event.target;
			}
			while( !(event.currentTarget === present_node))
			{
				p_x += present_node.offsetLeft;
				p_y += present_node.offsetTop;
				present_node = present_node.parentNode;
			}

			// foccused_node.style.left = `${event.offsetX + p_x -25}px`;
			// foccused_node.style.top = `${event.offsetY  + p_y - 25}px`;

			foccused_node.style.left = `${event.offsetX - node_drag_offsetX + p_x }px`;
			foccused_node.style.top = `${event.offsetY  - node_drag_offsetY + p_y }px`;
			for (node in foccused_node.connections)
			{
				// console.log("error" + event.offsetY);
				var pair = foccused_node.connections[node];
				// pair.line.setAttribute("x1" , `${foccused_node.style.left}px` );
				// pair.line.setAttribute("y1" , `${foccused_node.style.top}px`  );
				pair.line.setAttribute("x1" , `${event.offsetX - node_drag_offsetX + p_x + 25 }px` );
				pair.line.setAttribute("y1" , `${event.offsetY  - node_drag_offsetY + p_y + 25 }px` );
				pair.line.setAttribute("x2" , pair.node.offsetLeft + 25);
				pair.line.setAttribute("y2" , pair.node.offsetTop + 25);
			}

		}
	}
}










