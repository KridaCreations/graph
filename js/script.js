var add_button = document.querySelector("#add_button");
var move_button = document.querySelector("#move_button");
var delete_button = document.querySelector("#delete_button");
var connect_button = document.querySelector("#connect_button");
var focus_button = document.querySelector("#focus_button");
var graph_container = document.querySelector("#graph-container");
var connection_label = document.querySelector("#connections");
var graph = document.querySelector("#graph");
var draw_area = document.querySelector("#draw_area");
var dialog = document.querySelector("#dialog");
var dialog_hide = document.querySelector("#hide");
var dialog_connect = document.querySelector("#connect");
var foccused_node = null;
document.nodes = {};


graph_container.addEventListener("click",graph_click);
graph_container.addEventListener("mousemove",graph_mouse_over);
var node_number = -1;

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}



function graph_click(event){
	var p_x = 0;
	var p_y = 0;
	var present_node = event.target;
	while( !(event.currentTarget === present_node))
	{
		if (!(present_node === null))
		{
			p_x += present_node.offsetLeft;
			p_y += present_node.offsetTop;
			present_node = present_node.parentNode;
			
		}
		else
		{
			return;
		}
	}
	event.stopPropagation();
	if (event.currentTarget === present_node)
	{
		
		if (add_button.checked === true)
		{
			node_number+=1;
			position_x = event.offsetX + p_x - 25;
			position_y = event.offsetY + p_y - 25;
			// add_node(node_number,event,p_y,p_x);
			add_node(node_number,position_y,position_x);			
		}

	}
		
};



function add_node(id_no,position_y,position_x)
{
	var new_node = document.createElement("div");
	// new_node.id = "node" + node_number;
	new_node.id = "node" + id_no;
	graph.append(new_node);
	new_node.connections = {};
	new_node.other_connections = {};
	new_node.className += "node";
	// new_node.textContent = node_number;
	new_node.textContent = id_no;
	new_node.pressed = false;
	new_node.style=`left:${position_x}px;top: ${position_y}px;`;
	new_node.addEventListener('click',node_click);
	new_node.addEventListener('mouseup',node_mouse_up);
	new_node.addEventListener('mousedown',node_mouse_down);
	document.nodes[new_node.id] = new_node;
	return new_node;
}

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

			foccused_node.style.left = `${event.offsetX - node_drag_offsetX + p_x }px`;
			foccused_node.style.top = `${event.offsetY  - node_drag_offsetY + p_y }px`;
			for (node in foccused_node.connections)
			{
				var pair = foccused_node.connections[node];
				pair.line.setAttribute("x1" , event.offsetX - node_drag_offsetX + p_x + 25  );
				pair.line.setAttribute("y1" , event.offsetY  - node_drag_offsetY + p_y + 25  );
				pair.line.setAttribute("x2" , pair.node.offsetLeft + 25 );
				pair.line.setAttribute("y2" , pair.node.offsetTop + 25 );

				if (!(pair.line.detail.weight === null))
				{
					var x_pos = (event.offsetX - node_drag_offsetX + p_x + 25  + Number(pair.line.getAttribute("x2")))/2;
					var y_pos = (event.offsetY  - node_drag_offsetY + p_y + 25  + Number(pair.line.getAttribute("y2")))/2;
					pair.line.detail.weight_rect.setAttribute("x", x_pos-7.5);
					pair.line.detail.weight_rect.setAttribute("y", y_pos-10);
				}
			}
			for (node in foccused_node.other_connections)
			{
				var pair = foccused_node.other_connections[node];
				pair.line.setAttribute("x2" ,event.offsetX - node_drag_offsetX + p_x + 25  );
				pair.line.setAttribute("y2" , event.offsetY  - node_drag_offsetY + p_y + 25  );
				if (!(pair.line.detail.weight === null))
				{
					var x_pos = (event.offsetX - node_drag_offsetX + p_x + 25  + Number(pair.line.getAttribute("x1")))/2;
					var y_pos = (event.offsetY  - node_drag_offsetY + p_y + 25  + Number(pair.line.getAttribute("y1")))/2;
					pair.line.detail.weight_rect.setAttribute("x", x_pos-7.5);
					pair.line.detail.weight_rect.setAttribute("y", y_pos-10);
				}
			}

		}
	}
}










