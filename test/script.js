var push_button = document.querySelector("#push");
var delete_button = document.querySelector("#delete_button");
var change_button = document.querySelector("#change_button")
var text_input = document.querySelector("#text_input");
var number_input = document.querySelector("#number_input");
var scroll_box = document.querySelector("#scroll_box");

push_button.addEventListener("click",add_scroll_element);
delete_button.addEventListener("click",delete_scroll_element);
change_button.addEventListener("click",change_scroll_element);

var scroll_heap = new ScrollHeap(scroll_box);

function add_scroll_element(event)
{
    if ((number_input.value === "")||(text_input.value === "")) 
    {
        return;
    }
    scroll_heap.push(text_input.value,number_input.value);
    scroll_heap.print();
}


function delete_scroll_element () 
{
    scroll_heap.pop();
}

function change_scroll_element () 
{
    if ((number_input.value === "")||(text_input.value === "")) 
    {
        return;
    }
    scroll_heap.change_value(text_input.value,number_input.value);
    scroll_heap.print();

}