var add_button = document.querySelector("#add_button");
var move_button = document.querySelector("#move_button");
var delete_button = document.querySelector("#delete_button");
var connect_button = document.querySelector("#connect_button");
var center_button = document.querySelector("#center_button")
var focus_button = document.querySelector("#focus_button");
var recolor_button = document.querySelector("#recolor_button");
var clear_button = document.querySelector("#clear_button");
var graph_container = document.querySelector("#graph-container");
var connection_label = document.querySelector("#connections");
var graph = document.querySelector("#graph");
var draw_area_container = document.querySelector("#draw_area_container");
var draw_area = document.querySelector("#draw_area");
var dialog = document.querySelector("#dialog");
var dialog_hide = document.querySelector("#hide");
var dialog_connect = document.querySelector("#connect");
var node_type = document.querySelector("#Vertex_type");
var foccused_node = null;
var node_number = 0;
var no_of_nodes = 0
var scale = 1;
var negative_weights = 0 ;
var container_center = { "left": 818, "top": 375 };
var g_pos = { "left": 0, "top": 0 };
var graph_pressed = false;
var center_of_nodes = { "left": 0, "top": 0 };
// var node_color = "#c2789e";
document.lines = {};

document.nodes = {};

// console.log(document.getElementById('canvas'));

clear_button.addEventListener("click", clear_graph);
recolor_button.addEventListener("click", recolor_graph);
center_button.addEventListener("click", position_graph);
graph_container.addEventListener("wheel", graph_wheel);
graph_container.addEventListener("click", graph_click);
graph_container.addEventListener("mousemove", graph_mouse_over);
graph_container.addEventListener("mouseup", graph_mouse_up);
graph_container.addEventListener("mousedown", graph_mouse_down);
graph_container.addEventListener("mouseover", graph_mouse_over);

function recolor_graph() {
    clearTimeout(current_timer);
    is_playing = false;
    
    i_text.textContent = "";
    context_label.textContent = "";
    hide_dis_cut();
    hide_dis();
    clear_yellow_lines();
    detail_tag.style.transform = "scale(0)";
    scroll_box_heap.style.visibility = 'hidden';
    scroll_box.style.visibility = 'hidden';
    anim_position.max = anim_array.length - 1;
    current_stage = -1;
    change_anim_position(current_stage);
    
    play_button.textContent = "Play";
    
    // clearTimeout(current_timer);

    heap.empty();
    clearArray(context_array);
    clearArray(anim_array);
    clearObject(visited_node);
    clearObject(distance);
    clearObject(previous_connected_node);

    set.empty();
    clearArray(line_array);

    for (n in cut_points) {
        if (!(document.nodes[n].cut_mark === undefined)) {
            document.nodes[n].cut_mark.remove();
        }
        
    }
    clearObject(cut_points);
    clearObject(colored_nodes);
    clearObject(time);
    clearObject(low);
    clearObject(done_nodes);

    //dijsktra
    clearObject(closest_node);
    pre_time = 0;

    scroll_box.textContent = "";
    scroll_heap.empty();
    baked_animation = null;
    for (node in document.nodes) {
        var c_node = document.nodes[node];
        c_node.style.removeProperty("background-color");
        for (lines in c_node.connections) {
            c_node.connections[lines].line.style.removeProperty("stroke");
        }
    }
}

window.addEventListener("keydown",key_handeler);

function key_handeler(event)
{
    if (event.keyCode === 70)
    {
        focus_button.checked = true;
    }
    else if (event.keyCode === 65) 
    {
        add_button.checked = true;    
    }
    else if (event.keyCode === 68) 
    {
        delete_button.checked = true;    
    }
    else if (event.keyCode === 77) 
    {
        move_button.checked = true;    
    }
    else if (event.keyCode === 67) 
    {
        connect_button.checked = true;    
    }
}

