/**
 * @用于存放工具函数
*/

/*初始数据*/
var init_data = [
	{
		text:"2",
		color:"#FADFC1",
		score:2
	},
	{
		text:"4",
		color:"#FAD1A4",
		score:4
	},
	{
		text:"8",
		color:"#F6C38B",
		score:8
	},
	{
		text:"16",
		color:"#F6D88B",
		score:16
	},
	{
		text:"32",
		color:"#F7D46C",
		score:32
	},
	{
		text:"64",
		color:"#FDC140",
		score:64
	},
	{
		text:"128",
		color:"#FDA240",
		score:128
	},
	{
		text:"256",
		color:"#E68D2D",
		score:256
	},
	{
		text:"512",
		color:"#E6E62D",
		score:512
	},
	{
		text:"1024",
		color:"#D1F853",
		score:1024
	},
	{
		text:"2048",
		color:"#9DF72C",
		score:2048
	}
];

/**坐标**/
var _width = ($(".mainBox").width()>500)?500:$(".mainBox").width();
$(".mainBox").width(_width)
$(".mainBox").height(_width)
var cellWidth = Math.floor(_width/5);
var padding = Math.floor(_width/25)
var cellFixed = (function(){
	var fixedcellArray = [];
	for(var y = 0 ; y<4 ; y++){
		for(var x = 0 ; x<4 ;x++)
			fixedcellArray.push([padding*(x+1)+x*cellWidth,padding*(y+1)+y*cellWidth]);
	}
	return 	fixedcellArray;
})();

/*对底层div进行定位*/
(function(){
	$(".grid-cell").each(function(i){
		$(this).css({"left":cellFixed[i][0],"top":cellFixed[i][1],"width":cellWidth,"height":cellWidth});
	});
})();


function noBlockHorizontal( row , col1 , col2 ){
    for( var i = col1 + 1 ; i < col2 ; i ++ )
        if( cellbox_data[row][i][0] != null )
            return false;
    return true;
}

function noBlockVertical( col , row1 , row2 ){
    for( var i = row1 + 1 ; i < row2 ; i ++ )
        if( cellbox_data[i][col][0] != null )
            return false;
    return true;
}
function hasConflicted(col,row){
	if(hasConflict[col][row]==1){
		return true;
	}
	return false;
}
function addcell(cellNum){
	var i,val,len=init_data.length;
	if(cellNum == init_data[len-1].score){
			return false;
	}
	for(i = 0 ; i<len;i++){
		if(cellNum == init_data[i].score){
			score += init_data[i].score;
			$(".score").text(score);
			return init_data[i+1];
		}
	}
	return false;
}


var canmoveLeft = function(){
	for(var i = 0;i<4;i++){
		for(var j = 1; j<4;j++){
			if(cellbox_data[i][j][0]!== null){
				if(cellbox_data[i][j-1][0]== null||cellbox_data[i][j-1][0].data.score==cellbox_data[i][j][0].data.score){
					return true;
				}
			}
		}
	}
	return false;
};
var canmoveRight = function(){
	for(var i = 0;i<4;i++){
		for(var j = 0; j<3;j++){
			if(cellbox_data[i][j][0]!== null){
				if(cellbox_data[i][j+1][0]== null||cellbox_data[i][j+1][0].data.score==cellbox_data[i][j][0].data.score){
					return true;
				}
			}
		}
	}
	return false;
};
var canmoveUp = function(){
	for(var i = 1;i<4;i++){
		for(var j = 0; j<4;j++){
			if(cellbox_data[i][j][0]!== null){
				if(cellbox_data[i-1][j][0]== null||cellbox_data[i-1][j][0].data.score==cellbox_data[i][j][0].data.score){
					return true;
				}
			}
		}
	}
	return false;
};
var canmoveDown = function(){
	for(var i = 0;i<3;i++){
		for(var j = 0; j<4;j++){
			if(cellbox_data[i][j][0]!== null){
				if(cellbox_data[i+1][j][0]== null||cellbox_data[i+1][j][0].data.score==cellbox_data[i][j][0].data.score){
					return true;
				}
			}
		}
	}
	return false;
};

var moveLeft = function(){

	if(!canmoveLeft()){
		return false;
	}
	for(var i = 0;i<4;i++){
		for(var j = 1; j<4;j++){
			for(var k = 0 ; k<j ; k++){
				if(cellbox_data[i][j][0]!== null){
							if(cellbox_data[i][k][0] == null && noBlockHorizontal(i,k,j)){
								animation.showMoveAnimation( i , j , i , k );
								cellbox_data[i][k][0] = cellbox_data[i][j][0];
	                        	cellbox_data[i][j][0]= null;
								continue;
							}else if(cellbox_data[i][k][0].data.score == cellbox_data[i][j][0].data.score && noBlockHorizontal(i,k,j)&&!cellbox_data[i][k][1]){
								var value = addcell(cellbox_data[i][j][0].data.score);
								if(value){
									animation.showMoveAnimation( i , j , i , k );
									cellbox_data[i][k][0].el.remove();
									cellbox_data[i][k][0] = cellbox_data[i][j][0];
									cellbox_data[i][k][0].data = value;
									cellbox_data[i][j][0]= null;
				                    cellbox_data[i][k][0].el.text(value.score);
				                    cellbox_data[i][k][0].el.css({"background":value.color});
				                    cellbox_data[i][k][1] = true;
									
										
									
									
								}
								continue;
							}
				}
			}
		}
	}
	return true;
};

