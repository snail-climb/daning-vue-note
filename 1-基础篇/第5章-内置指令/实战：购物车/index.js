var app = new Vue({
    el: '#app',
    data: {
        list: [{
                id: 1,
                name: 'iPhone 7',
                price: 6188,
                count: 1,
                status: true,
                msg: '已选中'
            },
            {
                id: 2,
                name: 'iPad Pro',
                price: 5888,
                count: 1,
                status: true,
                msg: '已选中'
            },
            {
                id: 3,
                name: 'MacBook Pro',
                price: 21488,
                count: 1,
                status: true,
                msg: '已选中'
            }
        ],
        msg: '已全选'
    },
    methods: {
        handleReduce: function(index) {
            var item = this.list[index];
            if (item.count === 1)
                alert('该宝贝不能减少了呦~');
            else
                item.count--;
        },
        handleAdd: function(index) {
            this.list[index].count++;
        },
        handleRemove: function(index) {
            // 从索引值为 index 处开始移除1个元素
            this.list.splice(index, 1);
        },
        handleChoice: function(index) {
            var item = this.list[index];
            item.status === true ? item.status = false : item.status = true;
            if (item.status) {
                item.msg = '已选中';
            } else {
                item.msg = '未选中';
            }
            // 已选数量
            var count1 = 0;
            // 未选数量
            var count2 = 0;
            var len = this.list.length;
            for (var i = 0; i < len; i++) {
                var item = this.list[i];
                if (count1 > 0 && count2 > 0)
                    break;
                if (item.status)
                    count1++;
                else count2++;
            }
            if (count1 === len)
                this.msg = '已全选';
            else if (count2 !== len)
                this.msg = '未全选';
        },
        handleChoiceAll: function() {
            var len = this.list.length;
            var flag;
            if (this.msg === '已全选') {
                this.msg = '未全选';
                flag = false;
            } else {
                this.msg = '已全选';
                flag = true;
            }
            for (var i = 0; i < len; i++) {
                var item = this.list[i];
                item.status = flag;
                if (flag)
                    item.msg = '已选中';
                else
                    item.msg = '未选中';
            }
        }
    },
    computed: {
        totalPrice: function() {
            var total = 0;
            var len = this.list.length;
            for (var i = 0; i < len; i++) {
                var item = this.list[i];
                if (item.status)
                    total += item.price * item.count;
            }
            return total.toString().replace(/\B(?=(\d{3})+$)/g, ',');
        }
    }
});