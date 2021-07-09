var bake_button = document.querySelector("#bake");
var play_button = document.querySelector("#play");
var algorithm_label = document.querySelector("#algorithms");
var current_stage = 0;
var delay = 3;
var transition_factor = 0.3;
var baked_animation = null;
var anim_array = [];
var context_array = [];
var visited_node = [];
var pause = false;
var context_label = document.querySelector("#context_tab");
var speed_slider = document.querySelector("#speed_slider");
var speed_label = document.querySelector("#speed_label");
var anim_position = document.querySelector("#animation_slider");
var anim_label = document.querySelector("#animation_label");
var current_timer = null;
var is_playing = false;
var scroll_box = document.querySelector("#scroll_box");
var forward_button = document.querySelector("#forward_button");
var back_button = document.querySelector("#back_button");
var i_text = document.querySelector("#i_button");

forward_button.addEventListener("click",move_forward);
back_button.addEventListener("click",move_back);
anim_position.addEventListener("input" , animation_slider_input);
speed_slider.addEventListener("input" , speed_slider_input);
bake_button.addEventListener("click" , bake_animation);
play_button.addEventListener("click" , play_animation);
count = 0;

function add_node_func(name)
{
	if(scroll_box.childElementCount < 7)
	{
		add_to_point(scroll_box,0,0,name);
	}
	else
	{
		add_to_point(scroll_box,(scroll_box.childElementCount-7+1)*40,(delay*1000)*transition_factor,name);
	}
}

function move_back (argument) {
	if (baked_animation === null)
	{
		alert("error occured\npossible errors:-\n1)no animation baked \n2)broken animation: you might have edited the graph after baking animation")
		return;
	}
	is_playing = false
	play_button.textContent = "Play";
	clearTimeout(current_timer);
	var anim_value = Number(current_stage-1);
	change_anim_position(anim_value);
	anim_label.textContent = anim_position.value;
	if (baked_animation === 0)
	{
		change_to_anim_stage_dfs(anim_value);
	}
	else if (baked_animation === 1)
	{
		change_to_anim_stage_bfs(anim_value);
	}
	else if (baked_animation === 2)
	{
		change_to_anim_stage_dijsktra(anim_value);
	}
	else if (baked_animation === 3)
	{
		change_to_anim_stage_prims(anim_value);
	}
	else if (baked_animation === 4)
	{
		change_to_anim_stage_kruskal(anim_value);
	}
	else if (baked_animation === 5)
	{
		change_to_anim_stage_dfstree(anim_value);
	}
	
}

function move_forward (argument) {
	if (baked_animation === null)
	{
		alert("error occured\npossible errors:-\n1)no animation baked \n2)broken animation: you might have edited the graph after baking animation")
		return;
	}
	is_playing = false
	play_button.textContent = "Play";
	clearTimeout(current_timer);
	var anim_value = Number(current_stage+1);
	change_anim_position(anim_value);
	anim_label.textContent = current_stage+1;
	if (baked_animation === 0)
	{
		change_to_anim_stage_dfs(anim_value);
	}
	else if (baked_animation === 1)
	{
		change_to_anim_stage_bfs(anim_value);
	}
	else if (baked_animation === 2)
	{
		change_to_anim_stage_dijsktra(anim_value);
	}
	else if (baked_animation === 3)
	{
		change_to_anim_stage_prims(anim_value);
	}
	else if (baked_animation === 4)
	{
		change_to_anim_stage_kruskal(anim_value);
	}
	else if (baked_animation === 5)
	{
		change_to_anim_stage_dfstree(anim_value);
	}
	
}

function delete_node_func (event) 
{
	if (scroll_box.childElementCount <= 7) {
		delete_from_point(scroll_box,0,0);
	}
	else if (scroll_box.scrollTop>0) {
		delete_from_point(scroll_box,0,(delay*1000)*transition_factor);		
	}
	else
	{
		delete_from_point(scroll_box,0,0);
	}
}