function center_node(node,time_taken)
{
    g_pos.left = container_center.left - ((node.pos.left + 25) * scale);
    g_pos.top = container_center.top - ((node.pos.top + 25) * scale);
    fix_graph(time_taken);
}

function position_graph(event) {
    if (!(foccused_node === null)) {
        event.stopPropagation();
        g_pos.left = container_center.left - ((foccused_node.pos.left + 25) * scale);
        g_pos.top = container_center.top - ((foccused_node.pos.top + 25) * scale);
        fix_graph();
    } else if (no_of_nodes === 0) {
        g_pos.left = container_center.left - (container_center.left * scale);
        g_pos.top = container_center.top - (container_center.top * scale);
        fix_graph();
    } else {
        g_pos.left = container_center.left - ((center_of_nodes.left + 25) * scale);
        g_pos.top = container_center.top - ((center_of_nodes.top + 25) * scale);
        fix_graph();
    }
}

function graph_mouse_down() {
    if (event.button === 1) {
        graph_pressed = true;
    }
}

function graph_mouse_up() {
    if (graph_pressed === true) {
        graph_pressed = false;
    }
}

function graph_wheel(event) {
    if (event.target.parentNode === document.querySelector('#scroll_box')) {
        event.stopPropagation();
        return;
    }
    if (event.target.parentNode === document.querySelector('#scroll_box_heap')) {
        event.stopPropagation();
        return;
    }
    if (event.target.parentNode.parentNode === document.querySelector('#scroll_box_heap')) {
        event.stopPropagation();
        return;
    }
    if (event.target === document.querySelector('#scroll_box_heap')) {
        event.stopPropagation();
        return;
    }
    var con_pos_x = graph_container.getBoundingClientRect().left;
    var con_pos_y = graph_container.getBoundingClientRect().top;
    var ev_wrt_con_x = event.clientX - con_pos_x;
    var ev_wrt_con_y = event.clientY - con_pos_y;
    var prev_scale = scale;
    scale += event.deltaY * -0.0001;
    scale = Math.min(Math.max(.125, scale), 4);
    zoom_board(graph, ev_wrt_con_x, ev_wrt_con_y, prev_scale, scale);
}


function zoom_board(graph, ev_wrt_con_x, ev_wrt_con_y, prev_scale, to_scale) {
    var prev_dis_x = -(g_pos.left - ev_wrt_con_x);
    var prev_dis_y = -(g_pos.top - ev_wrt_con_y);
    graph.style.transform = (`scale(${to_scale})`);
    draw_area_container.style.transform = (`scale(${to_scale})`);
    var pre_scale = to_scale;
    var pre_dis_x = ((prev_dis_x) / (prev_scale)) * to_scale;
    var pre_dis_y = ((prev_dis_y) / (prev_scale)) * to_scale;
    var diff_x = prev_dis_x - pre_dis_x;
    var diff_y = prev_dis_y - pre_dis_y;
    g_pos.top = g_pos.top + diff_y;
    g_pos.left = g_pos.left + diff_x;
    graph.style.top = `${g_pos.top}px`;
    graph.style.left = `${g_pos.left}px`;
    draw_area_container.style.top = `${g_pos.top}px`;
    draw_area_container.style.left = `${g_pos.left}px`;
}


function graph_click(event) {

    if (event.target === center_button) {
        return;
    }

    if (event.button === 1) {
        return;
    }

    var con_pos_x = graph_container.getBoundingClientRect().left;
    var con_pos_y = graph_container.getBoundingClientRect().top;
    var ev_wrt_con_x = event.clientX - con_pos_x;
    var ev_wrt_con_y = event.clientY - con_pos_y;

    event.stopPropagation();
    if (add_button.checked === true) {

        var dgcc_x = graph.getBoundingClientRect().left - graph_container.getBoundingClientRect().left;
        var dgcc_y = graph.getBoundingClientRect().top - graph_container.getBoundingClientRect().top;
        var calc_x = (ev_wrt_con_x - dgcc_x) / scale;
        var calc_y = (ev_wrt_con_y - dgcc_y) / scale;
        add_node(node_number, calc_y - 25, calc_x - 25,node_type.selectedIndex);

    }
    else {
            console.log("heelo")
            if((foccused_node !== null)){       
                if (event.currentTarget === event.target){
                    foccused_node.style.border= `4px solid ${node_color}`;
                    foccused_node = null;
                }
            
            }
            
    }

};


