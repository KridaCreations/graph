// console.log(isShapeDetectionApiSupported());

var queue = new Queue();
function bake_bfs()
{
	// recolor_graph();
	if (foccused_node === null)
	{
		alert("please choose a starting node\nyou can do this by foccusing on the start node ");
		return;
	}
	recolor_graph();
	queue.clear();
	clearArray(anim_array);
	clearObject(visited_node);
	anim_array.push(["add",foccused_node]);
	context_array.push(`added ${foccused_node.id} to the QUEUE`);
	visited_node[foccused_node.id] = 1;
	queue.enqueue(foccused_node);
	bfs();
	baked_animation = 1
	// console.log(anim_array);
	scroll_box.style.visibility = 'visible';
	anim_position.max = anim_array.length-1;
	current_stage = -1;
	change_anim_position(current_stage);
}

function change_to_anim_stage_bfs(stage)
{
	var pre_stage = current_stage;
	if ((pre_stage < stage) && (stage < anim_array.length))
	{
		for(i = pre_stage+1;i <= stage;i++)
		{
			perform_bfs_fast(i,anim_array);	
		}
		current_stage = stage;
	}
	else if ((pre_stage > stage) && (stage >= -1))
	{
		for(i = pre_stage-1;i >= stage;i--)
		{
			perform_bfs_fast_back(i,anim_array);
		}
		current_stage = stage;
	}

}

function bfs(node)
{
	while(!queue.isEmpty())
	{
		var node = queue.front();
		anim_array.push(["jump",node]);
		context_array.push(`went to ${node.id}`);
		for (nodes in node.connections )
		{
			var pair = node.connections[nodes];
			if (!(visited_node[pair.node.id] === 1)) {
				anim_array.push(["go",pair.node]);
				context_array.push(`went to ${pair.node.id}`);
				anim_array.push(["add",pair.node]);
				context_array.push(`added ${pair.node.id} to QUEUE`);
				queue.enqueue(pair.node);
				visited_node[pair.node.id] = 1;
				anim_array.push(["return",node]);
				context_array.push(`returned to ${node.id}`);
			}
		}
		queue.dequeue();
		anim_array.push(["remove",node]);
		context_array.push(`removed ${node.id} from Queue`);
		anim_array.push(["done",node]);
		context_array.push(`marked ${node.id} as done`);
	}
}

function play_bfs(stage,anim_array)
{
	if (stage === anim_array.length)
	{
		return;
	}
	current_stage = stage;
	change_anim_position(stage);
	perform_bfs(stage,anim_array);
	function sleep (time) {
  		return new Promise((resolve) => current_timer = setTimeout(resolve, time));
	}
	sleep(delay * 1000).then(() => 
	{
	    play_bfs(stage+1,anim_array);
	});
}
function perform_bfs(stage,anim_array)
{
	stage = Number(stage);
	if (stage === -1)
	{
		return;
	}
	context_label.textContent = context_array[stage];
	if (anim_array[stage][0] === "add")
	{
		add_node_func(anim_array[stage][1].id);
	}
	else if (anim_array[stage][0] === "remove") 
	{
		delete_node_func("nothing");
	}
	else if (anim_array[stage][0] === "go") {
		center_node(anim_array[stage][1],(delay*transition_factor) * 1000);
		animate_property(anim_array[stage-1][1],"background-color","green",(delay*transition_factor) * 1000,true);
		animate_property(anim_array[stage][1],"background-color","yellow",(delay*transition_factor) * 1000,true);
		animate_property(anim_array[stage-1][1].connections[anim_array[stage][1].id].line,"stroke","blue",(delay*transition_factor) * 1000,true);
	}
	else if (anim_array[stage][0] === "return")
	{
		center_node(anim_array[stage][1],(delay*transition_factor) * 1000);
		animate_property(anim_array[stage-1][1],"background-color","green",(delay*transition_factor) * 1000,true);
		animate_property(anim_array[stage][1],"background-color","yellow",(delay*transition_factor) * 1000,true);
		animate_property(anim_array[stage][1].connections[anim_array[stage-1][1].id].line,"stroke","green",(delay*transition_factor) * 1000,true);
	}
	else if (anim_array[stage][0] === "done")
	{
		animate_property(anim_array[stage][1],"background-color","blue",(delay*transition_factor) * 1000,true);
	}
	else if (anim_array[stage][0] === "jump") 
	{
		center_node(anim_array[stage][1],(delay*transition_factor) * 1000);
		animate_property(scroll_box.firstElementChild,"background-color","lightseagreen",(delay*transition_factor) * 1000,true);
		animate_property(anim_array[stage][1],"background-color","yellow",(delay*transition_factor) * 1000,true);	
	}
}

