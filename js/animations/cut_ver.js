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
	recolor_graph();
	pre_time = 0;
	visited_node[foccused_node.id] = 1;
	time[foccused_node.id] = pre_time;
	low[foccused_node.id] = pre_time;
	anim_array.push(["jump",foccused_node,pre_time]);
	context_array.push(`went to ${foccused_node.id}`);
	pre_time += 1;
	dfstree(foccused_node,null);
	done_nodes[foccused_node.id] = 1;
	anim_array.push(["done",foccused_node]);
	context_array.push(`marked ${foccused_node.id} as done`);
	for(nodes1 in document.nodes)
	{
		if(!(visited_node[nodes1] === 1))
		{
			visited_node[nodes1] = 1;
			time[nodes1] = pre_time;
			low[nodes1] = pre_time;
			pre_time += 1;
			anim_array.push(["jump",document.nodes[nodes1],pre_time]);
			context_array.push(`went to ${nodes1}`);
			dfstree(document.nodes[nodes1],null);
			done_nodes[nodes1] = 1;
	 		anim_array.push(["done",document.nodes[nodes1]]);
	 		context_array.push(`marked ${nodes1} as done`);
		}
	}
	baked_animation = 5;
	anim_position.max = anim_array.length-1;
	current_stage = -1;
	change_anim_position(current_stage);
	show_dis_cut();
}

