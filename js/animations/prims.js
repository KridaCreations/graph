var previous_connected_node = {};


function bake_prims()
{
	if (foccused_node === null)
	{
		alert("please choose a starting node\nyou can do this by foccusing on the start node ");
		return;
	}
	recolor_graph();
	for(node in document.nodes)
	{
		distance[document.nodes] = null;
	}
	closest_node[foccused_node.id] = null;
	anim_array.push(["add",foccused_node,0]);
	distance[foccused_node.id] = 0;
	visited_node[foccused_node.id] = 1;
	heap.push(foccused_node.id,0);
	prims();
	baked_animation = 3;
	anim_position.max = anim_array.length-1;
	current_stage = -1;
	scroll_box_heap.style.visibility = 'visible';
	change_anim_position(current_stage);
	show_dis();
}

function play_prims (stage,anim_array) 
{
	if (stage === anim_array.length)
	{
		return;
	}
	current_stage = stage;
	change_anim_position(stage);
	perform_prims(stage,anim_array);
	function sleep (time) {
  		return new Promise((resolve) => current_timer = setTimeout(resolve, time));
	}
	sleep(delay * 1000).then(() => 
	{
	    play_prims(stage+1,anim_array);
	});
}

function change_to_anim_stage_prims(stage)
{
	var pre_stage = current_stage;
	if ((pre_stage < stage) && (stage < anim_array.length))
	{
		for(i = pre_stage+1;i <= stage;i++)
		{
			perform_prims_fast(i,anim_array);	
		}
		current_stage = stage;
	}
	else if ((pre_stage > stage) && (stage >= -1))
	{
		for(i = pre_stage-1;i >= stage;i--)
		{
			perform_prims_fast_back(i,anim_array);
		}
		current_stage = stage;
	}

}
function perform_prims_fast(stage,anim_array)
{

	stage = Number(stage);
	if (stage === -1) 
	{
		return;
	}
	if (anim_array[stage][0] === "add") 
	{
		if (!(stage === 0))
		{
			var line = anim_array[stage][3].connections[anim_array[stage][1].id].line;
			line.style.stroke = "yellow";
		}
		anim_array[stage][1].children[0].children[0].children[1].textContent = anim_array[stage][2];
		scroll_heap.push_at_last(anim_array[stage][1].id,anim_array[stage][2]);
	}
	else if (anim_array[stage][0] === "remove") 
	{
		scroll_heap.delete_from_top_fast()
	}
	else if (anim_array[stage][0] === "go") 
	{
		anim_array[stage-1][1].style["background-color"] = "green";
		anim_array[stage][1].style["background-color"] = "yellow";
		anim_array[stage-1][1].connections[anim_array[stage][1].id].line.style["stroke"] = "blue";
	}
	else if (anim_array[stage][0] === "return")
	{
		anim_array[stage-1][1].style["background-color"] = "green";
		anim_array[stage][1].style["background-color"] = "yellow";
		if (!(anim_array[stage][1].connections[anim_array[stage-1][1].id].line.style["stroke"] === "yellow"))
		{
			anim_array[stage][1].connections[anim_array[stage-1][1].id].line.style["stroke"] = "green";
		}
	}
	else if (anim_array[stage][0] === "done")
	{
		anim_array[stage][1].style["background-color"] = "blue";
	}
	else if (anim_array[stage][0] === "jump") 
	{
		scroll_heap.bubble_changes.push([["bubble_down"]]);
		scroll_heap.bubble_down(0);
		anim_array[stage][1].style["background-color"] = "yellow";	
	}
	else if (anim_array[stage][0] === "appear") 
	{
		detail_tag.style.transform = "scale(0)";
		detail_tag.children[0].style.transform = "scale(0)";
		detail_tag.children[1].style.transform = "scale(0)";
		detail_tag.style.left = `${((anim_array[stage][1].pos.left+25)*scale)+g_pos.left}px`;
		detail_tag.style.top = `${(anim_array[stage][1].pos.top*scale)+g_pos.top}px`;
		detail_tag.style["transform"] = "scale(1)";
	}
	else if (anim_array[stage][0] === "add_pre_dis") 
	{
		detail_tag.children[0].style.transform = "scale(0)";
		detail_tag.children[0].children[1].textContent = anim_array[stage][2];
		detail_tag.children[0].style["transform"] = "scale(1)";
	}
	else if (anim_array[stage][0] === "add_new_dis") 
	{
		detail_tag.children[1].style.transform = "scale(0)";
		detail_tag.children[1].children[1].textContent = anim_array[stage][2];
		detail_tag.children[1].style["transform"] = "scale(1)";
	}
	else if (anim_array[stage][0] === "solve") 
	{
		if (anim_array[stage][2] === "new_dis")
		{
			detail_tag.children[0].style.transform = "scale(0)";
		}
		else
		{
			detail_tag.children[1].style.transform = "scale(0)";
		}
	}
	else if (anim_array[stage][0] === "change")
	{
		var line = anim_array[stage][5].connections[anim_array[stage][1].id].line;
		line.style.stroke = "green";

		var line = anim_array[stage][6].connections[anim_array[stage][1].id].line;
		line.style.stroke = "yellow";

		scroll_heap.change_value_fast(anim_array[stage][1].id,anim_array[stage][2]);
		anim_array[stage][1].children[0].children[0].children[1].textContent = anim_array[stage][2];
	}
	else if (anim_array[stage][0] === "disappear")
	{
		if (anim_array[stage-1][0] === "add")
		{
			scroll_heap.bubble_changes.push([["bubble_up"]]);
			scroll_heap.bubble_up(scroll_heap.position[anim_array[stage-1][1].id]);
		}
		else if(anim_array[stage-1][0] === "change")
		{
			scroll_heap.bubble_changes.push([["bubble_up"]]);
			scroll_heap.bubble_up(scroll_heap.position[anim_array[stage-1][1].id])
		}

		detail_tag.style.transform = "scale(1)";
		detail_tag.style["transform"] = "scale(0)";
	}
}
function perform_prims_fast_back(stage,anim_array)
{
	
	if (stage+1 === anim_array.length)
	{
		return;
	}
	if (anim_array[stage+1][0] === "add")
	{
		if (!(stage+1 === 0))
		{
			var line = anim_array[stage+1][3].connections[anim_array[stage+1][1].id].line;
			line.style.stroke = "blue";
			// animate_property(line,"stroke","blue",(delay*transition_factor) * 1000,true);
		}

		anim_array[stage+1][1].children[0].children[0].children[1].textContent = "Inf";
		scroll_heap.delete_from_last();
	}
	else if (anim_array[stage+1][0] === "remove") 
	{
		var new_scroll_element = document.createElement("div");
        new_scroll_element.className = "scroll_box__heap_element";
        var new_scroll_element_name = document.createElement("div");
        new_scroll_element_name.className = "scroll_box__heap_element_name";
        new_scroll_element_name.textContent = anim_array[stage+1][1].id;
        var new_scroll_element_value = document.createElement("div");
        new_scroll_element_value.className = "scroll_box__heap_element_value";
        new_scroll_element_value.textContent = anim_array[stage+1][2];
        scroll_heap.scroll_box.append(new_scroll_element)
        new_scroll_element.append(new_scroll_element_name);
        new_scroll_element.append(new_scroll_element_value);
        scroll_heap.items.push({"node":anim_array[stage+1][1].id,"value":anim_array[stage+1][2]})
        scroll_heap.position[anim_array[stage+1][1].id] = scroll_heap.size()-1;
        scroll_heap.swap(0,scroll_heap.size()-1);
        if(scroll_heap.scroll_box.childElementCount >= 7)
        {
            scroll_heap.scroll_box.scrollTop = (scroll_heap.scroll_box.childElementCount-7+1)*40;
        }
	}
	else if (anim_array[stage+1][0] === "go") {
		anim_array[stage+1-1][1].style["background-color"] = "yellow";
		anim_array[stage+1][1].style.removeProperty("background-color");
		anim_array[stage+1-1][1].connections[anim_array[stage+1][1].id].line.style.removeProperty("stroke");
	}
	else if (anim_array[stage+1][0] === "return")
	{
		scroll_heap.scroll_box.firstElementChild.style["background-color"] = "lightseagreen";
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
		scroll_heap.reverse_bubble_change();
		scroll_heap.scroll_box.scrollTop = 0;
		if (stage === 0) {
			anim_array[stage+1][1].style["background-color"] = "palevioletred";
		}
		else
		{
			anim_array[stage+1][1].style["background-color"] = "green";
		}	
	}
	else if (anim_array[stage+1][0] === "appear") 
	{
		detail_tag.style.transform = "scale(0)";
		detail_tag.children[0].style.transform = "scale(0)";
		detail_tag.children[1].style.transform = "scale(0)";
	}
	else if (anim_array[stage+1][0] === "add_pre_dis") 
	{
		detail_tag.children[0].style.transform = "scale(0)";
	}
	else if (anim_array[stage+1][0] === "add_new_dis") 
	{
		detail_tag.children[1].style.transform = "scale(0)";
	}
	else if (anim_array[stage+1][0] === "solve") 
	{
		if (anim_array[stage+1][2] === "new_dis")
		{
			detail_tag.children[0].style.transform = "scale(1)";
		}
		else
		{
			detail_tag.children[1].style.transform = "scale(1)";
		}
	}
	else if (anim_array[stage+1][0] === "change")
	{
		//newly added
		var line = anim_array[stage+1][5].connections[anim_array[stage+1][1].id].line;
		line.style.stroke = "yellow";

		line = anim_array[stage+1][6].connections[anim_array[stage+1][1].id].line;
		line.style.stroke = "blue";

		anim_array[stage+1][1].children[0].children[0].children[1].textContent = anim_array[stage+1][4];
		scroll_heap.change_value_fast(anim_array[stage+1][1].id,anim_array[stage+1][4]);
	}
	else if (anim_array[stage+1][0] === "disappear")
	{
		if (anim_array[stage][0] === "add")
		{
			scroll_heap.reverse_bubble_change();				
		}
		else if(anim_array[stage][0] === "change")
		{
			scroll_heap.reverse_bubble_change();
		}

		detail_tag.style.left = `${((anim_array[stage+1][1].pos.left+25)*scale)+g_pos.left}px`;
		detail_tag.style.top = `${(anim_array[stage+1][1].pos.top*scale)+g_pos.top}px`;+1
		detail_tag.style["transform"] = "scale(1)";
	}
}


