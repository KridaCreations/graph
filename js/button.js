var coding_appear_button = document.querySelector("#code_appear");
coding_appear_button.visible = false;
coding_appear_button.addEventListener("click",animate_code_area);

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
	console.log("here")
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
			return;
		}
		if(false === (words.every(function(value,index,array){
			return (!(isNaN(Number(value))));
		})))
		{

			console.log("unexpected value in line " + line + 1);
			return;
		}

		if ((words[2] > 4)||(words[2] < 1))
		{
			console.log("unexpected type at line " + line + 1);
			return;
		}
		gen_array.push(words.map(Number));
	}
	console.log(gen_array);
	generate_graph(gen_array);

}

function generate_graph(gen_array)
{	
	var spread = gen_array.length;
	for (format in gen_array)
	{

		var node_name = "node" + gen_array[format][0];
		var node_from;
		var node_to;
		if (document.nodes.hasOwnProperty(node_name) === false)
		{
			var x = getRndInteger(-spread*50,spread*50);
			var y = getRndInteger(-spread*50,spread*50);
			node_from = add_node(gen_array[format][0],250+y,750+x);
		}	
		else
		{
			node_from = document.nodes[node_name];
		}
		node_name = "node" + gen_array[format][1];
		if (document.nodes.hasOwnProperty(node_name) === false)
		{
			x = getRndInteger(-spread*50,spread*50);
			y = getRndInteger(-spread*50,spread*50);
			node_to = add_node(gen_array[format][1],250+y,750+x);
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
		// dialog_appear(new_line);
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
		// dialog_appear(new_line);
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