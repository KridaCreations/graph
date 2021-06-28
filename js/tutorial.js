var tutorial_button = document.querySelector("#tutorial_button");
var slides_container = document.querySelector("#slides");
var next_slide_button = document.querySelector("#slide_next");
next_slide_button.increment = 1;
var previous_slide_button = document.querySelector("#slide_previous");
previous_slide_button.increment = -1;
var skip_slide_button = document.querySelector("#skip_button");
var current_slide = 0;
var slides = document.getElementsByClassName("my_slides");
var slide_no_tag = document.querySelector("#slide_no");
// console.log(slides);

tutorial_button.addEventListener("click",show_slide);
skip_slide_button.addEventListener("click",hide_slide);
next_slide_button.addEventListener("click",change_slide);
previous_slide_button.addEventListener("click",change_slide);

function show_slide (argument) {
	// console.log("here");
	slides_container.style.display = "flex";
}

function hide_slide (argument) 
{
	 slides_container.style.display = "none";
}

function change_slide(increment) 
{
	if (current_slide+this.increment >= slides.length || current_slide+this.increment<0)
	{
		return;
	}
	slides[current_slide].style.display = "none";
	slides[current_slide + this.increment].style.display = "block";
	current_slide += this.increment;
	slide_no_tag.textContent = `${current_slide+1}/${slides.length}`;
}
