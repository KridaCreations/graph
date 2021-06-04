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
		delete end.connections[start];
		delete start.connections[end];
	}
	else
	{
		delete start.connections[end];
		delete end.other_connections[start];
	}
	line.remove();
}