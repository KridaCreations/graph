

var node = document.querySelector("#graph");
	console.log("----------debugging--------");
	console.log("graph_coordinates")
	console.log(node.offsetLeft);
	console.log(node.offsetTop);
	console.log("Client");
	console.log(event.clientX);
	console.log(event.clientY);
	console.log("offset");
	console.log(event.offsetX);
	console.log(event.offsetY);
	console.log("page");
	console.log(event.pageX);
	console.log(event.pageY);
	console.log("screen");
	console.log(event.screenX);
	console.log(event.screenY);


// new_node.offsetLeft = event.offsetX - 25;
				new_node.css += "left:${event.offsetX - 25}px;top: ${event.offsetY -25}px;"
				// var str = `<div class="node" id="node${node_number}" style="left:${event.offsetX - 25}px;top: ${event.offsetY -25}px;">${node_number}</div>`;
				// graph.innerHTML += str;
				// var new_node = document.querySelector("#node" + node_number);

	
		<!-- <button id="add" style="margin-top: 2px;">ADD</button>
		<button id="delete" style="margin-top: 2px;">DELETE</button>
		<button id="move" style="margin-top: 2px;">MOVE</button>
		<button id="focus" style="margin-top: 2px;">FOCUS</button>
		<button id="connect" style="margin-top: 2px;">CONNECT</button> -->




function node_mouse_up(event)
{
	event.stopPropagation();
	if (move_button.checked === true)
	{
		this.pressed = false;
	}
}

function node_mouse_move(event)
{
	if (this.pressed === false)
	{

	}
	else
	{
		event.stopPropagation();
		move_node(this,event);
	}
}

function move_node(node,event)
{
	console.log("X "+event.movementX );
	console.log("Y "+event.movementY );
	// node.style.left = event.offsetX - 25 + node.style.left;
	// node.style.top = event.offsetY -25 + node.style.top;
	

	// node.style.left += event.movementX;
	// node.style.top += event.movementY;
}

function node_mouse_move(event)
{
	if (this.pressed === false)
	{

	}
	else
	{
		event.stopPropagation();
		move_node(this,event);
	}
}

function move_node(node,event)
{
	console.log("X "+event.movementX );
	console.log("Y "+event.movementY );
}



console.log("here");
	// var new_line = `<line x1=${from.offsetLeft} y1=${from.offsetTop} x2=${to.offsetLeft} y2=${to.offsetTop} style="stroke:rgb(255,0,0);stroke-width:2" />`;
	var new_line = document.createElementNS("http://www.w3.org/2000/svg","line");
	new_line.setAttribute("x1",from.offsetLeft);
	new_line.setAttribute("y1",from.offsetTop);
	new_line.setAttribute("x2",to.offsetLeft);
	new_line.setAttribute("y2",to.offsetTop);
	new_line.setAttribute("style","stroke:rgb(255,0,0);stroke-width:2");
	draw_area.append(new_line);

	// draw_area.inner_HTML += new_line;
	console.log(from);
	console.log(to);
	console.log(to.offsetLeft);
	console.log(to.offsetTop);


	<!-- <svg id="draw_area" width="600px" height="600px">
			<defs><line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2" /></defs>
		</svg> -->




		
			<!-- <line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2" /> -->




console.log(from);
	console.log(to);
	console.log(from.offsetLeft+" "+from.offsetTop);
	console.log(to.offsetLeft+" "+to.offsetTop);
	
	new_line.setAttribute("x1",from.offsetLeft );
	new_line.setAttribute("y1",from.offsetTop );
	new_line.setAttribute("x2",to.offsetLeft );
	new_line.setAttribute("y2",to.offsetTop );
	console.log(new_line.getAttribute("x1")+ " "+new_line.getAttribute("y1"));
	console.log(new_line.getAttribute("x2") + " "+new_line.getAttribute("y2"));




const pt1 = draw_area.createSVGPoint();
	const pt2 = draw_area.createSVGPoint();

	// pass event coordinates
	pt1.x = from.offsetLeft;
	pt1.y = from.offsetTop;

	pt2.x = event.clientLeft;
	pt2.y = event.clientTop;
	const svgP1 = pt1.matrixTransform(draw_area.getScreenCTM().inverse() );
	const svgP2 = pt2.matrixTransform(draw_area.getScreenCTM().inverse() );

	new_line.setAttribute("x1",svgP1.x);
	new_line.setAttribute("y1",svgP1.y);
	new_line.setAttribute("x2",svgP2.x);
	new_line.setAttribute("y2",svgP2.y);
  	// pt1.y = to.offsetTop;
	// pt2.y = to.offsetTop;
	new_line.setAttribute("style","stroke:rgb(255,0,0);stroke-width:4");





	// if (add_button.checked === true)
		// {
		// 	if (event.currentTarget === event.target)
		// 	{
		// 		node_number+=1;
		// 		var new_node = document.createElement("div");
		// 		new_node.id = "node" + node_number;
		// 		graph.append(new_node);
		// 		new_node.className += "node";
		// 		new_node.textContent = node_number;
		// 		new_node.style=`left:${event.offsetX - 25}px;top: ${event.offsetY -25}px;`;
		// 		new_node.addEventListener('click',node_click);
		// 		new_node.draggable = true;
		// 		new_node.addEventListener('dragstart',node_drag_start);
		// 		new_node.addEventListener('drag',node_drag);
		// 	}
		// }
		// else if(focus_button.checked === true)
		// {
		// 	if(!(foccused_node === null))
		// 	{
		// 		foccused_node.style.border= "4px solid yellow";
		// 		foccused_node = null;
		// 	}
		// }




