function line_click()
{
	if (delete_button.checked === true)
	{
		line_delete(this);
	}
}


function line_delete(line)
{
	var start = line.detail.start;
	var end = line.detail.end;
	if(line.detail.both === true)
	{
		delete end.connections[start.id];
		delete start.connections[end.id];
	}
	else
	{
		delete start.connections[end.id];
		delete end.other_connections[start.id];
	}
	if (!(line.detail.weight === null))
	{
		line.detail.weight_rect.remove();
	}
	line.remove();
}