function add_cut_mark (node) 
{
	var cut_ver_tag = document.createElement("div");
	cut_ver_tag.classList.add("dis_tab_style");
	var cut_ver_svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
	var cut_ver_path = document.createElementNS("http://www.w3.org/2000/svg","path");
	cut_ver_path.setAttribute("d","M5 0 L40 40 L0 5 L-40 40 L-5 0 L-40 -40 L0 -5 L 40 -40  Z");
	cut_ver_path.style.fill = "yellow";
	cut_ver_path.style.stroke = "black";
	cut_ver_path.style["stroke-width"] = 3;
	cut_ver_svg.append(cut_ver_path);
	cut_ver_tag.append(cut_ver_svg);
	cut_ver_tag.style.left  = "25px";
	cut_ver_tag.style.top = "25px";
	// anim_array[stage][1].style["background-color"] = "red";
	node.append(cut_ver_tag)
	node.cut_mark = cut_ver_tag;
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
	context_label.textContent = context_array[stage];
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
		anim_array[stage+1][1].cut_ver_detail.low_value_tab.textContent = "";
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
	context_label.textContent = context_array[stage];
	if (anim_array[stage][0] === "jump") 
	{
		anim_array[stage][1].style["background-color"] = "yellow";
	}
	else if (anim_array[stage][0] === "go") 
	{
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
		add_cut_mark(anim_array[stage][1]);
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
	context_label.textContent = context_array[stage];
	if (anim_array[stage][0] === "jump") {
		center_node(anim_array[stage][1],(delay*transition_factor) * 1000);
		animate_property(anim_array[stage][1],"background-color","yellow",(delay*transition_factor) * 1000,true);	
	}
	else if (anim_array[stage][0] === "go")
	{
		center_node(anim_array[stage][1],(delay*transition_factor) * 1000);
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
		center_node(anim_array[stage][1],(delay*transition_factor) * 1000);
		animate_property(anim_array[stage][1],"background-color","yellow",(delay*transition_factor) * 1000,true);
		animate_property(anim_array[stage][1].connections[anim_array[stage-1][1].id].line,"stroke","green",(delay*transition_factor) * 1000,true);	
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
		center_node(anim_array[stage][1],(delay*transition_factor) * 1000);
		add_cut_mark(anim_array[stage][1]);
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
	// print_object(document.nodes);
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
	 		context_array.push(`the edge to ${pair.node.id} is a BACKEDGE`);
	 		anim_array.push(["appear",node]);
	 		context_array.push(`comparing low value of ${node.id} to time value of ${pair.node.id}`);
	 		anim_array.push(["add_low_value",node,low[node.id],0]);
	 		context_array.push(`comparing low value of ${node.id} to time value of ${pair.node.id}`);
	 		anim_array.push(["add_c_time_value",node,time[pair.node.id],1]);
	 		context_array.push(`comparing low value of ${node.id} to time value of ${pair.node.id}`);
		 	if (low[node.id] > time[pair.node.id])
		 	{
		 		anim_array.push(["solve",node,"left"]);
		 		context_array.push(`time value of ${pair.node.id} is LESSER`);
		 		anim_array.push(["change",node,time[pair.node.id],low[node.id]])
		 		context_array.push(`changed the low value of ${node.id} to ${time[pair.node.id]}`);
		 		low[node.id] = time[pair.node.id]
		 	}
		 	else
		 	{
		 		anim_array.push(["solve",node,"right"]);
		 		context_array.push(`low value of ${node.id} is LESSER so no change`);
		 	}
		 	anim_array.push(["disappear",node]);
		 	context_array.push(`done comparing time value and low value`);
	 	}
	 	else 
	 	{
	 		no_of_child += 1;
	 		anim_array.push(["go",pair.node,pre_time]);
	 		context_array.push(`went to ${pair.node.id}`);
	 		visited_node[pair.node.id] = 1;
	 		time[pair.node.id] = pre_time;
	 		low[pair.node.id] = pre_time;
	 		pre_time += 1;
	 		dfstree(pair.node,node);
	 		done_nodes[pair.node.id] = 1;
	 		anim_array.push(["done",pair.node]);
	 		context_array.push(`marked ${pair.node.id} as done`);
	 		anim_array.push(["return",node])
	 		context_array.push(`returned to ${node.id}`);
	 		anim_array.push(["appear",node]);
	 		context_array.push(`comparing low value of ${low[node.id]} low value of it's child ${low[pair.node.id]}`);
	 		anim_array.push(["add_low_value",node,low[node.id],0]);
	 		context_array.push(`comparing low value of ${low[node.id]} low value of it's child ${low[pair.node.id]}`);
	 		anim_array.push(["add_c_low_value",node,low[pair.node.id],1]);
	 		context_array.push(`comparing low value of ${low[node.id]} low value of it's child ${low[pair.node.id]}`);
	 		if (low[node.id] > low[pair.node.id])
	 		{
	 			anim_array.push(["solve",node,"left"]);
	 			context_array.push(`the low value of child ${pair.node.id} is LESSER`);
	 			anim_array.push(["change",node,low[pair.node.id],low[node.id]]);
	 			context_array.push(`changed the low of value of ${node.id} to ${low[pair.node.id]}`);
	 			low[node.id] = low[pair.node.id];
	 		}
	 		else
	 		{
	 			anim_array.push(["solve",node,"right"]);
	 			context_array.push(`low of ${node.id} is LESSER so no change`);
	 		}
	 		anim_array.push(["disappear",node]);
	 		context_array.push(`done comparing time value and low value`);
	 		if ((!(parent === null)) &&(!(cut_points[node.id] === 1)) )
	 		{
		 		anim_array.push(["appear",node]);
		 		context_array.push(`comparing time value of ${time[node.id]} and low value of ${pair[node.id]}`);
		 		anim_array.push(["add_time_value",node,time[node.id],0]);
		 		context_array.push(`comparing time value of ${time[node.id]} and low value of ${pair[node.id]}`);
		 		anim_array.push(["add_c_low_value",node,low[pair.node.id],1]);
		 		context_array.push(`comparing time value of ${time[node.id]} and low value of ${pair[node.id]}`);
		 		if (low[pair.node.id] >= time[node.id])
		 		{
		 			anim_array.push(["solve",node,"left"]);
		 			context_array.push(`time value of ${node.id} is LESSER`);
		 			anim_array.push(["mark",node]);
		 			context_array.push(`marked ${node.id} as cut vertex`);
		 			cut_points[node.id] = 1;
		 		}
		 		else 
		 		{
		 			anim_array.push(["solve",node,"right"]);
		 			context_array.push(`low value of ${node.id} is LESSER so not a cut vertex`);
		 		}
		 		anim_array.push(["disappear",node]);
		 		context_array.push(`done comparing the values`);
	 		}
	 	}
	}
	if ((no_of_child>1) && (parent === null)) 
	{
	 	anim_array.push(["mark",node]);
	 	context_array.push(`marked ${node.id} as root having more than one child`);
	 	cut_points[node.id] = 1;
	}
}