<line xmlns="http://www.w3.org/2000/svg" x1 = "00" y1 = "00" x2 = "80" y2 = "0" style = "stroke:rgb(255,0,0);stroke-width:4"/>


<div class="node" style = "left:80px;top: 0px; ">1</div>




 //    ev.stopPropagation();
 //    var dragged_node = document.getElementById(src)
 //    for (node in dragged_node.connections)
	// {
	// 	var pair = dragged_node.connections[node];
	// 	pair.line.setAttribute("x1" , dragged_node.offsetLeft+25 );
	// 	pair.line.setAttribute("y1" , dragged_node.offsetTop+25 );
	// 	pair.line.setAttribute("x2" , pair.node.offsetLeft + 25);
	// 	pair.line.setAttribute("y2" , pair.node.offsetTop + 25);
	// }
    // return false;





    // ev.stopPropagation();
    
    // console.log("drag_drop");
    // console.log(ev.target);











function dragEnter(ev) 
// {
// 	if (event.currentTarget === event.target)
// 	{
// 		return false;
// 	} 
// 	return false;
// }
// function dragOver(ev) 
// {
// 	if (event.currentTarget === event.target)
// 	{

// 		return false;
// 	}
// 	return false;
// }
// function dragDrop(ev) 
// {
// 	console.log(ev.target);
// 	console.log(ev.currentTarget);
//  	if (ev.currentTarget === ev.target)
// 	{
// 		console.log(ev.target);
// 		ev.stopPropagation();
// 		var src = ev.dataTransfer.getData("Text");
// 		document.getElementById(src).style=`left:${ev.offsetX -25}px;top: ${ev.offsetY -25}px;`
// 		return false;
// 	}

// }









// function node_drag(ev)
// {
// 	console.log("hello");
// 	for (node in this.connections)
// 	{
// 		var pair = this.connections[node];
// 		pair.line.setAttribute("x1" , ev.offsetX - drag_offsetX + 25 + this.offsetLeft );
// 		pair.line.setAttribute("y1" , ev.offsetY - drag_offsetY + 25 + this.offsetTop );
// 		pair.line.setAttribute("x2" , pair.node.offsetLeft + 25);
// 		pair.line.setAttribute("y2" , pair.node.offsetTop +25);
// 	}
// }


// var drag_offsetX;
// var drag_offsetY;
// function node_drag_start(ev)
// {
// 	ev.dataTransfer.effectAllowed = 'move';
// 	drag_offsetY = ev.offsetY;
// 	drag_offsetX = ev.offsetX;
//     ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
//     return true;
// }






// this.style=`left:${event.offsetX + this.offsetLeft }px;top: ${event.offsetY  + this.offsetTop }px;`;
		// this.style=`left:${event.offsetX + this.offsetLeft + node_drag_offsetX }px;top: ${event.offsetY  + this.offsetTop +node_drag_offsetY }px;`;
		this.style=`left:${event.offsetX + this.offsetLeft - 25 }px;top: ${event.offsetY  + this.offsetTop - 25 }px;`;
		// this.style=`left:${event.movementX + this.offsetLeft   }px;top: ${event.movementY  + this.offsetTop   }px;`;
		// this.offsetLeft=event.movementX + this.offsetLeft;
		// this.offsetTop=event.movementY + this.offsetTop;








// new_node.addEventListener('mouseup',node_mouse_up);
			// new_node.addEventListener('mousemove',node_mouse_over);
			// new_node.draggable = true;
			// new_node.addEventListener('dragstart',node_drag_start);
			// new_node.addEventListener('drag',node_drag);







// var p_x = 0;
	// var p_y = 0;
	// var present_node = event.target;
	// console.log(this.parentNode);
	// // while( !(event.currentTarget === present_node))
	// // {
	// // 	p_x += present_node.offsetX;
	// // 	p_y += present_node.offsetY;
	// // 	present_node = present_node.parentNode;
	// // }
	// console.log(present_node);












	////code for adding rect

	var new_rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
	new_rect.className += " svg_graphics";
	draw_area.append(new_rect);
	console.log(dialog.line.getAttribute("x1"));
	console.log(dialog.line.getAttribute("x2"));
	var x_pos = (Number(dialog.line.getAttribute("x1"))+ Number(dialog.line.getAttribute("x2")))/2;
	var y_pos = (Number(dialog.line.getAttribute("y1")) + Number(dialog.line.getAttribute("y2")))/2;
	console.log(x_pos);
	new_rect.setAttribute("x" , x_pos-7.5);
	new_rect.setAttribute("y" , y_pos-10);
	new_rect.setAttribute("width" , 20);
	new_rect.setAttribute("height" , 15);
	dialog.line.detail.weight_rect = new_rect;
	dialog.close();





	// var new_node = document.createElement("div");
			// new_node.id = "node" + node_number;
			// graph.append(new_node);
			// new_node.connections = {};
			// new_node.other_connections = {};
			// new_node.className += "node";
			// new_node.textContent = node_number;
			// new_node.pressed = false;
			// new_node.style=`left:${event.offsetX + p_x - 25}px;top: ${event.offsetY + p_y -25}px;`;
			// new_node.addEventListener('click',node_click);
			// new_node.addEventListener('mouseup',node_mouse_up);
			// new_node.addEventListener('mousedown',node_mouse_down);