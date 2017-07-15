# BM.js
BM.js 是一个可绘制位图（bitmap）的展示插件。

## 安装

1. 引入 css 文件

```html
<link rel="stylesheet" href="dist/css/bm.css">
```

2. 引入 js 文件，注意别忘了加载 jQuery 库

```html
<script src="//cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
<script src="dist/js/bm.js" charset="utf-8"></script>
```

3. 初始化位图画布

```javascript
$('#bmArea').bmInit();
```

## 语法

- 初始化

```javascript
$('#bmArea').bmInit();
```

也可以指定画布的宽高格数，默认为 20 行 50 列

```javascript
$('#bmArea').bmInit({
    row: 20,
    col: 50
});
```

- 获取画布数据

```javascript
//返回一串由 0 和 1 组成的字符串
var dataStr = $('#bmArea').bmGet();
```

- 复原画布

```javascript
// dataStr 为画布数据
$('#bmArea').bmSet(dataStr);
```

- 清空画布

```javascript
$('#bmArea').bmClear();
```

- 画布只读

```javascript
//设为只读
$('#bmArea').bmReadonly(true);
//取消只读
$('#bmArea').bmReadonly(false);
```

- 位图动画，由多个画布组成的一组动画

```javascript
// dataJSON 为 json 数据，callback 为动画执行完毕后触发
$('#bmArea').bmPlay(dataJSON, callback);
```

动画数据 json 格式

```json
// data 为画布数据，duration 为持续时间（单位：毫秒）
[
    {
        "data": "000000",
        "duration": 10
    },
    {
        "data": "000000",
        "duration": 10
    },
    {
        "data": "000000",
        "duration": 10
    }
]
```

- 链式调用

```javascript
$('#bmArea').bmInit({
    row: 3,
    col: 3
}).bmSet('000111000');
```