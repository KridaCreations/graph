var push_button = document.querySelector("#push");
var visibility_button = document.querySelector("#check_visibility");
var delete_button = document.querySelector("#delete_button");
var change_button = document.querySelector("#change_button")
var text_input = document.querySelector("#text_input");
var number_input = document.querySelector("#number_input");
var scroll_box = document.querySelector("#scroll_box");

push_button.addEventListener("click",add_scroll_element);
delete_button.addEventListener("click",delete_scroll_element);
change_button.addEventListener("click",change_scroll_element);
visibility_button.addEventListener("click",is_visible);

var scroll_heap = new ScrollHeap(scroll_box);


function is_visible() 
{
    if ((text_input.value === "")) 
    {
        return;
    }
    // console.log("here");
    console.log(scroll_heap.is_element_visible(text_input.value));
}

function add_scroll_element(event)
{
    if ((number_input.value === "")||(text_input.value === "")) 
    {
        return;
    }
    scroll_heap.push(text_input.value,number_input.value);
    // scroll_heap.push_without_bubble_up(text_input.value,number_input.value,3000,0.5);
    // scroll_heap.print();
}


function delete_scroll_element () 
{
    // scroll_heap.pop();
    // scroll_heap.delete_from_top_fast();
    scroll_heap.delete_without_bubble_down(3000,0.5);
}

function change_scroll_element () 
{
    if ((number_input.value === "")||(text_input.value === "")) 
    {
        return;
    }
    scroll_heap.change_value_without_bubble_down(text_input.value,number_input.value,3,0.5);
    // scroll_heap.change_value_fast(text_input.value,number_input.value);
    // scroll_heap.print();

}
console.log("here");

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}
async function asyncCall() {
  console.log('calling');
  const result =  await resolveAfter2Seconds();
  console.log(result);
  // result.then(()=>console.log("done"));
  // expected output: "resolved"
}

asyncCall();
