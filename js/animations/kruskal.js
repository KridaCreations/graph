var line_array = [];
var colored_nodes = {};
var set = new Sets();
var sort_array = function(a,b)
{
	return (a[1]-b[1]);
}

function bake_kruskal()
{
	recolor_graph();
	kruskal();
	baked_animation = 4;
	anim_position.max = anim_array.length-1;
	current_stage = -1;
	change_anim_position(current_stage);
}

function play_kruskal (stage,anim_array) 
{
	if (stage === anim_array.length)
	{
		return;
	}
	current_stage = stage;
	change_anim_position(stage);
	perform_kruskal(stage,anim_array);
	function sleep (time) {
  		return new Promise((resolve) => current_timer = setTimeout(resolve, time));
	}
	sleep(delay * 1000).then(() => 
	{
	    play_kruskal(stage+1,anim_array);
	});
}

function change_to_anim_stage_kruskal(stage)
{
	var pre_stage = current_stage;
	if ((pre_stage < stage) && (stage < anim_array.length))
	{
		for(i = pre_stage+1;i <= stage;i++)
		{
			perform_kruskal_fast(i,anim_array);	
		}
		current_stage = stage;
	}
	else if ((pre_stage > stage) && (stage >= -1))
	{
		for(i = pre_stage-1;i >= stage;i--)
		{
			perform_kruskal_fast_back(i,anim_array);
		}
		current_stage = stage;
	}

}

function  perform_kruskal(stage,anim_array)
{
	stage = Number(stage);
	if (stage === -1)
	{
		return;
	}
	if(anim_array[stage][0] === "go")
	{
		// center_node(anim_array[stage][0],(delay*transition_factor) * 1000);
		animate_property(anim_array[stage][1],"stroke","yellow",(delay*transition_factor) * 1000,true);
	}
	else if (anim_array[stage][0] === "invalid")
	{
		animate_property(anim_array[stage][1],"stroke","red",(delay*transition_factor) * 1000,true);
	}
	if (anim_array[stage][0] === "valid")
	{
		animate_property(anim_array[stage][1],"stroke","green",(delay*transition_factor) * 1000,true);
		for(var i = 0;i < anim_array[stage][2].length;i++)
		{
			animate_property(anim_array[stage][2][i],"background-color","green",(delay*transition_factor) * 1000,true);
		}
	}
}

function perform_kruskal_fast_back(stage,anim_array)
{
	
	if (stage+1 === anim_array.length)
	{
		return;
	}
	if (anim_array[stage+1][0] === "go")
	{
		anim_array[stage+1][1].style.removeProperty("stroke");
	}
	else if (anim_array[stage+1][0] === "invalid") 
	{
		anim_array[stage+1][1].style.stroke = "yellow";	
	}
	else if (anim_array[stage+1][0] === "valid")
	{
		anim_array[stage+1][1].style.stroke = "yellow";
		for(var i = 0;i < anim_array[stage+1][2].length;i++)
		{
			anim_array[stage+1][2][i].style.removeProperty("background-color");
		}
	}
}

function perform_kruskal_fast(stage,anim_array)
{
	stage = Number(stage);
	if (stage === -1) 
	{
		return;
	}
	if(anim_array[stage][0] === "go")
	{
		anim_array[stage][1].style.stroke = "yellow";
	}
	else if (anim_array[stage][0] === "invalid") 
	{
		anim_array[stage][1].style.stroke = "red";	
	}
	else if (anim_array[stage][0] === "valid")
	{
		anim_array[stage][1].style.stroke = "green";
		for(var i = 0;i < anim_array[stage][2].length;i++)
		{
			anim_array[stage][2][i].style["background-color"] = "green";
		}
	}
}

function get_line_array (container) 
{
 	for(var i = 0;i<container.length;i++)
 	{ 		
 		if (container[i].nodeName === "line")
 		{
	 		if (container[i].detail.weight === null)
	 		{	
	 			line_array.push([container[i],1]);
	 		}
	 		else
	 		{
	 			line_array.push([container[i],container[i].detail.weight])
	 		}
 		}
 	}
}

function kruskal (argument) 
{
	get_line_array(draw_area_container.children[0].children);
	line_array.sort(sort_array);
	// console.log(line_array);
	for(nodes in document.nodes)
	{
		set.make_set(nodes);
	}
	for(lines in line_array)
	{
		anim_array.push(["go",line_array[lines][0]]);
		var from = (line_array[lines][0]).detail.start; 
		var to = (line_array[lines][0]).detail.end;
		if(set.find_set(from.id) === set.find_set(to.id))
		{
			anim_array.push(["invalid",line_array[lines][0]])
			continue;
		}
		else
		{
			var parent_from = set.find_set(from.id);
			var parent_to = set.find_set(to.id);
			var res = set.union_sets(from.id,to.id);
			var new_element = [];
			if (!(colored_nodes[from.id] === 1))
			{
				colored_nodes[from.id] = 1;
				new_element.push(from);
			}
			if (!(colored_nodes[to.id] === 1))
			{
				colored_nodes[to.id] = 1;
				new_element.push(to);
			}
			anim_array.push(["valid",line_array[lines][0],new_element])
		}
	}
	// for(nodes in document.nodes)
	// {
		// console.log(set.find_set(nodes));
	// }
}