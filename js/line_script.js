function line_click()
{
	// return false;
	var start = this.detail.start;
	var end = this.detail.end;
	delete end.connections[start];
	delete start.connections[end];
	this.remove();
}