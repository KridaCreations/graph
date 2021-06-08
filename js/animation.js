var bake_button = document.querySelector("#bake");
var play_button = document.querySelector("#play");
var algorithm_label = document.querySelector("#algorithms");
var delay = 3;
var transition_factor = 1;
var baked_animation = null;
var anim_array = [];
var visited_node = [];
var speed_slider = document.querySelector("#speed_slider");
var speed_label = document.querySelector("#speed_label");

speed_slider.addEventListener("input",speed_slider_input);
bake_button.addEventListener("click" , bake_animation);
play_button.addEventListener("click" , play_animation);

function speed_slider_input(value)
{
	delay = speed_slider.value * 0.5;
	speed_slider.textContent = delay;
}


function bake_animation(event)
{
	if (algorithm_label.selectedIndex === 0)
	{
		bake_dfs();
	}
}

function play_animation(event)
{
	if (baked_animation === 0)
	{
		play_dfs(0,anim_array);
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




