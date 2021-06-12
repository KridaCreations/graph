// var threshold = 0.2;
// var max_iterations = 100;
// function tut_layout()
// {
// 	var max_force = null;
// 	var t = max_iterations; 
// 	var keys = Object.keys(document.nodes);
// 	var first_node = document.nodes[keys[0]];		
// 	var second_node = document.nodes[keys[1]];	
// 	var third_node = document.nodes[keys[2]];
// 	console.log(no_of_nodes);
// 	console.log(third_node);
// 	move_node(first_node,0,0);
// 	move_node(second_node,no_of_nodes * 50 * 0.86,no_of_nodes * 50 * 0.5);
// 	move_node(third_node,0,no_of_nodes * 50);
// 	console.log(second_node.pos);
// 	while ((t--) ) 
// 	{
// 		if (!(max_force === null))
// 		{
// 			if (max_force < threshold) {
// 				break;
// 			}
// 		}
// 		max_force = null;
// 		for(node in document.nodes)
// 		{
// 			// console.log(node);
// 			if (document.nodes[node] === first_node || document.nodes[node] === second_node || document.nodes[node] === third_node  )
// 			{
// 				continue;
// 			}
// 			// console.log(node);
// 			var force = {"left":0,"top":0};
// 			var connections = document.nodes[node].connections;
// 			for (other_nodes in connections )
// 			{
// 				var new_force = get_force_tut(document.nodes[node],connections[other_nodes].node);
// 				// console.log("adding_force " + new_force.left);
// 				force.left += new_force.left;
// 				force.top += new_force.top;
// 			}
// 			var other_connections = document.nodes[node].other_connections
// 			for(other_nodes in other_connections)
// 			{
// 				var new_force = get_force_tut(document.nodes[node],other_connections[other_nodes].node);
// 				// console.log("adding_force " + new_force.left);
// 				force.left += new_force.left;
// 				force.top += new_force.top;
// 			}
// 			// console.log(force.left);
// 			force.left /= (Object.keys(document.nodes[node].connections).length + Object.keys(document.nodes[node].other_connections).length);
// 			// console.log(force.left);
// 			force.top /= (Object.keys(document.nodes[node].connections).length + Object.keys(document.nodes[node].other_connections).length);
// 			if (max_force === null) 
// 			{
// 				max_force = length_vec(force);
// 			}
// 			else if (max_force < length_vec(force)) 
// 			{
// 				max_force = length_vec(force);
// 			}
// 			document.nodes[node].force = force;
// 		}
// 		for(node in document.nodes)
// 		{
// 			// console.log(node);
// 			if (document.nodes[node] === first_node || document.nodes[node] === second_node || document.nodes[node] === third_node  )
// 			{
// 				continue;
// 			}
// 			// console.log(node);
// 			var left_displacement = document.nodes[node].pos.left -  (document.nodes[node].force.left);
// 			var top_displacement = document.nodes[node].pos.top -  (document.nodes[node].force.top);
// 			// console.log(document.nodes[node]);
// 			move_node(document.nodes[node],left_displacement,top_displacement);
// 		}
// 	}
//  	console.log(second_node.pos);

// }

// function get_force_tut(target,other_node) 
// {
// 	// return getDistance(target.pos.left,target.pos.top,other_node.pos.left,other_node.pos.top);
// 	// var d = getDistance(target.pos.left,target.pos.top,other_node.pos.left,other_node.pos.top);
// 	// var force = 
// 	return {"left":target.pos.left-other_node.pos.left,"top":target.pos.top - other_node.pos.top};
// }