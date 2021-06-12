var heap = new Heap();
var distance = {};
function bake_dijsktra()
{
	if (foccused_node === null)
	{
		return;
	}
	recolor_graph();
	heap.empty();
	clearArray(anim_array);
	clearObject(visited_node);
	clearObject(distance);
	for(node in document.nodes)
	{
		distance[document.nodes] = null;
	}
	anim_array.push(["add",foccused_node]);
	distance[foccused_node.id] = 0;
	visited_node[foccused_node.id] = 1;
	heap.push(foccused_node.id,0);
	dijsktra();
	console.log(anim_array);
	console.log(distance);
	baked_animation = 1
	anim_position.max = anim_array.length-1;
	current_stage = -1;
	change_anim_position(current_stage);
}


function dijsktra (node) 
{
	while (!heap.isempty()) 
	{	

		var node = heap.peek();
		// console.log(node);
		node = document.nodes[node];
		anim_array.push(["jump",node]);
		// console.log(node);
		for(nodes in node.connections)
		{
			var pair = node.connections[nodes];
			if (!(visited_node[pair.node.id] === 1)) 
			{
				var curr_dis = distance[pair.node.id];
				var new_dis = find_length(node,node.connections[nodes].node)+distance[node.id];
				anim_array.push(["go",pair.node]);
				anim_array.push(["appear",pair.node]);
				anim_array.push(["add_pre_dis",pair.node,curr_dis]);
				anim_array.push(["add_new_dis",pair.node,new_dis]);
// anim_array.push(["solve",pair_node]);
				if (curr_dis === undefined)
				{
					distance[pair.node.id] = new_dis;
					anim_array.push(["solve",pair.node,"new_dis"]);
					heap.push(pair.node.id,new_dis);
					anim_array.push(["add",pair.node,new_dis]);
				}
				else if (curr_dis > new_dis)
				{
					distance[pair.node.id] = new_dis;
					anim_array.push(["solve",pair.node,"new_dis"]);
					heap.change_value(pair.node.id,new_dis);
					anim_array.push(["change",pair.node,new_dis,heap.get_position(pair.node.id)]);
				}
				else
				{
					anim_array.push(["solve",pair.node,"curr_dis"]);
				}
				anim_array.push(["disappear",pair.node]);
				anim_array.push(["return",node]);
			}
		}
		visited_node[node] = 1;
		heap.pop();
		anim_array.push(["remove",node]);
		anim_array.push(["done",node]);
	}	
}


