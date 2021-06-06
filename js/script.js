var add_button = document.querySelector("#add_button");
var move_button = document.querySelector("#move_button");
var delete_button = document.querySelector("#delete_button");
var connect_button = document.querySelector("#connect_button");
var focus_button = document.querySelector("#focus_button");
var graph_container = document.querySelector("#graph-container");
var connection_label = document.querySelector("#connections");
var graph = document.querySelector("#graph");
var draw_area_container = document.querySelector("#draw_area_container");
var draw_area = document.querySelector("#draw_area");
var dialog = document.querySelector("#dialog");
var dialog_hide = document.querySelector("#hide");
var dialog_connect = document.querySelector("#connect");
var foccused_node = null;
var node_number = -1;
var scale = 1;
var g_pos = {"left" : 0,"top" : 0};
var graph_pressed = false;
document.nodes = {};

graph_container.addEventListener("wheel",graph_wheel);
graph_container.addEventListener("click",graph_click);
graph_container.addEventListener("mousemove",graph_mouse_over);
graph_container.addEventListener("mouseup",graph_mouse_up);
graph_container.addEventListener("mousedown",graph_mouse_down);
graph_container.addEventListener("mouseover",graph_mouse_over);

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function graph_mouse_down()
{
	console.log("down");
	if(event.button === 1 )
	{
		graph_pressed = true;
	}
}

function graph_mouse_up()
{
	if (graph_pressed === true)
	{
		graph_pressed = false;
	}
}

function graph_wheel(event)
{
		var con_pos_x = graph_container.getBoundingClientRect().left;
		var con_pos_y = graph_container.getBoundingClientRect().top;
		var ev_wrt_con_x = event.clientX - con_pos_x;
		var ev_wrt_con_y = event.clientY - con_pos_y;
		var prev_scale = scale;
		scale += event.deltaY * -0.0001;
	  scale = Math.min(Math.max(.125, scale), 4);
	  zoom_board(graph,ev_wrt_con_x,ev_wrt_con_y,prev_scale,scale);
}


function zoom_board(graph,ev_wrt_con_x,ev_wrt_con_y,prev_scale,to_scale)
{
		  var prev_dis_x = -(g_pos.left  - ev_wrt_con_x);
		  var prev_dis_y = -(g_pos.top  - ev_wrt_con_y);
		  graph.style.transform = (`scale(${to_scale})`);
		  draw_area_container.style.transform = (`scale(${to_scale})`);
		  var pre_scale = to_scale;
		  var pre_dis_x = ((prev_dis_x)/(prev_scale))*to_scale;
		  var pre_dis_y = ((prev_dis_y)/(prev_scale))*to_scale;
		  var diff_x = prev_dis_x - pre_dis_x;
		  var diff_y = prev_dis_y - pre_dis_y;
		  g_pos.top = g_pos.top + diff_y;
		  g_pos.left = g_pos.left + diff_x;
		  graph.style.top = `${g_pos.top}px`;
		  graph.style.left = `${g_pos.left}px`;
		  draw_area_container.style.top = `${g_pos.top}px`;
		  draw_area_container.style.left = `${g_pos.left}px`;
}


function graph_click(event)
{

	if (event.button === 1)
	{
		return;
	}

	var con_pos_x = graph_container.getBoundingClientRect().left ;
	var con_pos_y = graph_container.getBoundingClientRect().top;
	var ev_wrt_con_x = event.clientX - con_pos_x;
	var ev_wrt_con_y = event.clientY - con_pos_y;

	event.stopPropagation();
	if (add_button.checked === true)
	{
		node_number+=1;
		var dgcc_x = graph.getBoundingClientRect().left - graph_container.getBoundingClientRect().left;
		var dgcc_y = graph.getBoundingClientRect().top - graph_container.getBoundingClientRect().top;
		var calc_x = (ev_wrt_con_x - dgcc_x)/scale;
		var calc_y = (ev_wrt_con_y - dgcc_y)/scale;
		add_node(node_number,calc_y-25,calc_x-25);

	}
		
};


function add_node(id_no,position_y,position_x)
{
	var new_node = document.createElement("div");
	new_node.id = "node" + id_no;
	graph.append(new_node);
	new_node.connections = {};
	new_node.other_connections = {};
	new_node.className += "node";
	new_node.textContent = id_no;
	new_node.pressed = false;
	new_node.title = new_node.id;
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
	
	if (graph_pressed === true)
	{
		g_pos.top += event.movementY;
		g_pos.left += event.movementX;
		graph.style.top = `${g_pos.top}px`;
		graph.style.left = `${g_pos.left}px`;
		draw_area_container.style.top = `${g_pos.top}px`;
		draw_area_container.style.left = `${g_pos.left}px`;
		return;
	}
	if (foccused_node === null)
	{
		return;
	}
	else
	{
		if(foccused_node.pressed === true)
		{
			var con_pos_x = graph_container.getBoundingClientRect().left ;
			var con_pos_y = graph_container.getBoundingClientRect().top;
			var ev_wrt_con_x = event.clientX - con_pos_x;
			var ev_wrt_con_y = event.clientY - con_pos_y;
			var dgcc_x = graph.getBoundingClientRect().left - graph_container.getBoundingClientRect().left;
			var dgcc_y = graph.getBoundingClientRect().top - graph_container.getBoundingClientRect().top;
			var calc_x = (ev_wrt_con_x - dgcc_x)/scale;
			var calc_y = (ev_wrt_con_y - dgcc_y)/scale;
			calc_y -= node_drag_offsetY;
			calc_x -= node_drag_offsetX;
			foccused_node.style.left = `${calc_x}px`;
			foccused_node.style.top = `${calc_y}px`;

			for (node in foccused_node.connections)
			{
				var pair = foccused_node.connections[node];
				pair.line.setAttribute("x1" , calc_x+ 25  );
				pair.line.setAttribute("y1" , calc_y+ 25  );
				pair.line.setAttribute("x2" , pair.node.offsetLeft + 25 );
				pair.line.setAttribute("y2" , pair.node.offsetTop + 25 );

				if (!(pair.line.detail.weight === null))
				{
					var x_pos = (calc_x + 25  + Number(pair.line.getAttribute("x2")))/2;
					var y_pos = (calc_y + 25  + Number(pair.line.getAttribute("y2")))/2;
					pair.line.detail.weight_rect.setAttribute("x", x_pos-7.5);
					pair.line.detail.weight_rect.setAttribute("y", y_pos-10);
				}
			}
			for (node in foccused_node.other_connections)
			{
				var pair = foccused_node.other_connections[node];
				pair.line.setAttribute("x2" ,calc_x + 25  );
				pair.line.setAttribute("y2" ,calc_y + 25  );
				if (!(pair.line.detail.weight === null))
				{
					var x_pos = (calc_x + 25  + Number(pair.line.getAttribute("x1")))/2;
					var y_pos = (calc_y + 25  + Number(pair.line.getAttribute("y1")))/2;
					pair.line.detail.weight_rect.setAttribute("x", x_pos-7.5);
					pair.line.detail.weight_rect.setAttribute("y", y_pos-10);
				}
			}

		}
	}
}










