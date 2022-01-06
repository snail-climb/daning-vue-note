Vue.directive('clickoutside', {
    bind: function(el, binding, vnode) {
        function documentHandler(e) {
            // 判断点击的区域是否是指令所在的元素内部
            if (el.contains(e.target)) {
                return false;
            }
            // 判断当前的指令 v-clickoutside 有没有写表达式
            if (binding.expression) {
                // 用来执行当前上下文 methods 中指定的函数
                binding.value(e);
            }
        }
        el._vueClickOutside_ = documentHandler;
        document.addEventListener('click', el._vueClickOutside_);
    },
    // 移除事件监听
    unbind: function(el, binding) {
        document.removeEventListener('click', el._vueClickOutside_);
        delete el._vueClickOutside_;
    }
});