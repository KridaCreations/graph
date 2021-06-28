var tutorial_text = {
	"0":"1)Click on the 'T' button to bring out the tools to draw graph." + "\n" +"\
		 2)Click on the 'A' button to access the animation tools." +"\n" +"\
		 3)Click on the button pointed by 'Graph Script' arrow to access the Graph Generation Tool."+"\n" +"\
		 4)we will learn about adding node in next slide, so click on 'T' and open the tools pannel.",
	"1":"1)Choose the 'ADD' Option."+"\n" +"\
		 2)Click anywhere on the graph drawing area to add a node."+"\n" +"\
		 3)The node will be assigned a unique number."+"\n" +"\
		 4)You can add as many nodes you want,Try adding more Nodes."+"\n" +"\
		 5)You can't add your own name/number to the node as this feature is not available for now, this will be added at the final release of the application."+"\n" +"\
		 6)Now we will learn about deleting the Node you have added.",
	"2":"1)Choose the 'DELETE' Option."+"\n" +"\
		 2)Click on the node you want to delete.",
	"3":"1)'Whoose!! Node deleted"+"\n" +"\
		 2)Now we will learn about foccusing the Node.",
	"4":"1)Choose the 'FOCUS' option"+"\n" +"\
		 2)Click on the node you want to focus."+"\n" +"\
		 3)The border of clicked node will become green to specify that it's the 'foccused Node' "+"\n" +"\
		 4)Now we will learn about how to move a Node",
	"5":"1)Choose the 'MOVE' option"+"\n" +"\
		 2)Now you can DRAG AND DROP  any node to move it all the edges incident and outgoing from it will chnage too",
	"6":"Easy Till Now!!!"+"\n" +"\
		 Now we will learn about how to Connect two Nodes",
	"7":"1)Choose the 'CONNECT' option"+"\n" +"\
		 2)Choose the type of connection you want"+"\n" +"\
		 3)four types of connection are there"+"\n" +"\
		   "+" a)Bidirectional Unweighted"+"\n" +"\
		   "+" b)Unidirectional Unweighted "+"\n" +"\
		   "+" c)Bidirectional Weighted "+"\n" +"\
		   "+" d)Unidirectional Weighted",
	"8":"1)foccus on one of the node(ignore this step if already focused)"+"\n" +"\
		 2)Now click on another nodes you want to establish connections"+"\n" +"\
		 3)if the new connection is Unidirectional, then the connection we drawn as outgiong from foccused node to the clicked node"+"\n" +"\
		 4)to remove the foccus of the current node click on the foccused node itself",
	"9":"Easy till now!!! you can draw large graphs more larger than shown above "+"\n" +"\
		 Now we will move towards running and visualizing animations on them",
	"10":"1)choose the algorithm you want to visualize",
	"11":"1)Foccus on the node which you want to be the starting point"+"\n" +"\
		 2)Click on BAKE ANIMATION button"+"\n" +"\
		 3)You will see the slider is shifted to Zero(if not at zero already)"+"\n" +"\
		 4)Your animation is ready to play",
	"12":"1)Click in PLAY ANIMATION button"+"\n" +"\
		 2)The play button will change to stop button and animation will start playing"+"\n" +"\
		 3)you can click on the stop button to PAUSE the animation"+"\n" +"\
		 4)The delay is the time taken between each frame"+"\n" +"\
		 5)First frame is always blank frame ",
	"13":"1)You can set delay by changing the slider"+"\n" +"\
		 2)Less delay means faster animations"+"\n" +"\
		 3)More delay means slower animations",
	"14":"1)You can click on the forward and back button to move the frame of slider forward and backward"+"\n" +"\
		 2)Also you can change the animation frame by using the slider",
	"15":"(This feature is UNSTABLE)"+"\n" +"\
		 1)still you can click on the generate button to generate a graph from the loaded script"+"\n" +"\
		 2)each row has a syntax"+"\n" +"\
		 3)suppose a row is '1 2 1 98'"+"\n" +"\
		 4)'1 2' means the connection is to be drawn from 1 to 2"+"\n" +"\
		 5)'1' after 2 means the type of connection"+"\n" +"\
		 6)type '1' means 'bidirectional unweights'"+"\n" +"\
		 7)and '68' after '1' means the weight of line if line is weighted",
} 

for (var i = 0;i<slides.length;i++)
{
	slides[i].children[1].innerText = tutorial_text[i];
}