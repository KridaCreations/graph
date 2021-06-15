function clearArray(array) {
  while (array.length) {
    array.pop();
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
        return line.detail.weight;
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
            console.log(this.items[obj]);
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
        // console.log("element to add is "+element+ " : "+ value);
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


