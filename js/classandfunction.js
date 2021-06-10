function clearArray(array) {
  while (array.length) {
    array.pop();
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

// console.log("hello");
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


