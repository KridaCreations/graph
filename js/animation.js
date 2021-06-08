var bake_button = document.querySelector("#bake");
var play_button = document.querySelector("#play");
var algorithm_label = document.querySelector("#algorithms");
var current_stage = 0;
var delay = 3;
var transition_factor = 0.03;
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



anim_position.addEventListener("input" , animation_slider_input);
speed_slider.addEventListener("input" , speed_slider_input);
bake_button.addEventListener("click" , bake_animation);
play_button.addEventListener("click" , play_animation);


function change_anim_position(value)
{
	anim_position.value = value;
	anim_label.textContent = value;
}




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




