function isValueNumber(value) {
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '');
}
// 数字输入框组件
Vue.component('input-number', {
    props: {
        value: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        }
    },
    template: '\
            <div class="input-number">\
                <input\
                    type="text"\
                    :value="currentValue"\
                    @change="handleChange">\
                <button\
                    @click="handleDown"\
                    :disabled="currentValue <= min">-</button>\
                <button\
                    @click="handleUp"\
                    :disabled="currentValue >= max">+</button>\
            </div>',
    data: function() {
        return {
            currentValue: this.value
        };
    },
    watch: {
        // 监听的数据的回调函数有2个参数可用，第一个是新值，第二个是旧值
        currentValue: function(val) {
            // 使用 v-model 时改变 value
            this.$emit('input', val);
            // 触发自定义事件 on-change，用于告知父组件数字输入框的值有所改变（示例中没有使用该事件）
            this.$emit('on-change', val);
        },
        value: function(val) {
            this.updateValue(val);
        }
    },
    methods: {
        updateValue: function(val) {
            if (val > this.max)
                val = this.max;
            if (val < this.min)
                val = this.min;
        },
        handleChange: function(event) {
            var val = event.target.value.trim();
            var max = this.max;
            var min = this.min;
            if (isValueNumber(val)) {
                val = Number(val);
                this.currentValue = val;
                if (val > max) {
                    this.currentValue = max;
                } else if (val < min) {
                    this.currentValue = min;
                }
            } else {
                event.target.value = this.currentValue;
            }
        },
        handleDown: function() {
            if (this.currentValue <= this.min)
                return;
            this.currentValue -= 1;
        },
        handleUp: function() {
            if (this.currentValue >= this.max)
                return;
            this.currentValue += 1;
        }
    },
    mounted: function() {
        this.updateValue(this.value);
    }
});