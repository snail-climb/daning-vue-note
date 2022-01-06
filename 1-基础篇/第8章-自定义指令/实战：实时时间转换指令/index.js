var app = new Vue({
    el: '#app',
    data: {
        // 当前时间的时间戳
        timeNow: (new Date()).getTime(),
        // 写死的时间戳，2021-06-01
        timeBefore: 1622505600000
    }
});