function perform_bfs_fast(stage,anim_array)
{
	if (stage === -1)
	{
		return;
	}
	context_label.textContent = context_array[stage];
	if (anim_array[stage][0] === "add")
	{
		var new_div = document.createElement("div");
		new_div.className = "scroll_box_element";
		new_div.id = anim_array[stage][1].id;
		new_div.textContent = anim_array[stage][1].id;
		scroll_box.append(new_div);
		if(scroll_box.childElementCount >= 7)
		{
			scroll_box.scrollTop = (scroll_box.childElementCount-7+1)*40;
		}
	}
	else if (anim_array[stage][0] === "remove") 
	{
		scroll_box.scrollTop = 0;
		scroll_box.firstElementChild.remove();
	}
	else if (anim_array[stage][0] === "go") {
		anim_array[stage-1][1].style["background-color"] = "green";
		anim_array[stage][1].style["background-color"] = "yellow";
		anim_array[stage-1][1].connections[anim_array[stage][1].id].line.style["stroke"] = "blue";
	}
	else if (anim_array[stage][0] === "return")
	{
		anim_array[stage-1][1].style["background-color"] = "green";
		anim_array[stage][1].style["background-color"] = "yellow";
		anim_array[stage][1].connections[anim_array[stage-1][1].id].line.style["stroke"] = "green";
	}
	else if (anim_array[stage][0] === "done")
	{
		anim_array[stage][1].style["background-color"] = "blue";
	}
	else if (anim_array[stage][0] === "jump") 
	{
		scroll_box.firstElementChild.style["background-color"] = "lightseagreen";
		anim_array[stage][1].style["background-color"] = "yellow";
	}
}
function perform_bfs_fast_back(stage,anim_array)
{
	if (stage+1 === anim_array.length)
	{
		return;
	}
	context_label.textContent = context_array[stage];
	if (anim_array[stage+1][0] === "add")
	{
		scroll_box.scrollTop = 0;
		scroll_box.lastElementChild.remove();
	}
	else if (anim_array[stage+1][0] === "remove") 
	{
		
		var new_div = document.createElement("div");
		new_div.className = "scroll_box_element";
		new_div.id = anim_array[stage+1][1].id;
		new_div.textContent = anim_array[stage+1][1].id;
		// scroll_box.append(new_div);
		scroll_box.prepend(new_div)
		scroll_box.firstElementChild.style["background-color"] = "lightseagreen";
		if(scroll_box.childElementCount >= 7)
		{
			scroll_box.scrollTop = (scroll_box.childElementCount-7+1)*40;
		}
	}
	else if (anim_array[stage+1][0] === "go") {
		scroll_box.firstElementChild.style["background-color"] = "lightseagreen";
		anim_array[stage+1-1][1].style["background-color"] = "yellow";
		anim_array[stage+1][1].style.removeProperty("background-color");
		anim_array[stage+1-1][1].connections[anim_array[stage+1][1].id].line.style.removeProperty("stroke");
	}
	else if (anim_array[stage+1][0] === "return")
	{
		scroll_box.firstElementChild.style["background-color"] = "lightseagreen";
		anim_array[stage][1].style["background-color"] = "yellow";
		anim_array[stage+1][1].style["background-color"] = "green";
		anim_array[stage+1][1].connections[anim_array[stage+1-1][1].id].line.style["stroke"] = "blue";
	}
	else if (anim_array[stage+1][0] === "done")
	{
		anim_array[stage+1][1].style["background-color"] = "yellow";
	}
	else if (anim_array[stage+1][0] === "jump") 
	{
		scroll_box.firstElementChild.style["background-color"] = 'palevioletred';
		scroll_box.scrollTop = 0;
		if (stage === 0) {
			anim_array[stage+1][1].style["background-color"] = "palevioletred";
		}
		else
		{
			anim_array[stage+1][1].style["background-color"] = "green";
		}	
	}
}




