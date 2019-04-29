// var state = {
//        text:'',
//         sex:'all'
// }
function createStore(initSate) {
    var list = [];
    var state = initSate;
    //返回状态
    function getState() {
        return state;
    }
    //修改状态 state action-->{type:'text',value:''}
    function dispatch(action) {
        state[action.type] = action.value;
        list.forEach(function (ele, index) {
            ele();
        })
    }
    //订阅
    function subscribe(handle) {
        list.push(handle);
    }
    return {
        getState: getState,
        dispatch: dispatch,
        subscribe: subscribe
    }
}
//  var store = createStore({ text: '', sex: 'all' });
//  console.log(store);