document.querySelector("#top").addEventListener("click",to_top);
document.querySelector("#bottom").addEventListener("click",to_bottom);
var to_element = document.querySelector("#a1");
var scroll_box = document.querySelector("#scroll_box");
function to_top (argument) {
  console.log(typeof scroll_box.scrollTop);
  console.log(scroll_box["scrollTop"]);
  scrollTopoint(scroll_box,0,3000);
}

function to_bottom (argument) {
  console.log(typeof scroll_box.scrollTop);
  console.log(scroll_box["scrollTop"]);
  scrollTopoint(scroll_box,300,3000);
}



function animate_property(element,property,final_value,duration,permanent)
{
  var animation =  element.animate(
      [
        {property : element.style[property] },
        {property : final_value}
      ],duration
    );
  animation.onfinish = function()
  {
    if (permanent === true)
    {
      element.style[property] = final_value;
    }
  };
}


function animate_property(element,property,final_value,duration,permanent)
{
  var animation =  element.animate(
      [
        {property : element[property] },
        {property : final_value}
      ],duration
    );
  console.log(animation );
  animation.onfinish = function()
  {
    if (permanent === true)
    {
      element[property] = final_value;
    }
  };
}


// function scrollTopoint (element,to,duration) {
//      var currentTime = 0;
//      var timer = setInterval(scroll, 100/6);
//      console.log("timer "+ timer);
//      var scroll_increment = ((to - element.scrollTop)*(100/6))/duration;
//      var case1 = false;
//      var case2 = false;
//      function scroll(timer)
//      {
//         element.scrollTop +=  scroll_increment;
//         currentTime += (100/6);
        
//         console.log("scrollTop "+element.scrollTop + " duration " + currentTime);
//         console.log("to "+to + " duration "+duration );
//         console.log("scroll_increment " +scroll_increment + " time_increment "+(100/6));
//         console.log(Math.abs(element.scrollTop - to) );
//         console.log("-----step-----");
//         if (currentTime >= duration)
//         {
//           case1 = true;
//         }
//         if (Math.abs(element.scrollTop - to)<=Math.abs(scroll_increment))
//         {
//           case2 = true;
//         }
//         if ((case1 === true) && (case2 === true))
//         {
//           console.log("clear");
//           clear_timer();
//         }
//      }
//      function clear_timer()
//      {
//       console.log("scrollTop "+element.scrollTop);
//       console.log("to "+to );
//       console.log("scroll_increment " +scroll_increment);
//       console.log(Math.abs(element.scrollTop - to));
//       console.log("-----step-----");
//       clearInterval(timer);
//      }

//   }


function scrollTopoint (element,to,duration) {
  console.log("here");
  var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 10;

  var animateScroll = function(){
    console.log("offset "+to_element.offsetTop);
    console.log("scroll_box "+scroll_box.scrollTop);
    currentTime += increment;
    var val = Math.easeInOutQuad(currentTime,start,change,duration);
    element.scrollTop = val;
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);

    }
  };
  animateScroll();
}

Math.easeInOutQuad = function (t,b,c,d) {
  console.log("here");
  t /= d/2;
    if (t<1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2)-1) + b;
};