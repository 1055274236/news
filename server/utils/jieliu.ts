export function debounce(fn: Function, delay: number) {
  var timer: NodeJS.Timeout; // 维护一个 timer
  return function (this: any) {
    var _this = this; // 取debounce执行作用域的this
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      fn.apply(_this, args); // 用apply指向调用debounce的对象，相当于_this.fn(args);
    }, delay);
  };
}

function throttle(fn: Function, delay: number) {
  var timer: NodeJS.Timeout; // 维护一个 timer
  return function (this: any) {
    var _this = this;
    var args = arguments;
    if (timer) {
      return;
    }
    timer = setTimeout(function () {
      fn.apply(_this, args);
      timer && clearTimeout(timer);
    }, delay);
  };
}
