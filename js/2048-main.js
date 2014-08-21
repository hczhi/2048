/**
 * @用于存放游戏的主体函数
*/

var cellbox_data,
	localStorage_data,
	score=0,
	time=0;
//初始化cellbox_data [obj,added{boolean}]
cellbox_data = (function(){
	var i=0,i2=0,arr=[];
	for(i;i<=3;i++){
		arr[i] = [];
		for(i2=0;i2<=3;i2++){
			arr[i][i2] = [null,false];
		}
	}
	return arr;
})();

//是否还有位置
var hasplace = function(){
	var data = cellbox_data,i,j,len2;
	splaceArray = [];
	for(i=0; i<4; i++){
		for(j = 0; j<4;j++){
			if(data[i][j][0] == null){splaceArray.push([i,j])};
		}
	}
	if(splaceArray.length>0){
		return splaceArray;
	}else{
		return false;
	}
};

var inithasConflict = function(){
	for(var y = 0 ; y<4 ; y++){	
		for(var x = 0 ; x<4 ;x++){
			cellbox_data[y][x][1] = false;
		}
	}	 
};


//数字
var numCell = function(createPosition){
	this.el = $("<div class='numcell' >");
	var data= (Math.random()>0.5)?init_data[0]:init_data[1];
	this.data = data;
	var fixed = parseInt(createPosition[0]*4)+parseInt(createPosition[1]);
	this.el.text(data.text);
	this.el.css({"left":cellFixed[fixed][0],"top":cellFixed[fixed][1],"background":data.color,"height":cellWidth,"line-height":cellWidth+"px"});
	$(".mainBox").append(this.el);
	animation.shownumcell(this.el,cellFixed[fixed][0],cellFixed[fixed][1]);
};


//生成数字
var createNum = function(){
	var Hasplace = hasplace()
	if(Hasplace){
		var len,randomNum,createPosition,numcell
		len = Hasplace.length;
		randomNum = Math.floor(Math.random()*len);
		createPosition = Hasplace[randomNum];
		numcell = new numCell(createPosition);
		cellbox_data[createPosition[0]][createPosition[1]][0] = numcell;
		// num_cellData.push(numcell);
		localStorage_data = "";
		for(var y = 0 ; y<4 ; y++){	
			for(var x = 0 ; x<4 ;x++){
				if(cellbox_data[y][x][0]!=null){
					localStorage_data+=y+"*"+x+"*"+cellbox_data[y][x][0].data.score+"|";
				}
			}
		}	 		
		if(window.localStorage){
			window.localStorage.setItem("hcgame_2048Data",localStorage_data);
			window.localStorage.setItem("hcgame_2048score",score);
		}
	}else{
		return false;
	}
};

