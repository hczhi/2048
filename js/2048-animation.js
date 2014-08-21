/**
 * @用于存放动画函数
*/
var animation = {};
animation.shownumcell = function(tar,x,y){
	tar.animate({"left":x,"top":y,"width":cellWidth,"height":cellWidth},200);
};
animation.showMoveAnimation = function(fromx , fromy , tox, toy){
	var fixed = cellFixed[tox*4+toy];
	cellbox_data[fromx][fromy][0].el.animate({"left":fixed[0],"top":fixed[1]},200);
}