function delete_from_point (element,to,duration) {
	var start = element.scrollTop;
    change = to - start;
    currentTime = 0;
    increment = 10;
    var animateScroll =function()
  	{
	    currentTime += increment;
	    var val = Math.easeInOutQuad(currentTime,start,change,duration);
	    element.scrollTop = val;
	    if (currentTime < duration) {
	      setTimeout(animateScroll, increment);
	    }
	    else
	    {
	    	var scale_anim = scroll_box.firstElementChild.animate(
			  [
			    { transform: 'scale(1)'},
			    { transform: 'scale(0)'}
			  ], delay*1000*transition_factor);
			scale_anim.onfinish = function ()
			{
				scroll_box.firstElementChild.remove();
			};
		}
	};
  	animateScroll();
}


function add_to_point(element,to,duration,name) {
  var start = element.scrollTop;
  change = to - start;
  currentTime = 0;
  increment = 10;
  var new_div = document.createElement("div");
  new_div.style.transform =(`scale(${0})`);
	new_div.className = "scroll_box_element";
	new_div.id = name;
	new_div.textContent = name;
	element.append(new_div);
  	var animateScroll =function()
  	{
	    currentTime += increment;
	    var val = Math.easeInOutQuad(currentTime,start,change,duration);
	    element.scrollTop = val;
	    if (currentTime < duration) {
	      setTimeout(animateScroll, increment);
	    }
	    else
	    {
	    	var scale_anim = new_div.animate(
			  [
			    { transform: new_div.style["transform"]},
			    { transform: 'scale(1)'}
			  ], delay*1000*transition_factor);
			scale_anim.onfinish = function ()
			{
				new_div.style["transform"] = 'scale(1)';
			};
		}
	};
  	animateScroll();
}



function change_anim_position(value)
{
	anim_position.value = value;
	anim_label.textContent = value;
}


function scrollTopoint (element,to,duration) {
  var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 10;

  var animateScroll = function(){
    currentTime += increment;
    var val = Math.easeInOutQuad(currentTime,start,change,duration);
    element.scrollTop = val;
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
    else
    {
    }
  };
  animateScroll();
}

Math.easeInOutQuad = function (t,b,c,d) {
  t /= d/2;
    if (t<1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2)-1) + b;
};

function speed_slider_input(value)
{
	
	delay = speed_slider.value * 0.5;
	speed_label.textContent = delay;
}

function change_to_stage (stage_value) 
{
	is_playing = false
	play_button.textContent = "Play";
	clearTimeout(current_timer);
	var anim_value = Number(stage_value);
	change_anim_position(stage_value);
	anim_label.textContent = stage_value;
	if (baked_animation === 0)
	{
		change_to_anim_stage_dfs(anim_value);
	}
	else if (baked_animation === 1)
	{
		change_to_anim_stage_bfs(anim_value);
	}
	else if (baked_animation === 2)
	{
		change_to_anim_stage_dijsktra(anim_value);
	}
	else if (baked_animation === 3)
	{
		change_to_anim_stage_prims(anim_value);
	}
	else if (baked_animation === 4)
	{
		change_to_anim_stage_kruskal(anim_value);
	}
	else if (baked_animation === 5)
	{
		change_to_anim_stage_dfstree(anim_value);
	}
}

function animation_slider_input()
{
	if (baked_animation === null)
	{
		alert("error occured\npossible errors:-\n1)no animation baked \n2)broken animation: you might have edited the graph after baking animation")
		return;
	}
	is_playing = false
	play_button.textContent = "Play";
	clearTimeout(current_timer);
	var anim_value = Number(anim_position.value);
	anim_label.textContent = anim_position.value;
	if (baked_animation === 0)
	{
		change_to_anim_stage_dfs(anim_value);
	}
	else if (baked_animation === 1)
	{
		change_to_anim_stage_bfs(anim_value);
	}
	else if (baked_animation === 2)
	{
		change_to_anim_stage_dijsktra(anim_value);
	}
	else if (baked_animation === 3)
	{
		change_to_anim_stage_prims(anim_value);
	}
	else if (baked_animation === 4)
	{
		change_to_anim_stage_kruskal(anim_value);
	}
	else if (baked_animation === 5)
	{
		change_to_anim_stage_dfstree(anim_value);
	}
}

