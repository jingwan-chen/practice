var person = [
    { name: '张杰', src: 'zhangjie.jpg', sex: 'female', des: '唱歌很好听的小哥哥' },
    { name: '陈伟霆', src: 'chengweiting.jpg', sex: 'female', des: '长得很好看的小哥哥' },
    { name: '王一博', src: 'wangyibo.jpg', sex: 'female', des: '跳舞很好看的小哥哥' },
    { name: '孟美岐', src: 'mengmeiqi.jpg', sex: 'male', des: '长得很好看的小姐姐' },
    { name: '赖美云', src: 'laimeiyun.jpg', sex: 'male', des: '长得很好看的小姐姐' },
    { name: '陈芳语', src: 'chengfangyu.jpg', sex: 'male', des: '唱歌很好听的小姐姐' }
];
var oUl = document.getElementsByClassName('list')[0];
var oInp = document.getElementsByClassName('inp')[0];
var sexUl = document.getElementsByClassName('sex')[0];
var store = createStore({ 
    text: '', sex: 'all' 
});
function debounce(handle, delay) {
    var timer = null;
    return function () {
        var self = this;
        var arg = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            handle.apply(self, arg);
        }, delay);
    }
}
store.subscribe(function(){
    render(addFn(filter, person));
})
function render(list) {
    var str = '';
    list.forEach(function (ele, index) {
        str += '<li>\
        <img src="./touxiang/'+ ele.src + '" alt="">\
        <span class="name">'+ ele.name + '</span>\
        <span class="des">'+ ele.des + '</span>\
    </li>';
    })
    oUl.innerHTML = str;
}
render(person);

function deal() {
    // state.value = this.value;
    // state.text = this.value;
    store.dispatch({type:'text',value:this.value});
    console.log(this.value);
    // render(addFn(filter, person));
}
oInp.oninput = debounce(deal, 800);
function filterText(text, arr) {
    return arr.filter(function (ele, index) {
        if (ele.name.indexOf(text) !== -1 || ele.des.indexOf(text) !== -1) {
            return true;
        }
    })
}

sexUl.addEventListener('click', function (e) {
    if (e.target.tagName == 'LI') {
        // state.sex = e.target.getAttribute('sex');
        store.dispatch({type:'sex',value:e.target.getAttribute('sex')});
        document.getElementsByClassName('active')[0].className = '';
        e.target.className = 'active';
        // render(addFn(filter, person));
    }
})
function filterSex(sex, arr) {
    if (sex == 'all') {
        return arr;
    } else {
        return arr.filter(function (ele, index) {
            if (sex == ele.sex) {
                return true;
            }
        })
    }
}
//查找条件
// var state = {
//     text:'',
//     sex:'all'
// };
var filter = {
    text: filterText,
    sex: filterSex
}
function addFn(obj, arr) {
    var lastArr = arr;
    for (var prop in obj) {
        lastArr = obj[prop](store.getState()[prop], lastArr);
    }
    return lastArr;
}