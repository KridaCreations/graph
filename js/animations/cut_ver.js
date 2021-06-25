var cut_points = {};
var done_nodes = {};
var time = {};
var low = {};
var pre_time = 0;


function bake_cut_ver()
{
	if (foccused_node === null)
	{
		alert("please choose a starting node\nyou can do this by foccusing on the start node ");
		return;
	}
	console.log("here");
	recolor_graph();
	heap.empty();
	clearObject(closest_node);
	clearArray(anim_array);
	clearObject(visited_node);
	clearObject(distance);
	clearArray(line_array);
	clearObject(colored_nodes);
	clearObject(time);
	clearObject(low);
	clearObject(done_nodes);
	pre_time = 0;
	set.empty();
	visited_node[foccused_node.id] = 1;
	time[foccused_node.id] = pre_time;
	low[foccused_node.id] = pre_time;
	anim_array.push(["jump",foccused_node,pre_time]);
	pre_time += 1;
	dfstree(foccused_node,null);
	done_nodes[foccused_node.id] = 1;
	anim_array.push(["done",foccused_node]);
	
	for(nodes1 in document.nodes)
	{
		if(!(visited_node[nodes1] === 1))
		{
			visited_node[nodes1] = 1;
			time[nodes1] = pre_time;
			low[nodes1] = pre_time;
			pre_time += 1;
			console.log(nodes1);
			console.log(document.nodes[nodes1]);
			anim_array.push(["jump",document.nodes[nodes1],pre_time]);
			dfstree(document.nodes[nodes1],null);
			done_nodes[nodes1] = 1;
			console.log(nodes1);
			console.log(document.nodes[nodes1]);
	 		anim_array.push(["done",document.nodes[nodes1]]);
		}
	}
	console.log(anim_array);
	baked_animation = 5;
	anim_position.max = anim_array.length-1;
	current_stage = -1;
	change_anim_position(current_stage);
	show_dis_cut();
}

function play_dfstree(stage,anim_array)
{
	if (stage === anim_array.length)
	{
		return;
	}
	current_stage = stage;
	change_anim_position(stage);
	perform_dfstree(stage,anim_array);
	function sleep (time) {
  		return new Promise((resolve) => current_timer = setTimeout(resolve, time));
	}


	sleep(delay * 1000).then(() => 
	{
	    play_dfstree(stage+1,anim_array);
	});
}

function change_to_anim_stage_dfstree(stage)
{
	var pre_stage = current_stage;
	if ((pre_stage < stage) && (stage < anim_array.length))
	{
		for(i = pre_stage+1;i <= stage;i++)
		{
			perform_dfstree_fast(i,anim_array);	
		}
		current_stage = stage;
	}
	else if ((pre_stage > stage) && (stage >= -1))
	{
		for(i = pre_stage-1;i >= stage;i--)
		{
			perform_dfstree_fast_back(i,anim_array);
		}
		current_stage = stage;
	}

}