function bake_animation(event)
{
	if (algorithm_label.selectedIndex === 0)
	{
		bake_dfs();
	}
	else if (algorithm_label.selectedIndex === 1)
	{
		bake_bfs();
	}
	else if (algorithm_label.selectedIndex === 2)
	{
		bake_dijsktra();
	}
	else if (algorithm_label.selectedIndex === 3)
	{
		bake_prims();
	}
	else if (algorithm_label.selectedIndex === 4)
	{
		bake_kruskal();
	}
	else if (algorithm_label.selectedIndex === 5)
	{
		bake_cut_ver();
	}
	else {
				alert("Animation not available\nAbhishek kumar hasn't coded them yet\n only these animations are available for now \n1)depth first traversal\n2)breadth first traversal\n3)dijsktra algorithm \n4)prim's algorithm\n5)kruskal algorithm");
	}

}

function play_animation(event)
{	
	if (baked_animation === null)
	{
		alert("error occured\npossible errors:-\n1)no animation baked \n2)broken animation: you might have edited the graph after baking animation")
		return;
	}
	if (is_playing === false)
	{
		is_playing = true;
		play_button.textContent = "Stop";
		if (baked_animation === 0)
		{
			play_dfs(current_stage+1,anim_array);
		}
		else if (baked_animation === 1)
		{
			play_bfs(current_stage+1,anim_array);
		}
		else if (baked_animation === 2)
		{
			play_dijsktra(current_stage+1,anim_array);
		}
		else if (baked_animation === 3)
		{
			play_prims(current_stage+1,anim_array);
		}
		else if (algorithm_label.selectedIndex === 4)
		{
			play_kruskal(current_stage+1,anim_array);
		}
		else if (algorithm_label.selectedIndex === 5)
		{
			play_dfstree(current_stage+1,anim_array);
		}
		

	}
	else if(is_playing === true)
	{
		is_playing = false
		play_button.textContent = "Play";
		clearTimeout(current_timer);
	}
}

function animate_property(element,property,final_value,duration,permanent)
{
	var animation =  element.animate(
		  [
		    {property : element.style[property] },
		    {property : final_value}
		  ],duration
		);
	animation.onfinish = function()
	{
		if (permanent === true)
		{
			element.style[property] = final_value;
		}
	};
}

function fix_graph(time_taken = 500)
{
	var animation1 = graph.animate([
            {"left" : graph.style["left"],"top":graph.style["top"] },
            {"left" : `${g_pos.left}px`,"top" : `${g_pos.top}px`}],time_taken);
	animation1.onfinish = function()
	{
			graph.style["left"] = `${g_pos.left}px` ;
			graph.style["top"] = `${g_pos.top}px` ;
	};
  var animation2 = draw_area_container.animate([
            {"left" : graph.style["left"],"top":graph.style["top"] },
            {"left" : `${g_pos.left}px`,"top" : `${g_pos.top}px`}],time_taken);
  animation2.onfinish = function()
	{
			draw_area_container.style["left"] = `${g_pos.left}px` ;
			draw_area_container.style["top"] = `${g_pos.top}px` ;
	};

}


function move_graph_to_pos(left,top,time_taken)
{
	g_pos.left = left;
  g_pos.top = top
	var animation1 = graph.animate([
            {"left" : graph.style["left"],"top":graph.style["top"] },
            {"left" : `${g_pos.left}px`,"top" : `${g_pos.top}px`}],time_taken);
	animation1.onfinish = function()
	{
			graph.style["left"] = `${g_pos.left}px` ;
			graph.style["top"] = `${g_pos.top}px` ;
	};
  var animation2 = draw_area_container.animate([
            {"left" : graph.style["left"],"top":graph.style["top"] },
            {"left" : `${g_pos.left}px`,"top" : `${g_pos.top}px`}],time_taken);
  animation2.onfinish = function()
	{
			draw_area_container.style["left"] = `${g_pos.left}px` ;
			draw_area_container.style["top"] = `${g_pos.top}px` ;
	};
}


