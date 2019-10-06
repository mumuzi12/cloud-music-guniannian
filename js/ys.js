window.onload=function(){
    //获取需要的元素
    var box = document.getElementById("lyric");
    //获取文字内容div
    var content = document.getElementById("content");
//获取装滚动条的div
    var scroll = document.getElementById("scroll");
//获取滚动条的div
    var bar = document.getElementById("bar");

//设置滚动条的高
//    bar的高 / scroll的高 = box的高 / content的高
//    bar的高 = scroll的高 * box的高 / content的高
    var barHeight = scroll.offsetHeight * box.offsetHeight / content.offsetHeight;
    bar.style.height = barHeight + "px";

//移动滚动条
    bar.onmousedown = function (e) {
        var spaceY = e.clientY - bar.offsetTop;
        document.onmousemove = function (e) {
            var y = e.clientY - spaceY;
            //控制滚动条移动的最小最大距离
            y = y < 0 ? 0 : y;
            y = y > scroll.offsetHeight - bar.offsetHeight ? scroll.offsetHeight - bar.offsetHeight : y;
            bar.style.top = y + "px";

            //设置鼠标移动的时候,文字不被选中
            window.getSelection? window.getSelection().removeAllRanges():document.selection.empty();

            //滚动条移动的距离/文字移动距离=滚动条最大移动距离/文字最大移动距离
            //文字移动距离 = 滚动移动距离*文字最大移动距离/滚动条最大移动距离
            var moveY = y * (content.offsetHeight - box.offsetHeight) / (scroll.offsetHeight - bar.offsetHeight);
            //设置文字div移动距离
            content.style.marginTop = -moveY + "px";
        };
    };
    document.onmouseup = function () {
        //鼠标抬起的时候,把移动事件干掉
        document.onmousemove = null;
    };



};