class ScrollHeap
{
    
        constructor(scroll_box)
        {
            this.bubble_changes = [];
            this.scroll_box = scroll_box;
            this.items = [];
            this.position = {};
        }
        clear()
        {
            clearArray(this.bubble_changes);
            clearArray(this.items);
            clearObject(this.position);
        }
        get_element(element)
        {
            try{return this.scroll_box.children[this.position[element]];}
            catch(err)
            {
                alert(err);
            }
        }
        is_element_visible(element)
        {
            try{var node = this.get_element(element);
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
                        return true;}
            catch(err)
            {
                alert(err);
            }

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
                return (((this.items.length-7)*40) - ((unit_function(this.items.length-7 - this.position[element])) * 40))
            }
        }
        empty()
        {
            clearArray(this.items);
            clearObject(this.position);
            clearArray(this.bubble_changes);
            // console.log("empty scroll heap");
            // console.log(this.scroll_box);
            this.scroll_box.textContent = "";
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
        reverse_bubble_change()
        {
            var len_array = this.bubble_changes[this.bubble_changes.length-1].length
            var arr = this.bubble_changes[this.bubble_changes.length-1];
            for(var i = len_array-1;i>0;i--)
            {
                this.swap(arr[i][0],arr[i][1]);
            }
            this.bubble_changes.pop();
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
            }
            else if (new_value > this.items[this.position[element]].value ) 
            {
                this.scroll_box.children[this.position[element]].children[1].textContent = new_value;
                this.items[this.position[element]].value = new_value;
            }
        }
        delete_from_top_fast()
        {
            if(this.scroll_box.childElementCount >= 7)
            {
                this.scroll_box.scrollTop = 0;
            }
            var top_element = this.items[0].node;
            this.swap(0,this.size()-1);
            this.scroll_box.children[this.size()-1].remove();
            this.items.pop();
            delete this.position[top_element];

        }
        delete_without_bubble_down()
        {
            if(this.scroll_box.childElementCount < 7)
            {
                this.delete_from_point(0,0);
            }
            else
            {
                this.delete_from_point(0,delay*transition_factor*1000);
            }
        }
        delete_from_last()
        {
            // console.log("here");
            if(this.scroll_box.childElementCount >= 7)
            {
                this.scroll_box.scrollTop = 0;
            }
            var last_element = this.items[this.size()-1].node;
            // this.swap(0,this.size()-1);
            this.scroll_box.children[this.size()-1].remove();
            this.items.pop();
            delete this.position[last_element];
        }
        push_at_last(element,value)
        {
            var new_scroll_element = document.createElement("div");
            new_scroll_element.className = "scroll_box__heap_element";
            var new_scroll_element_name = document.createElement("div");
            new_scroll_element_name.className = "scroll_box__heap_element_name";
            new_scroll_element_name.textContent = element;
            var new_scroll_element_value = document.createElement("div");
            new_scroll_element_value.className = "scroll_box__heap_element_value";
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
        change_value_without_bubble_down(element,new_value)
        {
            if (this.is_element_visible(element)) 
            {
                this.change_at_point(this.scroll_box.scrollTop,0,element,new_value);
            }
            else 
            {
                this.change_at_point(this.get_scroll_value(element),delay*1000*transition_factor,element,new_value);    
            }
        }
        push_without_bubble_up(element,value)
        {
            if(this.scroll_box.childElementCount < 7)
            {
                this.add_to_point(0,0,element,value);
            }
            else
            {
                this.add_to_point((this.scroll_box.childElementCount-7+1)*40,(delay*1000)*transition_factor,element,value);
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
                if (Number(this.items[index].value) > Number(this.items[this.min_index(this.get_right_child(index),this.get_left_child(index))].value)) 
                {
                    var new_index = this.min_index(this.get_right_child(index),this.get_left_child(index));
                    this.bubble_changes[this.bubble_changes.length-1].push([index,new_index]);
                    this.swap(index,new_index);
                    return this.bubble_down(new_index);
                }
            }
            else if (!(this.get_left_child(index) === null)) 
            {
                if (Number(this.items[index].value) > Number(this.items[this.get_left_child(index)].value)) 
                {
                    var new_index = Number(this.get_left_child(index));
                    this.bubble_changes[this.bubble_changes.length-1].push([index,new_index]);
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
            this.bubble_changes[this.bubble_changes.length-1].push([index,get_parent(index)]);
            this.swap(index,get_parent(index));
            return this.bubble_up(get_parent(index));
        }
        swap(index1,index2)
        {
            try{
                // print_array_wr(this.items);
                        // console.log("swap");
                        // console.log(index1+" "+index2);
                        var temp_node = this.items[index1].node;
                        var temp_value = this.items[index1].value;
                        var temp_pos = index1;
            
                        this.scroll_box.children[index1].children[0].textContent = this.items[index2].node;
                        this.scroll_box.children[index1].children[1].textContent = this.items[index2].value;
                        this.items[index1].value = this.items[index2].value;
                        this.items[index1].node = this.items[index2].node;
                        this.position[this.items[index2].node] = index1;}
            catch(err)
            {
                alert(err);
            }


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
        delete_from_point(to,duration) 
        {
            var start = this.scroll_box.scrollTop;
            var change = to - start;
            var currentTime = 0;
            var increment = 10;
            var current_heap = this;
            var scroll_box = this.scroll_box;
            if(change === 0)
            {
                duration = 0;
            }
            // console.log("animation_started "+start+" "+duration+" "+change+" "+currentTime+" "+increment+" "+this+" "+scroll_box.id);
            var animateScroll =function()
            {
                currentTime += increment;
                var val = Math.easeInOutQuad(currentTime,start,change,duration);

                scroll_box.scrollTop = val;
                // console.log("animation_playing "+start+" "+duration+" "+change+" "+currentTime+" "+increment+" "+this+" "+scroll_box.id);
                if (currentTime < duration) {
                  setTimeout(animateScroll, increment);
                }
                else
                {

                    current_heap.delete_element(scroll_box.firstElementChild,delay*1000*transition_factor)
                    
                }
            };
            animateScroll();
        }
        change_at_point(to,duration,element,value) 
        {
            var start = this.scroll_box.scrollTop;
            var change = to - start;
            var currentTime = 0;
            var increment = 10;
            var current_heap = this;
            var scroll_element = this.get_element(element);
            var scroll_box = this.scroll_box;
            if(change === 0)
            {
                duration = 0;
            }
            // console.log("animation_started "+start+" "+duration+" "+change+" "+currentTime+" "+increment+" "+this+" "+scroll_box.id);
            var animateScroll =function()
            {
                currentTime += increment;
                var val = Math.easeInOutQuad(currentTime,start,change,duration);
                if (change === 0)
                {
                    val = scroll_box.scrollTop;
                }
                scroll_box.scrollTop = val;
                // console.log("animation_playing "+start+" "+duration+" "+change+" "+currentTime+" "+increment+" "+this+" "+scroll_box.id);
                if (currentTime < duration) {
                  setTimeout(animateScroll, increment);
                }
                else
                {
                    current_heap.change_element(element,scroll_element.children[1],value,delay*1000*transition_factor);    
                }
            };
            animateScroll();
        }
        add_to_point(to,duration,element,value) 
        {
            var start = this.scroll_box.scrollTop;
            var change = to - start;
            var currentTime = 0;
            var increment = 10;
            //n
            var new_scroll_element = document.createElement("div");
            new_scroll_element.className = "scroll_box__heap_element";
            var new_scroll_element_name = document.createElement("div");
            new_scroll_element_name.className = "scroll_box__heap_element_name";
            new_scroll_element_name.textContent = element;
            var new_scroll_element_value = document.createElement("div");
            new_scroll_element_value.className = "scroll_box__heap_element_value";
            new_scroll_element_value.textContent = value;
            this.scroll_box.append(new_scroll_element);
            new_scroll_element.append(new_scroll_element_name);
            new_scroll_element.append(new_scroll_element_value);
            
            new_scroll_element.style.transform =(`scale(${0})`);

            this.items.push({"node":element,"value":value});
            this.position[element] = this.size()-1;
            var current_heap = this
            var scroll_box = this.scroll_box;
            if(change === 0)
            {
                duration = 0;
            }
            // console.log("animation_started "+start+" "+duration+" "+change+" "+currentTime+" "+increment+" "+this+" "+scroll_box.id);
            var animateScroll =function()
            {
                currentTime += increment;
                var val = Math.easeInOutQuad(currentTime,start,change,duration);

                scroll_box.scrollTop = val;
                // console.log("animation_playing "+start+" "+duration+" "+change+" "+currentTime+" "+increment+" "+this+" "+scroll_box.id);
                if (currentTime < duration) {
                  setTimeout(animateScroll, increment);
                }
                else
                {
                    current_heap.add_element(new_scroll_element,delay*1000*transition_factor);
                    
                }
            };
            animateScroll();
        }
        change_element(parent,element,new_value,duration)
        {
            var start = 1.3;
            var change = -1.3;
            var currentTime = 0;
            var increment = 10;
            var current_heap = this;
            var scroll_box = this.scroll_box;
            if(change === 0)
            {
                duration = 0;
            }
            var animateScroll =function()
            {
                currentTime += increment;
                var val = Math.easeInOutQuad(currentTime,start,change,duration);
                element.style["fontSize"] = `${val}em`;
                if (currentTime < duration) {
                  setTimeout(animateScroll, increment);
                }
                else
                {
                    element.style["fontSize"] = `${0}em`;
                    element.textContent = new_value;
                    current_heap.items[current_heap.position[parent]].value = new_value;


                    var start = 0;
                    var change = 1.3;
                    var currentTime = 0;
                    var increment = 10;
                    var animateScroll =function()
                    {
                        currentTime += increment;
                        var val = Math.easeInOutQuad(currentTime,start,change,duration);
                        element.style["fontSize"] = `${val}em`;
                        if (currentTime < duration) {
                          setTimeout(animateScroll, increment);
                        }
                        else
                        {
                            element.style["fontSize"] = '1.3em';
                            
                        }
                    };
                    animateScroll();

                }
            };
            animateScroll();
        }
        add_element(element,duration)
        {
            var start = 0;
            var change = 1;
            var currentTime = 0;
            var increment = 10;

            if(change === 0)
            {
                duration = 0;
            }
            // console.log("animation_started "+start+" "+duration+" "+change+" "+currentTime+" "+increment+" "+this+" "+scroll_box.id);
            var animateScroll =function()
            {
                currentTime += increment;
                var val = Math.easeInOutQuad(currentTime,start,change,duration);

                element.style["transform"] = `scale(${val})`;
                // console.log("animation_playing "+start+" "+duration+" "+change+" "+currentTime+" "+increment+" "+this+" "+scroll_box.id);
                if (currentTime < duration) {
                  setTimeout(animateScroll, increment);
                }
                else
                {
                    element.style["transform"] = 'scale(1)';
                }
            };
            animateScroll();
        }
        delete_element(element,duration)
        {

            var start = 1;
            var change = -1;
            var currentTime = 0;
            var increment = 10;
            var current_heap = this
            var scroll_box = this.scroll_box;
            if(change === 0)
            {
                duration = 0;
            }
            // console.log("animation_started "+start+" "+duration+" "+change+" "+currentTime+" "+increment+" "+this+" "+scroll_box.id);
            var animateScroll =function()
            {
                currentTime += increment;
                var val = Math.easeInOutQuad(currentTime,start,change,duration);

                element.style["transform"] = `scale(${val})`;
                if (currentTime < duration) {
                  setTimeout(animateScroll, increment);
                }
                else
                {
                        element.style["transform"] = `scale(${1})`;
                        var top_element = current_heap.items[0].node;
                        current_heap.swap(0,current_heap.size()-1);
                        scroll_box.children[current_heap.size()-1].remove();
                        current_heap.items.pop();
                        delete current_heap.position[top_element];
                }
            };
            animateScroll();
        }

}

Math.easeInOutQuad = function (t,b,c,d) {
  t /= d/2;
    if (t<1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2)-1) + b;
};




// var scale_anim = new_scroll_element.animate(
                    //   [
                    //     { transform: `scale(0)`},
                    //     { transform: 'scale(1)'}
                    //   ], delay*1000*transition_factor);
                    // scale_anim.onfinish = function ()
                    // {
                    //     console.log("animation_ended "+start+" "+duration+" "+change+" "+currentTime+" "+increment+" "+this+" "+scroll_box.id)
                    //     new_scroll_element.style["transform"] = 'scale(1)';
                    // };






// var scale_anim = scroll_box.firstElementChild.animate(
                    //   [
                    //     { transform: 'scale(1)'},
                    //     { transform: 'scale(0)'}
                    //   ], delay*1000*transition_factor);
                    // scale_anim.onfinish = function ()
                    // {
                    //     console.log("animation_ended "+start+" "+change+" "+currentTime+" "+increment+" "+current_heap+" "+scroll_box.id);
                    //     // scroll_box.firstElementChild.remove();
                    //     var top_element = current_heap.items[0].node;
                    //     // this.items[this.position[element]].value = new_value;
                    //     current_heap.swap(0,current_heap.size()-1);
                    //     scroll_box.children[current_heap.size()-1].remove();
                    //     current_heap.items.pop();
                    //     delete current_heap.position[top_element];
                    // };





// var font_min = scroll_element.children[1].animate(
                    //   [
                    //     { fontSize: "1.3em"},
                    //     { fontSize: '0em'}
                    //   ], delay*1000*transition_factor);
                    // font_min.onfinish = function ()
                    // {
                    //     scroll_element.children[1].style["fontSize"] = '0em';
                    //     scroll_element.children[1].textContent = value;
                    //     current_heap.items[current_heap.position[element]].value = value;
                    //     // this.items[this.position[element]].value = new_value;
                    //     var font_max = scroll_element.children[1].animate(
                    //       [
                    //         { fontSize: "0em"},
                    //         { fontSize: '1.3em'}
                    //       ], delay*1000*transition_factor);
                    //     font_max.onfinish = function ()
                    //     {
                    //         console.log("animation_ended "+start+" "+duration+" "+change+" "+currentTime+" "+increment+" "+this+" "+scroll_box.id)
                    //         scroll_element.children[1].style["fontSize"] = '1.3em';
                    //     };
                    // };