var slider = document.querySelector("#dialog_slider");
var num_input = document.querySelector("#num_input");

function dialog_appear(line)
{
	dialog.line = line;
	dialog.show();
}

slider.oninput = function()
{
	num_input.value = this.value;
}

num_input.oninput = function()
{
	slider.value = this.value;
}

function hide_dialog()
{
	line_delete(dialog.line);
	dialog.close();
}

function connect_dialog()
{
	var new_group = document.createElementNS("http://www.w3.org/2000/svg","svg");
	var new_rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
	var new_text = document.createElementNS("http://www.w3.org/2000/svg","text");
	var title = document.createElementNS("http://www.w3.org/2000/svg","title");
	new_group.append(title);
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
	var x_pos = (Number(dialog.line.getAttribute("x1"))+ Number(dialog.line.getAttribute("x2")))/2;
	var y_pos = (Number(dialog.line.getAttribute("y1")) + Number(dialog.line.getAttribute("y2")))/2;
	new_group.setAttribute("x" , x_pos-7.5 );
	new_group.setAttribute("y" , y_pos-10 );
	new_rect.setAttribute("width" , 40);
	new_rect.setAttribute("height" , 30);
	new_text.textContent = num_input.value;
	dialog.line.detail.weight_rect = new_group;
	title.textContent = num_input.value;
	dialog.line.detail.weight = num_input.value;
	if (Number(num_input.value) < 0)
	{
		negative_weights += 1;
	}
	// console.log(typeof dialog.line.detail.weight);
	dialog.close();
}

dialog_hide.addEventListener("click",hide_dialog);
dialog_connect.addEventListener("click",connect_dialog);