var moveRight = function(){

	if(!canmoveRight()){
		return false;
	}
	for(var i = 0;i<4;i++){
		for(var j = 2; j>=0;j--){
			for(var k = 3 ; k>j ; k--){
				if(cellbox_data[i][j][0]!== null){
							if(cellbox_data[i][k][0] == null && noBlockHorizontal(i,j,k)){
								animation.showMoveAnimation( i , j , i , k );
								cellbox_data[i][k][0] = cellbox_data[i][j][0];
	                        	cellbox_data[i][j][0]= null;
								continue;
							}else if(cellbox_data[i][k][0].data.score == cellbox_data[i][j][0].data.score && noBlockHorizontal(i,j,k)&&!cellbox_data[i][k][1]){
								var value = addcell(cellbox_data[i][j][0].data.score);
								if(value){
									animation.showMoveAnimation( i , j , i , k );
										cellbox_data[i][k][0].el.remove();
										cellbox_data[i][k][0] = cellbox_data[i][j][0];
										cellbox_data[i][k][0].data = value;
										cellbox_data[i][j][0]= null;
			                        	cellbox_data[i][k][0].el.text(value.score);
			                        	cellbox_data[i][k][0].el.css({"background":value.color});
			                        	cellbox_data[i][k][1] = true;
									
								}
								continue;
							}
				}
			}
		}
	}
	return true;
};
var moveUp = function(){

	if(!canmoveUp()){
		return false;
	}
	for(var i = 0;i<4;i++){
		for(var j = 1; j<4;j++){
			for(var k = 0 ; k<j ; k++){
				if(cellbox_data[j][i][0]!== null){
							if(cellbox_data[k][i][0] == null && noBlockVertical(i,k,j)){
								animation.showMoveAnimation( j , i , k , i );
								cellbox_data[k][i][0] = cellbox_data[j][i][0];
	                        	cellbox_data[j][i][0]= null;
								continue;
							}else if(cellbox_data[k][i][0].data.score == cellbox_data[j][i][0].data.score && noBlockVertical(i,k,j)&&!cellbox_data[k][i][1]){
								var value = addcell(cellbox_data[j][i][0].data.score);
								if(value){
										cellbox_data[k][i][0].el.remove();
										animation.showMoveAnimation( j , i , k , i );
										
										cellbox_data[k][i][0] = cellbox_data[j][i][0];
										cellbox_data[k][i][0].data = value;
										cellbox_data[j][i][0]= null;
			                        	cellbox_data[k][i][0].el.text(value.score);
			                        	cellbox_data[k][i][0].el.css({"background":value.color});
			                        	cellbox_data[k][i][1] = true;
								}
								continue;
							}
				}
			}
		}
	}
	return true;
};
var moveDown = function(){

	if(!canmoveDown()){
		return false;
	}
	for(var i = 0;i<4;i++){
		for(var j = 2; j>=0;j--){
			for(var k = 3 ; k>j ; k--){
				if(cellbox_data[j][i][0]!== null){
							if(cellbox_data[k][i][0] == null && noBlockVertical(i,j,k)){
								animation.showMoveAnimation( j , i , k , i );
								cellbox_data[k][i][0] = cellbox_data[j][i][0];
	                        	cellbox_data[j][i][0]= null;
								continue;
							}else if(cellbox_data[k][i][0].data.score == cellbox_data[j][i][0].data.score && noBlockVertical(i,j,k)&&!cellbox_data[k][i][1]){
								var value = addcell(cellbox_data[j][i][0].data.score);
								if(value){
										animation.showMoveAnimation( j , i , k , i );
										cellbox_data[k][i][0].el.remove();
										cellbox_data[k][i][0] = cellbox_data[j][i][0];
										cellbox_data[k][i][0].data = value;
										cellbox_data[j][i][0]= null;
			                        	cellbox_data[k][i][0].el.text(value.score);
			                        	cellbox_data[k][i][0].el.css({"background":value.color});
			                        	cellbox_data[k][i][1] = true;
									
								}
								continue;
							}
				}
			}
		}
	}
	return true;
};

//weixin
	$(".share").on("click",function(){
		var title = "我玩2048得到了"+score+"分，你也来玩一下吧~";
		document.title = title;
		alert("点击右上角分享按钮吧~ 么么哒")
	})