function perform_dfstree_fast_back(stage,anim_array)
{
	
	if (stage+1 === anim_array.length)
	{
		return;
	}
	if (anim_array[stage+1][0] === "jump")
	{
		anim_array[stage+1][1].style["background-color"] = "palevioletred";		
	}
	else if (anim_array[stage+1][0] === "go") 
	{
		anim_array[stage+1-1][1].style["background-color"] = "yellow";
		anim_array[stage+1][1].style.removeProperty("background-color");
		anim_array[stage+1-1][1].connections[anim_array[stage+1][1].id].line.style.removeProperty("stroke");
		anim_array[stage+1][1].cut_ver_detail.time_value_tab.textContent = "";
	}
	else if (anim_array[stage+1][0] === "backedge") {
		anim_array[stage+1-1][1].connections[anim_array[stage+1][1].id].line.style.removeProperty("stroke");
	}
	else if (anim_array[stage+1][0] === "done") 
	{
		anim_array[stage+1][1].style["background-color"] = "yellow";	
	}
	else if (anim_array[stage+1][0] === "return") {
		anim_array[stage+1][1].style["background-color"] = "green";
		anim_array[stage+1][1].connections[anim_array[stage+1-1][1].id].line.style["stroke"] = "blue";
	}
	else if (anim_array[stage+1][0] === "appear") {
		detail_tag.style.transform = "scale(0)";
		detail_tag.children[0].style.transform = "scale(0)";
		detail_tag.children[1].style.transform = "scale(0)";
	}
	else if (anim_array[stage+1][0] === "add_low_value") {
		detail_tag.children[0].style.transform = "scale(0)";
	}
	else if (anim_array[stage+1][0] === "add_c_low_value") {
		detail_tag.children[1].style.transform = "scale(0)";
	}
	else if (anim_array[stage+1][0] === "add_time_value") {
		detail_tag.children[1].style.transform = "scale(0)";
	}
	else if (anim_array[stage+1][0] === "add_c_time_value") {
		detail_tag.children[1].style.transform = "scale(0)";
	}
	else if (anim_array[stage+1][0] === "solve") {
		if ((anim_array[stage+1][2] === "left"))
		{
			detail_tag.children[0].style.transform = "scale(1)";
		}
		else
		{
			detail_tag.children[1].style.transform = "scale(1)";
		}
	}
	else if (anim_array[stage+1][0] === "change") {
		anim_array[stage+1][1].cut_ver_detail.low_value_tab.textContent = `Low:${anim_array[stage+1][3]}`;
	}
	if (anim_array[stage+1][0] === "mark")
	{
		anim_array[stage+1][1].cut_mark.remove();
		// anim_array[stage+1][1].style["background-color"] = "yellow";		
	}
	else if (anim_array[stage+1][0] === "disappear") {
		detail_tag.style.left = `${((anim_array[stage+1][1].pos.left+25)*scale)+g_pos.left}px`;
		detail_tag.style.top = `${(anim_array[stage+1][1].pos.top*scale)+g_pos.top}px`;+1
		detail_tag.style["transform"] = "scale(1)";
	}
}

