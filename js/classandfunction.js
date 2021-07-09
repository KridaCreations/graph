function clearArray(array) {
  while (array.length) {
    array.pop();
  }
}

function print_object(object)
{
    for (key in object)
    {
        console.log(key);
        var sum = "";
        sum += object[key].node ;
        sum += " ";
        sum += object[key].value;
        sum += " ";
        console.log(sum);
        // console.log(object[key]);
    }
    console.log("");
}

function print_object_real(object)
{
    for (key in object)
    {
        console.log(key);
        var sum = "";
        sum += key ;
        sum += " ";
        sum += object[key];
        sum += " ";
        console.log(sum);
        // console.log(object[key]);
    }
    console.log("");
}

function clear_yellow_lines()
{
    for (var i = 0;i<yellow_lines.length;i++)
    {
        yellow_lines[i][0].style.stroke = yellow_lines[i][1];
    }
    clearArray(yellow_lines);
}
function print_array(array)
{
    var add  ="";
    for(var i = 0;i<array.length;i++)
    {
        // console.log(array[i].nodeName);
        if (array[i].nodeName === "DIV")
        {
            add += array[i].id;
            // console.log("here");
            // console.log(array[i].id)
            add+= " ";
        }
        else
        {
            add += array[i];
            add+= " ";
        }
    }
    console.log(add);
}
function print_array_wr(array)
{
    for(var i = 0;i<array.length;i++)
    {
        console.log(array[i]);
    }
}
function show_dis()
{
    for (node in document.nodes)
    {
        var c_node = document.nodes[node];
        c_node.children[0].children[0].children[1].textContent = "Inf";
        c_node.children[0].style.transform = "scale(1)";
    }
}

function show_dis_cut()
{
    for (node in document.nodes)
    {
        // console.log("here");
        var c_node = document.nodes[node];
        c_node.cut_ver_detail.parentNode.style.transform = "scale(1)";
        c_node.cut_ver_detail.low_value_tab.textContent = "";
        c_node.cut_ver_detail.time_value_tab.textContent = "";
    }
}

function hide_dis_cut()
{
    for (node in document.nodes)
    {
        var c_node = document.nodes[node];
        c_node.children[0].children[0].children[1].textContent = "Inf";
        c_node.cut_ver_detail.parentNode.style.transform = "scale(0)";
    }
}


function set_all_dis(value)
{
    for (node in document.nodes)
    {
        var c_node = document.nodes[node];
        c_node.children[0].children[0].children[1].textContent = value;
    }
}

function hide_dis()
{
    for (node in document.nodes)
    {
        var c_node = document.nodes[node];
        c_node.children[0].children[0].children[1].textContent = "∞";
        c_node.children[0].style.transform = "scale(0)";
    }
}

function clear_graph()
{
    foccused_node = null;
    node_number = 0;
    no_of_nodes = 0
    scale = 1;
    container_center = {"left" : 818,"top" : 375};
    g_pos = {"left" : 0,"top" : 0};
    graph_pressed = false;
    center_of_nodes = {"left" : 0, "top" : 0};
    recolor_graph();
    graph.style.transform = (`scale(1)`);
    draw_area_container.style.transform = (`scale(1)`);
    graph.style.top = `${g_pos.top}px`;
    graph.style.left = `${g_pos.left}px`;
    draw_area_container.style.top = `${g_pos.top}px`;
    draw_area_container.style.left = `${g_pos.left}px`;

    baked_animation = null;
    scroll_box_heap.style.visibility = 'hidden';
    scroll_box.style.visibility = 'hidden';
    anim_position.max = anim_array.length-1;
    current_stage = -1;
    change_anim_position(current_stage);
    is_playing = false;
    play_button.textContent = "Play";
    clearTimeout(current_timer);
    scroll_box.textContent = "";

    queue.clear();
    clearArray(anim_array);
    clearObject(visited_node);
    
    for (node in document.nodes)
    {
        var c_node = document.nodes[node];
        for (connection in c_node.connections)
        {
            var pair = c_node.connections[connection];
            if (!(pair.line.detail.weight === null))
            {
                pair.line.detail.weight_rect.remove();
            }
            pair.line.remove();
        }
        document.nodes[node].remove();
        delete document.nodes[node];
    }
}


function unit_function(value)
{
    if (value<0) 
    {
        return 0;
    }
    else
    {
        return value;
    }
}   

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function clearObject(object)
{
    for (key in object) {
        delete object[key];
    }
}

function find_length(from,to) 
{
    var line = from.connections[to.id].line;
    var distance = null;
    if (line.detail.weight === null) 
    {
        return 1;
    } 
    else
    {
        return new Number(line.detail.weight);
    }
}


function getDistance(x1, y1, x2, y2){
    let y = x2 - x1;
    let x = y2 - y1;
    
    return Math.sqrt(x * x + y * y);
}

function length_vec(object)
{
    var x = object.left;
    var y = object.top;

    return Math.sqrt(x*x + y*y);
}

function get_parent (index) 
{
    if (index % 2 === 0) 
    {
        return (index/2)-1;
    } 
    else
    {
        return (index-1)/2;
    }
}

