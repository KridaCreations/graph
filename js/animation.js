var bake_button = document.querySelector("#bake");
var play_button = document.querySelector("#play");
var algorithm_label = document.querySelector("#algorithms");
var current_stage = 0;
var delay = 3;
var transition_factor = 0.1;
var baked_animation = null;
var anim_array = [];
var visited_node = [];
var pause = false;
var speed_slider = document.querySelector("#speed_slider");
var speed_label = document.querySelector("#speed_label");
var anim_position = document.querySelector("#animation_slider");
var anim_label = document.querySelector("#animation_label");
var current_timer = null;
var is_playing = false;
var scroll_box = document.querySelector("#scroll_box");
var to_top_button = document.querySelector("#to_top");
var to_bottom_button = document.querySelector("#to_bottom");
var delete_node_button = document.querySelector("#Delete_node");
var add_node_button = document.querySelector("#Add_node");

add_node_button.addEventListener("click",add_node_func);
delete_node_button.addEventListener("click",delete_node_func);
to_top_button.addEventListener("click",to_top);
to_bottom_button.addEventListener("click",to_bottom);
anim_position.addEventListener("input" , animation_slider_input);
speed_slider.addEventListener("input" , speed_slider_input);
bake_button.addEventListener("click" , bake_animation);
play_button.addEventListener("click" , play_animation);
count = 0;

function add_node_func(event)
{
	console.log("here");
	if(scroll_box.childElementCount < 7)
	{
		add_to_point(scroll_box,0,0,"abhishek");
	}
	else
	{
		add_to_point(scroll_box,(scroll_box.childElementCount-7+1)*40,(delay*1000)*transition_factor,"abhishek");
	}
}

function delete_node_func (event) 
{
	console.log("deleting");
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
	// count+=1;
	new_div.id = name + count;
	new_div.textContent = name+count;
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
			    	console.log(new_div.style["transform"]);
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

    	console.log("ende");
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

function animation_slider_input()
{
	console.log("input");
	is_playing = false
	play_button.textContent = "Play";
	clearTimeout(current_timer);
	var anim_value = Number(anim_position.value);
	// console.log(typeof anim_position.value);
	// console.log(anim_position.value);
	anim_label.textContent = anim_position.value;
	if (baked_animation === 0)
	{
		change_to_anim_stage_dfs(anim_value);
	}
}

function bake_animation(event)
{
	if (algorithm_label.selectedIndex === 0)
	{
		bake_dfs();
	}
}

function play_animation(event)
{	if (is_playing === false)
	{
		is_playing = true;
		play_button.textContent = "Stop";
		if (baked_animation === 0)
		{
			play_dfs(current_stage,anim_array);
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




