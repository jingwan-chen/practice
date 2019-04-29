var nowIndex = 0;
var len = 6;
var itemWidth = 500;
var timer ;
var flag = true;
function init() {
    sliderAuto();
    bindEvent();
     
}
init();
function bindEvent() {
    $('.order li').add('.prev').add('.next').on('click', function () {
        if ($(this).attr('class') == 'prev') {
            //prev-->nowPicIndex - 1
            move('prev');
        } else if ($(this).attr('class') == 'next') {
            //next-->nowPicIndex + 1
            move('next');
        } else {
            //li-->li.index
            move($(this).index());
        }
        changeStyle();
    });
    $('.wrapper').on('mouseenter',function(){
        $('.btn').show();
        clearTimeout(timer);
    })
    $('.wrapper').on('mouseleave',function(){
        $('.btn').hide();
        slider();
    })
}

function move(dir) {
    if(flag){
        flag = false;
        if (dir == 'prev' || dir == 'next') {
            if (dir == 'prev') {
                if (nowIndex == 0) {
                    $('.box').css('left', -(len * itemWidth) + 'px');
                    nowIndex = len - 1;
                } else {
                    nowIndex--;
                }
            } else {
                if (nowIndex == len - 1) {
                    $('.box').animate({ 'left': -(len * itemWidth) + 'px'}, function () {
                        $(this).css('left', '0');
                        sliderAuto();
                        flag = true;
                    });
                    nowIndex = 0;
                } else {
                    nowIndex++;
                }
            }
        } else {
            nowIndex = dir;
        }
        slider(); 
    }
  
}
function slider() {
    $('.box').animate({'left':-(nowIndex * itemWidth) + 'px'},function(){
        sliderAuto();
        flag = true;
    });
}
//切换class类名
function changeStyle() {
    $('.active').removeClass('active');
    $('.order li').eq(nowIndex).addClass('active');
}
function sliderAuto(){
    clearTimeout(timer);
    timer = setTimeout(function(){
        move('next');
        changeStyle();
    },1000)
}







