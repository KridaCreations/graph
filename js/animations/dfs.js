function bake_dfs()
{

	if (foccused_node === null)
	{
		alert("please choose a starting node\nyou can do this by foccusing on the start node ");
		return;
	}
	recolor_graph();
	visited_node[foccused_node.id] = 1;
	anim_array.push(["start",foccused_node]);
	context_array.push(`Starting from the foccused node (${foccused_node.id})`);
	dfs(foccused_node);
	anim_array.push(["done",foccused_node]);
	context_array.push(`marking ${foccused_node.id} as done`)
	baked_animation = 0;
	anim_position.max = anim_array.length-1;
	current_stage = -1;
	change_anim_position(current_stage);
}

function change_to_anim_stage_dfs(stage)
{
	var pre_stage = current_stage;
	if ((pre_stage < stage) && (stage < anim_array.length))
	{
		for(i = pre_stage+1;i <= stage;i++)
		{
			perform_dfs_fast(i,anim_array);	
		}
		current_stage = stage;
	}
	else if ((pre_stage > stage) && (stage >= -1))
	{
		for(i = pre_stage-1;i >= stage;i--)
		{
			perform_dfs_fast_back(i,anim_array);
		}
		current_stage = stage;
	}
	else if(stage === -1)
	{
		anim_array[stage+1][1].style.removeProperty("background-color");
		current_stage = stage;
	}
}

function dfs(node)
{
	for (nodes in node.connections )
	{
		var pair = node.connections[nodes];
		if (!(visited_node[pair.node.id] === 1))
		{
			visited_node[pair.node.id] = 1;
			anim_array.push(["go",pair.node]);
			context_array.push(`going to ${pair.node.id}`);
			dfs(pair.node);
			anim_array.push(["done",pair.node]);
			context_array.push(`marking ${pair.node.id} as done`);
			anim_array.push(["return",node]);
			context_array.push(`returning to ${node.id}`);
		}
	}
}

function play_dfs(stage,anim_array)
{
	if (stage === anim_array.length)
	{
		return;
	}
	current_stage = stage;
	change_anim_position(stage);
	perform_dfs(stage,anim_array);
	function sleep (time) {
  		return new Promise((resolve) => current_timer = setTimeout(resolve, time));
	}


	sleep(delay * 1000).then(() => 
	{
	    play_dfs(stage+1,anim_array);
	});
}


function perform_dfs_fast_back(stage,anim_array)
{
	if (stage+1 === anim_array.length)
	{
		return;
	}
	context_label.textContent = context_array[stage];
	if (anim_array[stage+1][0] === "start")
	{
		anim_array[stage+1][1].style.removeProperty("background-color");
	}
	else if (anim_array[stage+1][0] === "go")
	{
		anim_array[stage+1-1][1].style["background-color"] = "yellow";
		anim_array[stage+1][1].style.removeProperty("background-color");
		anim_array[stage+1-1][1].connections[anim_array[stage+1][1].id].line.style.removeProperty("stroke");
	}
	else if (anim_array[stage+1][0] === "done")
	{
		anim_array[stage+1][1].style["background-color"] = "yellow";
	}
	else if (anim_array[stage+1][0] === "return")
	{
		anim_array[stage+1][1].style["background-color"] = "green";
		anim_array[stage+1][1].connections[anim_array[stage+1-1][1].id].line.style["stroke"] = "blue";
	}
}


function perform_dfs_fast(stage,anim_array)
{
	if (stage === -1)
	{
		return;
	}
	context_label.textContent = context_array[stage];
	if (anim_array[stage][0] === "start")
	{
		anim_array[stage][1].style["background-color"] = "yellow";
	}
	else if (anim_array[stage][0] === "go")
	{	
		anim_array[stage-1][1].style["background-color"] = "green";
		anim_array[stage][1].style["background-color"] = "yellow";
		anim_array[stage-1][1].connections[anim_array[stage][1].id].line.style["stroke"] = "blue";	
	}
	else if (anim_array[stage][0] === "done")
	{
		anim_array[stage][1].style["background-color"] = "blue";
	}
	else if (anim_array[stage][0] === "return")
	{
		anim_array[stage][1].style["background-color"] = "yellow";
		anim_array[stage][1].connections[anim_array[stage-1][1].id].line.style["stroke"] = "green";
	}
}

function perform_dfs(stage,anim_array)
{
	stage = Number(stage);
	if (stage === -1)
	{
		return;
	}
	context_label.textContent = context_array[stage];
	if (anim_array[stage][0] === "start")
	{
		animate_property(anim_array[stage][1],"background-color","yellow",(delay*transition_factor) * 1000,true);
	}
	else if (anim_array[stage][0] === "go")
	{	
		center_node(anim_array[stage][1],(delay*transition_factor) * 1000);
		animate_property(anim_array[stage-1][1],"background-color","green",(delay*transition_factor) * 1000,true);
		animate_property(anim_array[stage][1],"background-color","yellow",(delay*transition_factor) * 1000,true);
		animate_property(anim_array[stage-1][1].connections[anim_array[stage][1].id].line,"stroke","blue",(delay*transition_factor) * 1000,true);
		
	}
	else if (anim_array[stage][0] === "done")
	{
		animate_property(anim_array[stage][1],"background-color","blue",(delay*transition_factor) * 1000,true);
	}
	else if (anim_array[stage][0] === "return")
	{
		center_node(anim_array[stage][1],(delay*transition_factor) * 1000);
		animate_property(anim_array[stage][1],"background-color","yellow",(delay*transition_factor) * 1000,true);
		animate_property(anim_array[stage][1].connections[anim_array[stage-1][1].id].line,"stroke","green",(delay*transition_factor) * 1000,true);
	}
}