function perform_prims (stage,anim_array) 
{
	stage = Number(stage);
	if (stage === -1)
	{
		return;
	}
	if (anim_array[stage][0] === "add")
	{
		if (!(stage === 0))
		{
			var line = anim_array[stage][3].connections[anim_array[stage][1].id].line;
			animate_property(line,"stroke","yellow",(delay*transition_factor) * 1000,true);
		}
		anim_array[stage][1].children[0].children[0].children[1].textContent = anim_array[stage][2];
		scroll_heap.push_without_bubble_up(anim_array[stage][1].id,anim_array[stage][2]);
	}
	else if (anim_array[stage][0] === "remove") 
	{
		scroll_heap.delete_without_bubble_down();
	}
	else if (anim_array[stage][0] === "go") 
	{
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
		if (!(anim_array[stage][1].connections[anim_array[stage-1][1].id].line.style["stroke"] === "yellow"))
		{
			animate_property(anim_array[stage][1].connections[anim_array[stage-1][1].id].line,"stroke","green",(delay*transition_factor) * 1000,true);
		}
	}
	else if (anim_array[stage][0] === "done")
	{
		animate_property(anim_array[stage][1],"background-color","blue",(delay*transition_factor) * 1000,true);
	}
	else if (anim_array[stage][0] === "jump") 
	{
		center_node(anim_array[stage][1],(delay*transition_factor) * 1000);
		scroll_heap.bubble_changes.push([["bubble_down"]]);
		scroll_heap.bubble_down(0);
		animate_property(anim_array[stage][1],"background-color","yellow",(delay*transition_factor) * 1000,true);	
	}
	else if (anim_array[stage][0] === "appear") 
	{
		center_node(anim_array[stage][1],(delay*transition_factor) * 1000);
		detail_tag.style.transform = "scale(0)";
		detail_tag.children[0].style.transform = "scale(0)";
		detail_tag.children[1].style.transform = "scale(0)";
		detail_tag.style.left = `${((anim_array[stage][1].pos.left+25)*scale)+g_pos.left}px`;
		detail_tag.style.top = `${(anim_array[stage][1].pos.top*scale)+g_pos.top}px`;
		animate_property(detail_tag,"transform","scale(1)",(delay*transition_factor) * 1000,true);
	}
	else if (anim_array[stage][0] === "add_pre_dis") 
	{
		detail_tag.children[0].style.transform = "scale(0)";
		detail_tag.children[0].children[1].textContent = anim_array[stage][2];
		animate_property(detail_tag.children[0],"transform","scale(1)",(delay*transition_factor) * 1000,true);
	}
	else if (anim_array[stage][0] === "add_new_dis") 
	{
		detail_tag.children[1].style.transform = "scale(0)";
		detail_tag.children[1].children[1].textContent = anim_array[stage][2];
		animate_property(detail_tag.children[1],"transform","scale(1)",(delay*transition_factor) * 1000,true);
	}
	else if (anim_array[stage][0] === "solve") 
	{
		if (anim_array[stage][2] === "new_dis")
		{
			detail_tag.children[0].style.transform = "scale(0)";
		}
		else
		{
			detail_tag.children[1].style.transform = "scale(0)";
		}
	}
	else if (anim_array[stage][0] === "change")
	{
		var line = anim_array[stage][5].connections[anim_array[stage][1].id].line;
		line.style.stroke = "green";

		line = anim_array[stage][6].connections[anim_array[stage][1].id].line;
		animate_property(line,"stroke","yellow",(delay*transition_factor) * 1000,true);

		anim_array[stage][1].children[0].children[0].children[1].textContent = anim_array[stage][2];
		scroll_heap.change_value_without_bubble_down(anim_array[stage][1].id,anim_array[stage][2]);
	}
	else if (anim_array[stage][0] === "disappear")
	{
		center_node(anim_array[stage][1],(delay*transition_factor) * 1000);
		if (anim_array[stage-1][0] === "add")
		{
			scroll_heap.bubble_changes.push([["bubble_up"]]);
			scroll_heap.bubble_up(scroll_heap.position[anim_array[stage-1][1].id]);
		}
		else if(anim_array[stage-1][0] === "change")
		{
			scroll_heap.bubble_changes.push([["bubble_up"]]);
			scroll_heap.bubble_up(scroll_heap.position[anim_array[stage-1][1].id])
		}

		detail_tag.style.transform = "scale(1)";
		animate_property(detail_tag,"transform","scale(0)",(delay*transition_factor) * 1000,true);
	}
}

