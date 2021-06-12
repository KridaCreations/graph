var push_button = document.querySelector("#push");
var text_input = document.querySelector("#text_input");
var number_input = document.querySelector("#number_input");
var scroll_box = document.querySelector("#scroll_box");

push_button.addEventListener("click",add_scroll_element);


function add_scroll_element(event)
{
    if ((number_input.value === "")||(text_input.value === "")) 
    {
        return;
    }
    var new_scroll_element = document.createElement("div");
    new_scroll_element.className = "scroll_box_element";
    var new_scroll_element_name = document.createElement("div");
    new_scroll_element_name.className = "scroll_element_name";
    new_scroll_element_name.textContent = text_input.value;
    var new_scroll_element_value = document.createElement("div");
    new_scroll_element_value.className = "scroll_element_value";
    new_scroll_element_value.textContent = number_input.value;
    scroll_box.append(new_scroll_element);
    new_scroll_element.append(new_scroll_element_name);
    new_scroll_element.append(new_scroll_element_value);
}


function binary_position(container,value)
{

}