function add_node(id_no, position_y, position_x,index) {
    var new_node = document.createElement("div");
    if (index === 1)
    {
        var name = prompt("Enter the vertex name\n(whitespaces will be trimmed)");
        name = name.trim();
        if (name === null || name === "")
        {
            alert("Blank Input");
            return;
        }
        else if(document.nodes[name] === undefined)
        {
            new_node.id = name;
            new_node.textContent = name;
        }
        else
        {
            alert("Node already present");
            return;
        }
    }
    else 
    {
        while(!(document.nodes["node" + id_no] === undefined))
        {
            node_number += 1;
            id_no = node_number; 
        }
        new_node.id = "node" + id_no;
        new_node.textContent = "node" + id_no;
    }  
    baked_animation = null;
    no_of_nodes += 1;
    graph.append(new_node);
    new_node.pos = { "left": position_x, "top": position_y };
    new_node.connections = {};
    new_node.other_connections = {};
    new_node.className += "node";
    new_node.pressed = false;
    new_node.title = new_node.id;
    center_of_nodes.left = ((center_of_nodes.left * (no_of_nodes - 1)) + position_x) / no_of_nodes;
    center_of_nodes.top = ((center_of_nodes.top * (no_of_nodes - 1)) + position_y) / no_of_nodes;
    new_node.style = `left:${position_x}px;top: ${position_y}px;`;
    new_node.addEventListener('click', node_click);
    new_node.addEventListener('mouseup', node_mouse_up);
    new_node.addEventListener('mousedown', node_mouse_down);

    //adding the dijsktra detail tag
    var new_detail_tag = document.createElement("div");
    new_detail_tag.classList.add("dis_tab_style");
    var new_svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    new_svg.setAttribute("height", 100);
    new_svg.setAttribute("width", 100);

    var text_tab = document.createElementNS("http://www.w3.org/2000/svg", "text")
    text_tab.setAttribute("y", -40);
    text_tab.setAttribute("text-anchor", "middle");

    var new_path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    new_path.setAttribute("d", "M0 0 L10 -20 L40 -20 L40 -60 L-40 -60 L-40 -20 L-10 -20 Z");
    new_path.style = "fill:pink;stroke:blueviolet;stroke-width:3 ;";

    new_svg.append(new_path);
    new_svg.append(text_tab);

    new_detail_tag.append(new_svg);
    new_node.append(new_detail_tag);
    new_detail_tag.style.left = "25px";
    new_detail_tag.style.top = "0px";

    new_detail_tag.style.transform = "scale(0)";

    //adding the cut_ver detail tag
    new_detail_tag = document.createElement("div");
    new_detail_tag.classList.add("dis_tab_style");
    new_svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    new_svg.setAttribute("height", 100);
    new_svg.setAttribute("width", 100);

    text_tab = document.createElementNS("http://www.w3.org/2000/svg", "text")
    text_tab.setAttribute("y", -40);
    text_tab.setAttribute("text-anchor", "middle");

    var text_tab1 = document.createElementNS("http://www.w3.org/2000/svg", "text")
    text_tab1.setAttribute("y", -80);
    text_tab1.setAttribute("text-anchor", "middle");

    new_path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    new_path.setAttribute("d", "M0 0 L10 -20 L40 -20 L40 -120 L-40 -120 L-40 -20 L-10 -20 Z");
    new_path.style = "fill:pink;stroke:blueviolet;stroke-width:3 ;";
    
    new_svg.append(new_path);
    new_svg.append(text_tab);
    new_svg.append(text_tab1);

    new_detail_tag.append(new_svg);
    new_node.append(new_detail_tag);
    new_detail_tag.style.left = "25px";
    new_detail_tag.style.top = "0px";

    new_detail_tag.style.transform = "scale(0)";
    new_node.cut_ver_detail = new_detail_tag.children[0];
    new_node.cut_ver_detail.low_value_tab = text_tab;
    new_node.cut_ver_detail.time_value_tab = text_tab1;

    document.nodes[new_node.id] = new_node;


    return new_node;
}

