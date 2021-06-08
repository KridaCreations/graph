function bake_dfs()
{
	if (foccused_node === null)
	{
		return;
	}
	visited_node[foccused_node.id] = 1;
	anim_array.push(["start",foccused_node]);
	dfs(foccused_node);
	anim_array.push(["done",foccused_node]);
	baked_animation = 0;
	for(command in anim_array)
	{
		console.log(anim_array[command]);
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
			dfs(pair.node);
			anim_array.push(["done",pair.node]);
			anim_array.push(["return",node]);
		}
	}
}

function play_dfs(stage,anim_array)
{
	console.log("stage "+ stage+ " playing after " + (delay*1000));
	if (stage === anim_array.length)
	{
		return;
	}
	perform(stage,anim_array);
	function sleep (time) {
  		return new Promise((resolve) => setTimeout(resolve, time));
	}

	// Usage!
	sleep(delay * 1000).then(() => {
	    play_dfs(stage+1,anim_array);
	});
}


function perform(stage,anim_array)
{
	if (anim_array[stage][0] === "start")
	{
		animate_property(anim_array[stage][1],"background-color","yellow",(delay*transition_factor) * 1000,true);
	}
	else if (anim_array[stage][0] === "go")
	{	
		animate_property(anim_array[stage-1][1],"background-color","green",(delay*transition_factor) * 1000,true);
		animate_property(anim_array[stage][1],"background-color","yellow",(delay*transition_factor) * 1000,true);
		animate_property(anim_array[stage-1][1].connections[anim_array[stage][1].id].line,"stroke","blue",(delay*transition_factor) * 1000,true);
		animate_property(anim_array[stage-1][1].connections[anim_array[stage][1].id].line,"stroke-width",8,(delay*transition_factor) * 1000,true);
		
	}
	else if (anim_array[stage][0] === "done")
	{
		animate_property(anim_array[stage][1],"background-color","blue",(delay*transition_factor) * 1000,true);
	}
	else if (anim_array[stage][0] === "return")
	{
		animate_property(anim_array[stage][1],"background-color","yellow",(delay*transition_factor) * 1000,true);
		animate_property(anim_array[stage][1].connections[anim_array[stage-1][1].id].line,"stroke","green",(delay*transition_factor) * 1000,true);
		animate_property(anim_array[stage][1].connections[anim_array[stage-1][1].id].line,"stroke-width",8,(delay*transition_factor) * 1000,true);
	}
}