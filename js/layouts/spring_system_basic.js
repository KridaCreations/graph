var c_spring = 10;
var c_length = 200;
var c_rep = 200000;
var c4 = 0.90;

var threshold = 0.2;
var max_iterations = 1000;
function spring_layout()
{
	var max_force = null;
	var t = max_iterations; 
	while ((t--) ) 
	{
		if (!(max_force === null))
		{
			if (max_force < threshold) {
				break;
			}
		}
		max_force = null;
		for(node in document.nodes)	
		{
			var force = {"left":0,"top":0};
			for(other_nodes in document.nodes)
			{
				var new_force = get_force(document.nodes[node],document.nodes[other_nodes]);
				// console.log("adding_force " + new_force.left);
				force.left += new_force.left;
				force.top += new_force.top; 
			}
			if (max_force === null) 
			{
				max_force = length_vec(force);
			}
			else if (max_force < length_vec(force)) 
			{
				max_force = length_vec(force);
			}
			document.nodes[node].force = force;
		}
		for(node in document.nodes)
		{
			var left_displacement = document.nodes[node].pos.left + c4* (document.nodes[node].force.left);
			var top_displacement = document.nodes[node].pos.top + c4* (document.nodes[node].force.top);
			// console.log("final_force " + force.left);
			move_node(document.nodes[node],left_displacement,top_displacement);
		}
	}
 

}

function repulsive_force(from,to)
{
	var d = getDistance(from.pos.left,from.pos.top,to.pos.left,to.pos.top);
	var force = {};
	var force_mag = 0;
	force_mag = c_rep/(d*d);
	force.left = force_mag *( (from.pos.left - to.pos.left )/d);
	force.top = force_mag *( (from.pos.top - to.pos.top )/d);
	return force;
}

function attractive_force(from,to)
{
	var d = getDistance(from.pos.left,from.pos.top,to.pos.left,to.pos.top);
	var force = {};
	var force_mag = 0;
	force_mag = c_spring * (Math.log((d/c_length)));
	force.left = force_mag *( (from.pos.left - to.pos.left )/d);
	force.top = force_mag *( (from.pos.top - to.pos.top )/d);
	return force;
}


function get_force (target,other_node) {
	var force = {"left" : 0,"top":0};
		if (other_node.id in target.connections)
		{
			var new_force = attractive_force(target,other_node);;
			force.left -= new_force.left;
			force.top -= new_force.top; 
		}
		else if (other_node.id in target.other_connections) 
		{
			var new_force = attractive_force(target,other_node);;
			force.left -= new_force.left;
			force.top -= new_force.top;	
		}
		else if (!(other_node === target))
		{
			var new_force = repulsive_force(target,other_node);
			force.left += new_force.left;
			force.top += new_force.top;	
		}
	
	return force;
}