var gameover = function(){
	setTimeout(function(){
		var Hasplace = hasplace();
		if(!Hasplace){
			if(!canmoveLeft()&&!canmoveUp()){
				var title = "我玩2048得到了"+score+"分，你也来玩一下吧~";
				document.title = title;
				alert("点击右上角分享按钮吧~ 么么哒")
			}
		}
	},1000)
};
var game = function(){
	this.star();
	this.control();
}
game.prototype = {
	star:function(){
		if(window.localStorage&&window.localStorage.hcgame_2048Data){
			this.continues();
			// cellbox_data = window.localStorage.getItem("hcgame_2048Data");
 		// 	this.continues();
		}else{
			this.inti();
			createNum();
			createNum();
		}
		
	},
	continues:function(){
		$(".grid-cell").each(function(i){
			$(this).css({"left":cellFixed[i][0],"top":cellFixed[i][1],"width":cellWidth,"height":cellWidth});
		});
		var sData = window.localStorage.getItem("hcgame_2048Data");
		var len,arr,i,len2 = init_data.length;
		sData = sData.replace(/\|$/,"");
		arr = sData.split("|");
		len = arr.length;
		for(i = 0;i<len;i++){
			var arr2 = arr[i].split("*");
			
			numcell = new numCell([arr2[0],arr2[1]]);
			for(var i2 = 0 ; i2<len2;i2++){
				if(arr2[2] == init_data[i2].score){
					numcell.data = init_data[i2];
					break;
				}
			};
			numcell.el.text(numcell.data.text);
			numcell.el.css({"background":numcell.data.color});
			cellbox_data[arr2[0]][arr2[1]][0] = numcell;
		} 
		score = parseInt(window.localStorage.getItem("hcgame_2048score"));
		$(".score").text(score);
	},
	control:function(){

		$(".mainBox")[0].addEventListener('touchstart',function(event){
		    startx = event.touches[0].pageX;
		    starty = event.touches[0].pageY;
		    event.preventDefault()
		});

		$(".mainBox")[0].addEventListener('touchend',function(event){
		    endx = event.changedTouches[0].pageX;
		    endy = event.changedTouches[0].pageY;

		    var deltax = endx - startx;
		    var deltay = endy - starty;

		    if( Math.abs( deltax ) < 0.3*_width && Math.abs( deltay ) < 0.3*_width )
		        return;

		    if( Math.abs( deltax ) >= Math.abs( deltay ) ){

		        if( deltax > 0 ){
		            //move right
		            if( moveRight() ){
		                setTimeout(function(){
		            		createNum();
		            	},300)
		               
		               inithasConflict();
		               gameover();
		            }
		        }
		        else{
		            //move left
		            if( moveLeft() ){
		                setTimeout(function(){
		            		createNum();
		            	},300)
		               
		               inithasConflict();
		               gameover();
		            }
		        }
		    }
		    else{
		        if( deltay > 0 ){
		            //move down
		            if( moveDown() ){
		                setTimeout(function(){
		            		createNum();
		            	},300)
		               
		               inithasConflict();
		               gameover();
		            }
		        }
		        else{
		            //move up
		            if( moveUp() ){
		                setTimeout(function(){
		            		createNum();
		            	},300)
		               
		               inithasConflict();
		               gameover();
		            }
		        }
		    }
		});


		$(document).keydown( function( event ){
			switch( event.keyCode ){
		        case 65: //left
		            if(moveLeft()){
		            	setTimeout(function(){
		            		createNum();
		            	},300)
		               
		               inithasConflict();
		               gameover();
		            }
		            break;
		        case 87: //up
		            if(moveUp() ){
		               setTimeout(function(){
		            		createNum();
		            	},300)
		               
		               inithasConflict();
		               gameover();
		            }
		            break;
		        case 68: //right
		            if(moveRight() ){
		              setTimeout(function(){
		            		createNum();
		            	},300)
		               
		               inithasConflict();
		               gameover();
		            }
		            break;
		        case 83: //down
		            if(moveDown() ){
		               setTimeout(function(){
		            		createNum();
		            	},300)
		               
		               inithasConflict();
		               gameover();
		            }
		            break;
		        default: 
		            break;
		    }
		})
	},
	inti:function(){
		score=0,
		time=0,
		cellbox_data = (function(){
			var i=0,i2=0,arr=[];
			for(i;i<=3;i++){
				arr[i] = [];
				for(i2=0;i2<=3;i2++){
					arr[i][i2] = [null,false];
				}
			}
			return arr;
		})();
		$(".numcell").each(function(){
			$(this).remove();
		});
		$(".score").text(0);
	}
}
var GAME = new game();
$(".newgame").click(function(){
	if(window.localStorage){
 			window.localStorage.removeItem("hcgame_2048Data");
 			window.localStorage.removeItem("hcgame_2048score");
 			$(".score").text(0);
	};
	$(".grid-cell").each(function(i){
		$(this).css({"left":cellFixed[i][0],"top":cellFixed[i][1],"width":cellWidth,"height":cellWidth});
	});
	GAME.star();
})