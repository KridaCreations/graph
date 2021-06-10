function node_click(event)
{
	if (event.currentTarget === event.target)
	{
		if (delete_button.checked === true)
		{
			for (node in this.connections)
			{
				var pair = this.connections[node];
				line_delete(pair.line)
			}
			for (node in this.other_connections)
			{
				var pair = this.other_connections[node];
				line_delete(pair.line)
			}
			if (foccused_node === this)
			{
				foccused_node = null;
			}
			no_of_nodes -= 1;
			center_of_nodes.left = ((center_of_nodes.left * (no_of_nodes + 1)) - this.pos.left)/no_of_nodes;
			center_of_nodes.top = ((center_of_nodes.top * (no_of_nodes + 1)) - this.pos.top)/no_of_nodes;
			baked_animation = null;
			delete nodes[this.id];
			this.remove();

		}
		else if (focus_button.checked === true)
		{
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
		else if (connect_button.checked === true)
		{
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
				join(foccused_node,this,event);
			}
		}

	}
}
  
  
function node_mouse_down(event)
{
	if (!(event.currentTarget === event.target))
	{
		return;
	}
	if (move_button.checked === true)
	{
		var line_style = document.querySelector("#line_sheet");
		line_style.setAttribute("href" ,"css/line_style_move_mode.css" );
		this.pressed = true;
		node_drag_offsetX = event.offsetX;
		node_drag_offsetY = event.offsetY;
		if(foccused_node === null)
		{
			this.style.border= "4px solid green";
			foccused_node = this;
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
	if (move_button.checked === true)
	{
		var line_style = document.querySelector("#line_sheet");
		line_style.setAttribute("href" ,"css/line_style_normal_mode.css" );
		if (this.pressed === true)
		{
			this.pressed = false;
			foccused_node.style.border= "4px solid yellow";
			foccused_node = null;
		}
	}
}


function join(from,to,event)
{
	if (!(from.connections[to.id] === undefined))
	{
		return;
	}
	if (!(to.connections[from.id] === undefined))
	{
		return;
	}
	baked_animation = null;
	var new_line = document.createElementNS("http://www.w3.org/2000/svg","line");
	new_line.className += " svg_graphics";
	draw_area.append(new_line);
	new_line.setAttribute("x1" , from.offsetLeft+25);
	new_line.setAttribute("y1" , from.offsetTop+25);
	new_line.setAttribute("x2" , to.offsetLeft+25);
	new_line.setAttribute("y2" , to.offsetTop+25);
	if (connection_label.selectedIndex === 0)
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
	else if(connection_label.selectedIndex === 1)
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
	else if (connection_label.selectedIndex === 2)
	{
		from.connections[to.id]={"node":to,"line":new_line};
		to.connections[from.id]={"node":from,"line":new_line};
		new_line.detail = {};
		new_line.detail.start = from;
		new_line.detail.end = to;
		new_line.detail.both = true;
		new_line.detail.weight = null;
		dialog_appear(new_line);
		new_line.addEventListener("click",line_click);
	}
	else if(connection_label.selectedIndex === 3)
	{
		new_line.setAttribute("marker-end","url(#arrow)");
		from.connections[to.id]={"node":to,"line":new_line};
		to.other_connections[from.id]={"node":from,"line":new_line};
		new_line.detail = {};
		new_line.detail.start = from;
		new_line.detail.end = to;
		new_line.detail.both = false;
		new_line.detail.weight = null;
		dialog_appear(new_line);
		new_line.addEventListener("click",line_click);
	}

}







