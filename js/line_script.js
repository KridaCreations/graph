function line_click()
{
	if (delete_button.checked === true)
	{
		baked_animation = null;
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
		if (Number(line.detail.weight)<0)
		{
			negative_weights -= 1;
		}
		line.detail.weight_rect.remove();
	}
	line.remove();
}