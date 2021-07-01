var coding_appear_button = document.querySelector("#code_appear");
var animation_panel_button = document.querySelector("#animation_panel_button") 
var tools_panel_button = document.querySelector("#tools_panel_button")
var animation_panel = document.querySelector("#animation_panel");
var tools_panel = document.querySelector("#tools_panel");

tools_panel_button.visible = false;
animation_panel_button.visible = false;
coding_appear_button.visible = false;

coding_appear_button.addEventListener("click",animate_code_area);
animation_panel_button.addEventListener("click",appear_animation_panel);
tools_panel_button.addEventListener("click",appear_tools_panel);

function appear_tools_panel (argument) 
{
	if (tools_panel_button.visible === false) 
	{
		tools_panel.classList.remove("tools_panel_disappear");
		tools_panel.classList.add("tools_panel_appear");
		tools_panel_button.visible = true;
	}
	else 
	{
		tools_panel.classList.remove("tools_panel_appear");
		tools_panel.classList.add("tools_panel_disappear");
		tools_panel_button.visible = false;
	}
}

function appear_animation_panel(argument)
{
	if (animation_panel_button.visible === false) 
	{
		animation_panel.classList.remove("animation_panel_disappear");
		animation_panel.classList.add("animation_panel_appear");
		animation_panel_button.visible = true;
	}
	else 
	{
		animation_panel.classList.remove("animation_panel_appear");
		animation_panel.classList.add("animation_panel_disappear");
		animation_panel_button.visible = false;
	}
}


function animate_code_area()
{
	if(coding_appear_button.visible === false)
	{
		this.parentNode.className = "appeared";
		coding_appear_button.visible = true;
	}
	else
	{
		this.parentNode.className = "disappeared";
		coding_appear_button.visible = false;
	}
}


var code_editor = document.querySelector("#code_editor");
var gen_button = document.querySelector("#generate");
var cls_button = document.querySelector("#clear");

cls_button.addEventListener("click",clear_editor);
gen_button.addEventListener("click",generate);

function clear_editor()
{
	code_editor.value = "";
}


function generate()
{
	var lines = code_editor.value.split("\n");
	var gen_array = [];
	for(line in lines)
	{
		var p_line = lines[line].replace(/^\s+|\s+$/g, "");
		p_line = p_line.replace(/\s+/g, " ");
		words = p_line.split(" ");
		
		if (words.length > 4)
		{
			prompt()
			return;
		}

		if (words.length < 4) 
		{
			alert("less command at line " + (Number(line) + 1));
			return;
		}

		if(false === (words.every(function(value,index,array){return(!(isNaN(Number(value))));})))
		{

			alert("unexpected value in line " + (Number(line) + 1));
			return;
		}

		if ((words[2] > 4)||(words[2] < 1))
		{
			alert("unexpected type at line " + (Number(line) + 1));
			return;
		}
		gen_array.push(words.map(Number));
	}
	generate_graph(gen_array);

}

function generate_graph(gen_array)
{	
	clear_graph();
	var spread = gen_array.length;
	for (format in gen_array)
	{

		var node_name = "node" + (gen_array[format][0]);
		var node_from;
		var node_to;
		if (document.nodes.hasOwnProperty(node_name) === false)
		{
			var x = getRndInteger(-spread*20,spread*20);
			var y = getRndInteger(-spread*20,spread*20);
			node_from = add_node(gen_array[format][0],250+y,750+x,0);
		}	
		else
		{
			node_from = document.nodes[node_name];
		}
		node_name = "node" + gen_array[format][1];
		if (document.nodes.hasOwnProperty(node_name) === false)
		{
			x = getRndInteger(-spread*20,spread*20);
			y = getRndInteger(-spread*20,spread*20);
			node_to = add_node(gen_array[format][1],250+y,750+x,0);
		}
		else
		{
			node_to = document.nodes[node_name];
		}
		join_node_format(node_from,node_to,gen_array[format][2],gen_array[format][3],);
	}
}

function join_node_format(from,to,type,length)
{
	if (!(from.connections[to.id] === undefined))
	{
		return;
	}
	if (!(to.connections[from.id] === undefined))
	{
		return;
	}
	var new_line = document.createElementNS("http://www.w3.org/2000/svg","line");
	new_line.className += " svg_graphics";
	draw_area.append(new_line);
	new_line.setAttribute("x1" , from.offsetLeft+25);
	new_line.setAttribute("y1" , from.offsetTop+25);
	new_line.setAttribute("x2" , to.offsetLeft+25);
	new_line.setAttribute("y2" , to.offsetTop+25);
	if (type === 1)
	{
		from.connections[to.id]={"node":to,"line":new_line};
		to.connections[from.id]={"node":from,"line":new_line};
		new_line.detail = {};
		new_line.detail.start = from;
		new_line.detail.end = to;
		new_line.detail.both = true;
		new_line.detail.weight = null;
		new_line.addEventListener("click",line_click);
	}
	else if(type === 2)
	{
		new_line.setAttribute("marker-end","url(#arrow)");
		from.connections[to.id]={"node":to,"line":new_line};
		to.other_connections[from.id]={"node":from,"line":new_line};
		new_line.detail = {};
		new_line.detail.start = from;
		new_line.detail.end = to;
		new_line.detail.both = false;
		new_line.detail.weight = null;
		new_line.addEventListener("click",line_click);
	}
	else if(type === 3)
	{
		from.connections[to.id]={"node":to,"line":new_line};
		to.connections[from.id]={"node":from,"line":new_line};
		new_line.detail = {};
		new_line.detail.start = from;
		new_line.detail.end = to;
		new_line.detail.both = true;
		new_line.detail.weight = null;
		add_length_tag(new_line,length);
		new_line.addEventListener("click",line_click);
	}
	else if (type === 4) 
	{
		new_line.setAttribute("marker-end","url(#arrow)");
		from.connections[to.id]={"node":to,"line":new_line};
		to.other_connections[from.id]={"node":from,"line":new_line};
		new_line.detail = {};
		new_line.detail.start = from;
		new_line.detail.end = to;
		new_line.detail.both = false;
		new_line.detail.weight = null;
		add_length_tag(new_line,length);
		new_line.addEventListener("click",line_click);
	}
}

function add_length_tag(line,length)
{
	var new_group = document.createElementNS("http://www.w3.org/2000/svg","svg");
	var new_rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
	var new_text = document.createElementNS("http://www.w3.org/2000/svg","text");
	new_text.setAttribute("dominant-baseline","middle");
	new_text.setAttribute("text-anchor","middle");
	new_text.textContent = "H";
	document.createElementNS("http://www.w3.org/2000/svg","rect");
	new_rect.className += " svg_graphics";
	new_group.width = "0";
	new_group.height = "0";
	draw_area.append(new_group);
	new_group.append(new_rect);
	new_group.append(new_text);
	new_text.setAttribute("x",20);
	new_text.setAttribute("y",15);
	var x_pos = (Number(line.getAttribute("x1"))+ Number(line.getAttribute("x2")))/2;
	var y_pos = (Number(line.getAttribute("y1")) + Number(line.getAttribute("y2")))/2;
	new_group.setAttribute("x" , x_pos-7.5 );
	new_group.setAttribute("y" , y_pos-10 );
	new_rect.setAttribute("width" , 40);
	new_rect.setAttribute("height" , 30);
	new_text.textContent = length;
	line.detail.weight_rect = new_group;
	line.detail.weight = length;
}