function prims (node) 
{
	while (!heap.isempty()) 
	{	
		var node = heap.peek();
		node = document.nodes[node];
		heap.pop();
		anim_array.push(["remove",node,distance[node.id]]);
		anim_array.push(["jump",node]);
		for(nodes in node.connections)
		{
			var pair = node.connections[nodes];
			if (!(visited_node[pair.node.id] === 1)) 
			{
				var curr_dis = distance[pair.node.id];
				var new_dis = find_length(node,node.connections[nodes].node); //+distance[node.id];
				anim_array.push(["go",pair.node]);
				anim_array.push(["appear",pair.node]);
				if (curr_dis === undefined) {
					anim_array.push(["add_pre_dis",pair.node,"∞"]);
				}
				else
				{
					anim_array.push(["add_pre_dis",pair.node,curr_dis]);
				}
				
				anim_array.push(["add_new_dis",pair.node,new_dis]);
				if (curr_dis === undefined)
				{
					distance[pair.node.id] = new_dis;
					anim_array.push(["solve",pair.node,"new_dis"]);
					heap.push(pair.node.id,new_dis);
					closest_node[pair.node.id] = node;
					previous_connected_node[pair.node.id] = node;
					anim_array.push(["add",pair.node,new_dis,node]);
				}
				else if (curr_dis > new_dis)
				{
					distance[pair.node.id] = new_dis;
					anim_array.push(["solve",pair.node,"new_dis"]);
					heap.change_value(pair.node.id,new_dis);
					closest_node[pair.node.id] = node;
					anim_array.push(["change",pair.node,new_dis,heap.get_position(pair.node.id),curr_dis,previous_connected_node[pair.node.id],node]);
					previous_connected_node[pair.node.id] = node;
				}
				else
				{
					anim_array.push(["solve",pair.node,"curr_dis"]);
				}
				anim_array.push(["disappear",pair.node]);
				anim_array.push(["return",node]);
			}
		}
		visited_node[node.id] = 1;		
		anim_array.push(["done",node]);
	}	
}


