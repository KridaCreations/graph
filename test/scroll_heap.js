class ScrollHeap
{
    constructor(scroll_box)
    {
        this.scroll_box = scroll_box;
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
        this.scroll_box.innerHtml = "";
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
        var new_scroll_element = document.createElement("div");
        new_scroll_element.className = "scroll_box_element";
        var new_scroll_element_name = document.createElement("div");
        new_scroll_element_name.className = "scroll_element_name";
        new_scroll_element_name.textContent = element;
        var new_scroll_element_value = document.createElement("div");
        new_scroll_element_value.className = "scroll_element_value";
        new_scroll_element_value.textContent = value;
        this.scroll_box.append(new_scroll_element);
        new_scroll_element.append(new_scroll_element_name);
        new_scroll_element.append(new_scroll_element_value);
        
        this.items.push({"node":element,"value":value});
        this.position[element] = this.size()-1;
        return this.bubble_up(this.size()-1);
    }
    pop()
    {
        var top_element = this.items[0].node;
        this.swap(0,this.size()-1);
        this.scroll_box.children[this.size()-1].remove();
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
        console.log("inside change " +new_value+" " +this.items[this.position[element]].value);
        if (new_value < this.items[this.position[element]].value)
        { 
            // console.log("up");
            this.scroll_box.children[this.position[element]].children[1].textContent = new_value;
            this.items[this.position[element]].value = new_value;
            return this.bubble_up(this.position[element]);
        }
        else if (new_value > this.items[this.position[element]].value ) 
        {
            // console.log("down");
            this.scroll_box.children[this.position[element]].children[1].textContent = new_value;
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

        // console
        this.scroll_box.children[index1].children[0].textContent = this.items[index2].node;
        this.scroll_box.children[index1].children[1].textContent = this.items[index2].value;
        this.items[index1].value = this.items[index2].value;
        this.items[index1].node = this.items[index2].node;
        this.position[this.items[index2].node] = index1;


        this.scroll_box.children[index2].children[0].textContent = temp_node;
        this.scroll_box.children[index2].children[1].textContent = temp_value;
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