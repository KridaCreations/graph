function node_click(event)
{
	// event.stopPropagation();
	if (event.currentTarget === event.target)
	{
		if (delete_button.checked === true)
		{
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
	var new_line = document.createElementNS("http://www.w3.org/2000/svg","line");
	new_line.className += " svg_graphics";
	draw_area.append(new_line);
	new_line.setAttribute("x1" , from.offsetLeft+25);
	new_line.setAttribute("y1" , from.offsetTop+25);
	new_line.setAttribute("x2" , to.offsetLeft+25);
	new_line.setAttribute("y2" , to.offsetTop+25);
	from.connections[to.id]={"node":to,"line":new_line};
	to.connections[from.id]={"node":from,"line":new_line};
	new_line.detail = {};
	new_line.detail.start = from;
	new_line.detail.end = to;
	new_line.detail.both = true;
	new_line.addEventListener("click",line_click);
	// console.log(this.pressed);
}