function perform_dfstree_fast(stage,anim_array)
{
	if (stage === -1)
	{
		return;
	}
	if (anim_array[stage][0] === "jump") 
	{
		anim_array[stage][1].style["background-color"] = "yellow";
	}
	else if (anim_array[stage][0] === "go") 
	{
		// anim_array[stage][1].append(cut_ver_tag)
		anim_array[stage-1][1].style["background-color"] = "green";
		anim_array[stage][1].style["background-color"] = "yellow";
		anim_array[stage-1][1].connections[anim_array[stage][1].id].line.style["stroke"] = "blue";
		anim_array[stage][1].cut_ver_detail.time_value_tab.textContent = `Time:${anim_array[stage][2]}`;
	}
	else if (anim_array[stage][0] === "done")
	{
		anim_array[stage][1].style["background-color"] = "blue";
	}
	else if (anim_array[stage][0] === "backedge") 
	{
		anim_array[stage-1][1].connections[anim_array[stage][1].id].line.style["stroke"] = "red";	
	}
	else if (anim_array[stage][0] === "return") 
	{
		anim_array[stage][1].style["background-color"] = "yellow";
		anim_array[stage][1].connections[anim_array[stage-1][1].id].line.style["stroke"] = "green";
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
	else if (anim_array[stage][0] === "add_time_value") 
	{
		detail_tag.children[anim_array[stage][3]].children[0].textContent = "time_value";
		detail_tag.children[anim_array[stage][3]].style.transform = "scale(0)";
		detail_tag.children[anim_array[stage][3]].children[1].textContent = anim_array[stage][2];
		detail_tag.children[anim_array[stage][3]].style["transform"] = "scale(1)";
	}
	else if (anim_array[stage][0] === "add_low_value") 
	{
		detail_tag.children[anim_array[stage][3]].children[0].textContent = "low_value";
		detail_tag.children[anim_array[stage][3]].style.transform = "scale(0)";
		detail_tag.children[anim_array[stage][3]].children[1].textContent = anim_array[stage][2];
		detail_tag.children[anim_array[stage][3]].style["transform"] = "scale(1)";
	}
	else if (anim_array[stage][0] === "add_c_low_value") 
	{
		detail_tag.children[anim_array[stage][3]].children[0].textContent = "child_low";
		detail_tag.children[anim_array[stage][3]].style.transform = "scale(0)";
		detail_tag.children[anim_array[stage][3]].children[1].textContent = anim_array[stage][2];
		detail_tag.children[anim_array[stage][3]].style["transform"] = "scale(1)";
	}
	else if (anim_array[stage][0] === "add_c_time_value") 
	{
		detail_tag.children[anim_array[stage][3]].children[0].textContent = "time_value";
		detail_tag.children[anim_array[stage][3]].style.transform = "scale(0)";
		detail_tag.children[anim_array[stage][3]].children[1].textContent = anim_array[stage][2];
		detail_tag.children[anim_array[stage][3]].style["transform"] = "scale(1)";
	}
	else if (anim_array[stage][0] === "solve") 
	{
		if ((anim_array[stage][2] === "left"))
		{
			detail_tag.children[0].style.transform = "scale(0)";
		}
		else
		{
			detail_tag.children[1].style.transform = "scale(0)";
		}
	}
	else if(anim_array[stage][0] === "mark") 
	{
		var cut_ver_tag = document.createElement("div");
		cut_ver_tag.classList.add("dis_tab_style");
		var cut_ver_svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
		var cut_ver_path = document.createElementNS("http://www.w3.org/2000/svg","path");
		cut_ver_path.setAttribute("d","M5 0 L40 40 L0 5 L-40 40 L-5 0 L-40 -40 L0 -5 L 40 -40  Z");
		cut_ver_path.style.fill = "yellow";
		cut_ver_svg.append(cut_ver_path);
		cut_ver_tag.append(cut_ver_svg);
		cut_ver_tag.style.left  = "25px";
		cut_ver_tag.style.top = "25px";
		// anim_array[stage][1].style["background-color"] = "red";
		anim_array[stage][1].append(cut_ver_tag)
		anim_array[stage][1].cut_mark = cut_ver_tag;
	}
	else if (anim_array[stage][0] === "change") 
	{
		anim_array[stage][1].cut_ver_detail.low_value_tab.textContent = `Low:${anim_array[stage][2]}`;
	}
	else if (anim_array[stage][0] === "disappear")
	{
		detail_tag.style.transform = "scale(1)";
		detail_tag.style["transform"] = "scale(0)";
	}

}

function perform_dfstree (stage,anim_array) {
	if (stage === -1)
	{
		return;
	}
	if (anim_array[stage][0] === "jump") {
		animate_property(anim_array[stage][1],"background-color","yellow",(delay*transition_factor) * 1000,true);	
	}
	else if (anim_array[stage][0] === "go")
	{
		animate_property(anim_array[stage-1][1],"background-color","green",(delay*transition_factor) * 1000,true);
		animate_property(anim_array[stage][1],"background-color","yellow",(delay*transition_factor) * 1000,true);
		animate_property(anim_array[stage-1][1].connections[anim_array[stage][1].id].line,"stroke","blue",(delay*transition_factor) * 1000,true);
		anim_array[stage][1].cut_ver_detail.time_value_tab.textContent = `Time:${anim_array[stage][2]}`;
	}
	else if (anim_array[stage][0] === "done")
	{
		animate_property(anim_array[stage][1],"background-color","blue",(delay*transition_factor) * 1000,true);
	}
	else if (anim_array[stage][0] === "backedge") 
	{
		animate_property(anim_array[stage-1][1].connections[anim_array[stage][1].id].line,"stroke","red",(delay*transition_factor) * 1000,true);
	}
	else if (anim_array[stage][0] === "return") 
	{
		animate_property(anim_array[stage][1],"background-color","yellow",(delay*transition_factor) * 1000,true);
		animate_property(anim_array[stage][1].connections[anim_array[stage-1][1].id].line,"stroke","green",(delay*transition_factor) * 1000,true);
		// animate_property(anim_array[stage-1][1],"background-color","green",(delay*transition_factor) * 1000,true);
		// animate_property(anim_array[stage][1],"background-color","yellow",(delay*transition_factor) * 1000,true);
		// animate_property(anim_array[stage][1].connections[anim_array[stage-1][1].id].line,"stroke","green",(delay*transition_factor) * 1000,true);	
	}
	else if (anim_array[stage][0] === "appear")
	{
		detail_tag.style.transform = "scale(0)";
		detail_tag.children[0].style.transform = "scale(0)";
		detail_tag.children[1].style.transform = "scale(0)";
		detail_tag.style.left = `${((anim_array[stage][1].pos.left+25)*scale)+g_pos.left}px`;
		detail_tag.style.top = `${(anim_array[stage][1].pos.top*scale)+g_pos.top}px`;
		animate_property(detail_tag,"transform","scale(1)",(delay*transition_factor) * 1000,true);
	}
	else if (anim_array[stage][0] === "add_time_value") 
	{
		detail_tag.children[anim_array[stage][3]].children[0].textContent = "time_value";
		detail_tag.children[anim_array[stage][3]].style.transform = "scale(0)";
		detail_tag.children[anim_array[stage][3]].children[1].textContent = anim_array[stage][2];
		detail_tag.children[anim_array[stage][3]].style["transform"] = "scale(1)";
	}
	else if (anim_array[stage][0] === "add_low_value") 
	{
		detail_tag.children[anim_array[stage][3]].children[0].textContent = "low_value";
		detail_tag.children[anim_array[stage][3]].style.transform = "scale(0)";
		detail_tag.children[anim_array[stage][3]].children[1].textContent = anim_array[stage][2];
		detail_tag.children[anim_array[stage][3]].style["transform"] = "scale(1)";
	}
	else if (anim_array[stage][0] === "add_c_low_value") 
	{
		detail_tag.children[anim_array[stage][3]].children[0].textContent = "child_low";
		detail_tag.children[anim_array[stage][3]].style.transform = "scale(0)";
		detail_tag.children[anim_array[stage][3]].children[1].textContent = anim_array[stage][2];
		detail_tag.children[anim_array[stage][3]].style["transform"] = "scale(1)";
	}
	else if (anim_array[stage][0] === "add_c_time_value") 
	{
		detail_tag.children[anim_array[stage][3]].children[0].textContent = "time_value";
		detail_tag.children[anim_array[stage][3]].style.transform = "scale(0)";
		detail_tag.children[anim_array[stage][3]].children[1].textContent = anim_array[stage][2];
		detail_tag.children[anim_array[stage][3]].style["transform"] = "scale(1)";
	}
	else if (anim_array[stage][0] === "solve") 
	{
		if ((anim_array[stage][2] === "left"))
		{
			detail_tag.children[0].style.transform = "scale(0)";
		}
		else
		{
			detail_tag.children[1].style.transform = "scale(0)";
		}
	}
	else if (anim_array[stage][0] === "mark") 
	{
		var cut_ver_tag = document.createElement("div");
		cut_ver_tag.classList.add("dis_tab_style");
		var cut_ver_svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
		var cut_ver_path = document.createElementNS("http://www.w3.org/2000/svg","path");
		cut_ver_path.setAttribute("d","M5 0 L40 40 L0 5 L-40 40 L-5 0 L-40 -40 L0 -5 L 40 -40  Z");
		cut_ver_path.style.fill = "yellow";
		cut_ver_svg.append(cut_ver_path);
		cut_ver_tag.append(cut_ver_svg);
		cut_ver_tag.style.left  = "25px";
		cut_ver_tag.style.top = "25px";
		// anim_array[stage][1].style["background-color"] = "red";
		anim_array[stage][1].append(cut_ver_tag)
		anim_array[stage][1].cut_mark = cut_ver_tag;
		// animate_property(cut_mark,"","red",(delay*transition_factor) * 1000,true);
		// animate_property(anim_array[stage][1],"background-color","red",(delay*transition_factor) * 1000,true);
	}
	else if (anim_array[stage][0] === "change") 
	{
		anim_array[stage][1].cut_ver_detail.low_value_tab.textContent = `Low:${anim_array[stage][2]}`;
	}
	else if (anim_array[stage][0] === "disappear")
	{
		detail_tag.style.transform = "scale(1)";
		detail_tag.style["transform"] = "scale(0)";
	}

}

function dfstree(node,parent) 
{
	print_object(document.nodes);
	var no_of_child = 0;
	for(nodes in node.connections)
	{
		var pair = node.connections[nodes];
		if (pair.node === parent)
		{
			continue;
		}
		else if (done_nodes[pair.node.id] === 1) 
		{
			continue;	
		}
	 	else if ((visited_node[pair.node.id] === 1))
	 	{
	 		anim_array.push(["backedge",pair.node]);
	 		anim_array.push(["appear",node]);
	 		anim_array.push(["add_low_value",node,low[node.id],0]);
	 		anim_array.push(["add_c_time_value",node,time[pair.node.id],1]);
		 	if (low[node.id] > time[pair.node.id])
		 	{
		 		anim_array.push(["solve",node,"left"]);
		 		anim_array.push(["change",node,time[pair.node.id],low[node.id]])
		 		low[node.id] = time[pair.node.id]
		 	}
		 	else
		 	{
		 		anim_array.push(["solve",node,"right"]);
		 	}
		 	anim_array.push(["disappear",node]);
	 	}
	 	else 
	 	{
	 		no_of_child += 1;
	 		anim_array.push(["go",pair.node,pre_time]);
	 		visited_node[pair.node.id] = 1;
	 		time[pair.node.id] = pre_time;
	 		low[pair.node.id] = pre_time;
	 		pre_time += 1;
	 		dfstree(pair.node,node);
	 		done_nodes[pair.node.id] = 1;
	 		anim_array.push(["done",pair.node]);
	 		anim_array.push(["return",node])
	 		anim_array.push(["appear",node]);
	 		anim_array.push(["add_low_value",node,low[node.id],0]);
	 		anim_array.push(["add_c_low_value",node,low[pair.node.id],1]);
	 		if (low[node.id] > low[pair.node.id])
	 		{
	 			anim_array.push(["solve",node,"left"]);
	 			anim_array.push(["change",node,low[pair.node.id],low[node.id]]);
	 			low[node.id] = low[pair.node.id];
	 		}
	 		else
	 		{
	 			anim_array.push(["solve",node,"right"]);
	 		}
	 		anim_array.push(["disappear",node]);
	 		if ((!(parent === null)) &&(!(cut_points[node.id] === 1)) )
	 		{
		 		anim_array.push(["appear",node]);
		 		anim_array.push(["add_time_value",node,time[node.id],0]);
		 		anim_array.push(["add_c_low_value",node,low[pair.node.id],1]);
		 		if (low[pair.node.id] >= time[node.id])
		 		{
		 			anim_array.push(["solve",node,"left"]);
		 			anim_array.push(["mark",node]);
		 			cut_points[node.id] = 1;
		 		}
		 		else 
		 		{
		 			anim_array.push(["solve",node,"right"]);
		 		}
		 		anim_array.push(["disappear",node]);
	 		}
	 	}
	}
	if ((no_of_child>1) && (parent === null)) 
	{
	 	anim_array.push(["mark",node]);
	 	cut_points[node.id] = 1;
	}
}