var node_drag_offsetX;
var node_drag_offsetY;

function graph_mouse_over(event) {

    if (graph_pressed === true) {
        g_pos.top += event.movementY;
        g_pos.left += event.movementX;
        graph.style.top = `${g_pos.top}px`;
        graph.style.left = `${g_pos.left}px`;
        draw_area_container.style.top = `${g_pos.top}px`;
        draw_area_container.style.left = `${g_pos.left}px`;
        return;
    }
    if (foccused_node === null) {
        return;
    } else {
        if (foccused_node.pressed === true) {
            var con_pos_x = graph_container.getBoundingClientRect().left;
            var con_pos_y = graph_container.getBoundingClientRect().top;
            var ev_wrt_con_x = event.clientX - con_pos_x;
            var ev_wrt_con_y = event.clientY - con_pos_y;
            var dgcc_x = graph.getBoundingClientRect().left - graph_container.getBoundingClientRect().left;
            var dgcc_y = graph.getBoundingClientRect().top - graph_container.getBoundingClientRect().top;
            var calc_x = (ev_wrt_con_x - dgcc_x) / scale;
            var calc_y = (ev_wrt_con_y - dgcc_y) / scale;
            calc_y -= node_drag_offsetY;
            calc_x -= node_drag_offsetX;
            move_node(foccused_node, calc_x, calc_y);
        }
    }
}

function move_node(node_move, calc_x, calc_y) {
    center_of_nodes.left = ((center_of_nodes.left * no_of_nodes) - node_move.pos.left + calc_x) / no_of_nodes;
    center_of_nodes.top = ((center_of_nodes.top * no_of_nodes) - node_move.pos.top + calc_y) / no_of_nodes;
    node_move.style.left = `${calc_x}px`;
    node_move.style.top = `${calc_y}px`;
    node_move.pos.left = calc_x;
    node_move.pos.top = calc_y;

    for (node in node_move.connections) {
        var pair = node_move.connections[node];
        pair.line.setAttribute("x1", calc_x + 25);
        pair.line.setAttribute("y1", calc_y + 25);
        pair.line.setAttribute("x2", pair.node.offsetLeft + 25);
        pair.line.setAttribute("y2", pair.node.offsetTop + 25);

        if (!(pair.line.detail.weight === null)) {
            var x_pos = (calc_x + 25 + Number(pair.line.getAttribute("x2"))) / 2;
            var y_pos = (calc_y + 25 + Number(pair.line.getAttribute("y2"))) / 2;
            pair.line.detail.weight_rect.setAttribute("x", x_pos - 7.5);
            pair.line.detail.weight_rect.setAttribute("y", y_pos - 10);
        }
    }
    for (node in node_move.other_connections) {
        var pair = node_move.other_connections[node];
        pair.line.setAttribute("x2", calc_x + 25);
        pair.line.setAttribute("y2", calc_y + 25);
        if (!(pair.line.detail.weight === null)) {
            var x_pos = (calc_x + 25 + Number(pair.line.getAttribute("x1"))) / 2;
            var y_pos = (calc_y + 25 + Number(pair.line.getAttribute("y1"))) / 2;
            pair.line.detail.weight_rect.setAttribute("x", x_pos - 7.5);
            pair.line.detail.weight_rect.setAttribute("y", y_pos - 10);
        }
    }
}