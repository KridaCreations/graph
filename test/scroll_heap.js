class ScrollHeap
{
    constructor(scroll_box)
    {
        this.scroll_box = scroll_box;
        this.items = [];
        this.position = {};
    }
    get_element(element)
    {
        return this.scroll_box.children[this.position[element]];
    }
    is_element_visible(element)
    {
        var node = this.get_element(element);
        var pos_top = node.getBoundingClientRect().top;
        var pos_bottom = node.getBoundingClientRect().bottom;
        var scroll_box_top = this.scroll_box.getBoundingClientRect().top;
        if (scroll_box_top >pos_top)
        {
            return false;
        }
        else if ((pos_bottom - scroll_box_top)>this.scroll_box.getBoundingClientRect().height) 
        {
            return false;
        }
        return true;

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
    get_scroll_value(element)
    {
        if(this.items.length<=7)
        {
            return 0;
        }
        else
        {
            return (unit_function(this.position[element] - 6)) * 40;
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
    change_value_fast(element,new_value)
    {
        if (this.is_element_visible(element) === false) 
        {
            this.scroll_box.scrollTop = this.get_scroll_value(element);
        }
        if (new_value < this.items[this.position[element]].value)
        { 
            this.scroll_box.children[this.position[element]].children[1].textContent = new_value;
            this.items[this.position[element]].value = new_value;
            // return this.bubble_up(this.position[element]);
        }
        else if (new_value > this.items[this.position[element]].value ) 
        {
            this.scroll_box.children[this.position[element]].children[1].textContent = new_value;
            this.items[this.position[element]].value = new_value;
        }
    }
    push_at_last(element,value)
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
        if(this.scroll_box.childElementCount >= 7)
        {
            this.scroll_box.scrollTop = (this.scroll_box.childElementCount-7+1)*40;
        }
    }
    change_value_without_bubble_down(element,new_value,delay,transition_factor)
    {
        if (this.is_element_visible(element)) 
        {
            console.log(this.scroll_box.scrollTop);
            console.log(this.get_scroll_value(element));
            this.change_at_point(this.scroll_box.scrollTop,0,transition_factor,element,new_value);
        }
        else 
        {
            this.change_at_point(this.get_scroll_value(element),delay*1000,transition_factor,element,new_value);    
        }
    }
    push_without_bubble_up(element,value,delay,transition_factor)
    {
        if(this.scroll_box.childElementCount < 7)
        {
            this.add_to_point(0,0,transition_factor,element,value);
        }
        else
        {
            this.add_to_point((scroll_box.childElementCount-7+1)*40,delay*1000,transition_factor,element,value);
        }
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
    pop(delay)
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
            this.scroll_box.children[this.position[element]].children[1].textContent = new_value;
            this.items[this.position[element]].value = new_value;
            return this.bubble_up(this.position[element]);
        }
        else if (new_value > this.items[this.position[element]].value ) 
        {
            this.scroll_box.children[this.position[element]].children[1].textContent = new_value;
            this.items[this.position[element]].value = new_value;
            return this.bubble_down(this.position[element]);
        }
    }
    mirror_bubble_down(index)
    {
        if (!(this.get_right_child(index) === null))
        {
            var new_index = this.min_index(this.get_right_child(index),this.get_left_child(index));
            this.swap(index,new_index);
            return this.bubble_down(new_index);
        }
        else if (!(this.get_left_child(index) === null)) 
        {
            var new_index = this.get_left_child(index);
            this.swap(index,new_index);
            return this.bubble_down(new_index);
        }
        return index;
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
    change_at_point(to,duration,transition_factor,element,value) 
    {
        console.log(transition_factor);
        var start = this.scroll_box.scrollTop;
        console.log("to "+to);
        var change = to - start;
        var currentTime = 0;
        var increment = 10;
        var scroll_element = this.get_element(element);
        var scroll_box = this.scroll_box;
        var animateScroll =function()
        {
            currentTime += increment;
            var val = Math.easeInOutQuad(currentTime,start,change,duration);
            if (change === 0)
            {
                val = scroll_box.scrollTop;
            }
            scroll_box.scrollTop = val;
            if (currentTime < duration) {
              setTimeout(animateScroll, increment);
            }
            else
            {
                var font_min = scroll_element.children[1].animate(
                  [
                    { fontSize: "1.3em"},
                    { fontSize: '0em'}
                  ], 3*1000*transition_factor);
                font_min.onfinish = function ()
                {
                    scroll_element.children[1].style["fontSize"] = '0em';
                    scroll_element.children[1].textContent = value;
                    var font_max = scroll_element.children[1].animate(
                      [
                        { fontSize: "0em"},
                        { fontSize: '1.3em'}
                      ], 3*1000*transition_factor);
                    font_max.onfinish = function ()
                    {
                        scroll_element.children[1].style["fontSize"] = '1.3em';
                    };
                };
            }
        };
        animateScroll(this,duration,transition_factor,scroll_element);
    }
    add_to_point(to,duration,transition_factor,element,value) 
    {
        console.log(transition_factor);
        var start = this.scroll_box.scrollTop;
        var change = to - start;
        var currentTime = 0;
        var increment = 10;
        var new_scroll_element = document.createElement("div");
        new_scroll_element.style.transform =(`scale(${0})`);
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
        var scroll_box = this.scroll_box;
        var animateScroll =function()
        {
            currentTime += increment;
            var val = Math.easeInOutQuad(currentTime,start,change,duration);

            scroll_box.scrollTop = val;
            if (currentTime < duration) {
              setTimeout(animateScroll, increment);
            }
            else
            {
                var scale_anim = new_scroll_element.animate(
                  [
                    { transform: new_scroll_element.style["transform"]},
                    { transform: 'scale(1)'}
                  ], 3*1000*transition_factor);
                scale_anim.onfinish = function ()
                {
                    new_scroll_element.style["transform"] = 'scale(1)';
                };
            }
        };
        animateScroll(this,duration,transition_factor,new_scroll_element);
    }

}

Math.easeInOutQuad = function (t,b,c,d) {
  t /= d/2;
    if (t<1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2)-1) + b;
};