class Sets{
    constructor()
    {
        this.parent = {};
        this.size = {};
    }
    empty()
    {
        clearObject(this.parent);
    }
    make_set(node_id)
    {
        this.parent[node_id] = node_id;
        this.size[node_id] = 1;
    }
    find_set(node_id)
    {
        if (node_id == this.parent[node_id])
        {
            return node_id;
        }
        return this.parent[node_id] = this.find_set(this.parent[node_id]);
    }
    union_sets(a, b) 
    {
        a = this.find_set(a);
        b = this.find_set(b);
        if (!(a === b)) {
            if (this.size[a] < this.size[b])
            {
                this.parent[a] = b;
                this.size[b] += this.size[a];
                return b;
            }
            else
            {
                this.parent[b] = a;
                this.size[a] += this.size[b];
                return a;
            }
        }
    }
}

//heap class

class Heap
{
    constructor()
    {
        this.items = [];
        this.position = {};
    }
    isempty()
    {
        if (this.size() === 0)
        {
            return true;
        }
        else 
        {
            return false;      
        }  
    }
    empty()
    {
        clearArray(this.items);
        clearObject(this.position);
    }
    print()
    {
        console.log("item list")
        for (var obj = 0; obj<this.items.length ; obj++)
        {
            console.log("node "+this.items[obj].node+" "+"value "+this.items[obj].value);
        }
        console.log("positions");
        for(obj in this.position)
        {
            console.log(obj+" : "+this.position[obj]);
        }
        console.log("print_completed");
    }
    push(element,value)
    {   
        this.items.push({"node":element,"value":value});
        this.position[element] = this.size()-1;
        return this.bubble_up(this.size()-1);
    }
    pop()
    {
        var top_element = this.items[0].node;
        this.swap(0,this.size()-1);
        this.items.pop();
        delete this.position[top_element];
        return  this.bubble_down(0);
    }
    peek()
    {
        return this.items[0].node ;
    }
    get_position(element)
    {
        return this.position[element];
    }
    change_value(element,new_value)
    {
        if (new_value < this.items[this.position[element]].value)
        { 
            this.items[this.position[element]].value = new_value;
            return this.bubble_up(this.position[element]);
        }
        else if (new_value > this.items[this.position[element]].value ) 
        {
            this.items[this.position[element]].value = new_value;
            return this.bubble_down(this.position[element]);
        }
    }
    bubble_down(index)
    {
        if (!(this.get_right_child(index) === null))
        {
            if (this.items[index].value > this.items[this.min_index(this.get_right_child(index),this.get_left_child(index))].value) 
            {
                var new_index = this.min_index(this.get_right_child(index),this.get_left_child(index));
                this.swap(index,new_index);
                return this.bubble_down(new_index);
            }
        }
        else if (!(this.get_left_child(index) === null)) 
        {
            if (this.items[index].value > this.items[this.get_left_child(index)].value) 
            {
                var new_index = this.get_left_child(index);
                this.swap(index,new_index);
                return this.bubble_down(new_index);
            }
        }
        return index;
    }
    min_index(index1,index2)
    {
        if (this.items[index1].value < this.items[index2].value)
        {
            return index1;
        }
        else
        {
            return index2;
        }
    }
    bubble_up(index)
    {
        if ((index === 0))
        {
            return index;
        }
        if ((this.items[index].value >= this.items[get_parent(index)].value))
        {
            return index;
        }
        this.swap(index,get_parent(index));
        return this.bubble_up(get_parent(index));
    }
    swap(index1,index2)
    {
        var temp_node = this.items[index1].node;
        var temp_value = this.items[index1].value;
        var temp_pos = index1;

        this.items[index1].value = this.items[index2].value;
        this.items[index1].node = this.items[index2].node;
        this.position[this.items[index2].node] = index1;

        this.items[index2].value = temp_value;
        this.items[index2].node = temp_node;
        this.position[temp_node] = index2;
    }
    size()
    {
        return this.items.length;
    }
    get_parent (index) 
    {
        if (index % 2 === 0) 
        {
            return (index/2)-1;
        } 
        else
        {
            return (index-1)/2;
        }
    }
    get_left_child(index)
    {
        if(2*index + 1 >= this.size())
        {
            return null;
        }
        else
        {
            return (2*index + 1);
        }
    }
    get_right_child(index)
    {
        if(2*index + 2 >= this.size())
        {
            return null;
        }
        else
        {
            return (2*index + 2);
        }
    }

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

// Queue class
class Queue
{
    // Array is used to implement a Queue
    constructor()
    {
        this.items = [];
    };           
    enqueue(element)
    {    
        this.items.push(element);
    };
    dequeue()
    {
        if(this.isEmpty())
            return "Underflow";
        return this.items.shift();
    };
    isEmpty()
    {
        return this.items.length === 0;
    };
    printQueue()
    {
        var str = "";
        for(var i = 0; i < this.items.length; i++)
            str += this.items[i] +" ";
        return str;
    };
    front()
    {
        if(this.isEmpty())
            return "No elements in Queue";
        return this.items[0];
    };
    clear()
    {
      clearArray(this.items);
    }
}


