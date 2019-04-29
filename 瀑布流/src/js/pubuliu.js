(function () {
    var num = 1;
    var oLi = $('li');
    var flag = false;
    getData();
    function getData() {
        if (!flag) {
            num ++;
            flag = true;
            
            $.ajax({
                type: 'GET',
                url: 'http://localhost/pubuliu/src/getPics.php?cPage=' + this.num,
                success: addDom,
                beforeSend: function () {
                    $('.loading').show();

                },
                error: function () {
                    alert('error!');
                }
            });
           
        }

    }
    function addDom(data) {
        $('.loading').hide();
        var dataList = JSON.parse(data);
        console.log(dataList);
        if (dataList.length > 0) {
            dataList.forEach(function (ele, index) {
                var oDiv = $('<div class="item"></div>');
                var imgBox = $('<div class="image"></div>');
                var oImg = new Image();
                var oP = $('<p></p>');
                oP.text(ele.title);
                oImg.src = ele.preview;
                oImg.onload = function () {
                    imgBox.append(oImg);
                    oDiv.append(imgBox).append(oP);
                    var index = getMinHeight(oLi);
                    $(oLi[index]).append(oDiv);
                }
            })
        }
        flag = false;

    }
    function getMinHeight(dom) {
        var minHeight = parseInt($(dom[0]).css('height'));
        var index = 0;
        for (var i = 1; i < dom.length; i++) {
            var height = parseInt($(dom[i]).css('height'));
            if (height < minHeight) {
                minHeight = height;
                index = i;
            }
        }
        console.log(index);
        return index;
    }
    $(window).scroll(function () {
        var scrollHeight = $(window).scrollTop();
        var clientHeight = $(window).height();
        var minLiH = parseInt($(oLi[getMinHeight(oLi)]).css('height'));
        if (scrollHeight + clientHeight > minLiH) {
            getData();
        }
    })

})()