window.onload = function () {
    var boldBox = document.querySelector('.boldBox');
    var boldInput = document.querySelector('.boldInput');
    var indicator = document.querySelector('.indicator');
    boldInput.oninput = function () {
        indicator.style.opacity = '1';
        indicator.innerHTML = boldInput.value;
    }
    boldBox.onmouseout = function () {
        indicator.style.opacity = '0';
    }

    var canvas = document.getElementById('myCanvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    // 为了确保canvas内容渲染正确，最好设置canvas元素的宽度和高度
    canvas.width = canvas.offsetWidth; // 设置 canvas 的宽度
    canvas.height = canvas.offsetHeight; // 设置 canvas 的高度

    var nowColor = 'black';
    var colorInputBox = document.querySelector('.colorInputBox');
    colorInputBox.onchange = function () {
        nowColor = colorInputBox.value;
    }

    var colorBox = document.querySelectorAll('.colorBox div');

    var displayColor = document.querySelectorAll('.displayColor');
    // console.log(displayColor);
    // for (var i = 0; i < displayColor.length; i++) {
    //     displayColor[i].setAttribute('data-index', i);

    // }

    for (var i = 0; i < colorBox.length - 1; i++) {
        colorBox[i].setAttribute('data-index', i);

        colorBox[i].onclick = function () {
            nowColor = window.getComputedStyle(this).backgroundColor;
            // console.log(nowColor);
            for (var j = 0; j < displayColor.length; j++) {
                displayColor[j].style.display = 'none';
            }

        }

        colorBox[i].onmouseover = function () {
            // console.log("hhh")
            // console.log(this);
            var index = this.getAttribute('data-index');
            // console.log(index);
            for (var j = 0; j < displayColor.length; j++) {
                displayColor[j].style.display = 'none';
            }
            displayColor[index].style.display = 'block';
            displayColor[index].style.backgroundColor = window.getComputedStyle(this).backgroundColor;
        }

        colorBox[i].onmouseout = function () {
            for (var j = 0; j < displayColor.length; j++) {
                displayColor[j].style.display = 'none';
            }
        }
    }



    canvas.onmousedown = function (e) {
        var ctx = canvas.getContext('2d');
        var x = e.offsetX;
        var y = e.offsetY;
        ctx.beginPath();
        ctx.moveTo(x, y);
        canvas.onmousemove = function (e) {
            var x = e.offsetX;
            var y = e.offsetY;
            // console.log(x, y); // 当前画笔位置
            if (x <= 0 || x >= canvas.width || y <= 0 || y >= canvas.height) {
                // console.log('超出画布范围');
                canvas.onmousemove = null;
            }
            ctx.lineTo(x, y);
            ctx.strokeStyle = nowColor;
            ctx.lineWidth = boldInput.value;
            ctx.stroke();

            canvas.onmouseup = function () {
                canvas.onmousemove = null;
            }
        }
    }

    var pen = document.querySelector('.pen');
    pen.onclick = function () {
        canvas.onmousedown = null;
        canvas.style.cursor = 'url(./images/pen.png) 0 28, auto';
        canvas.onmousedown = function (e) {
            var ctx = canvas.getContext('2d');
            var x = e.offsetX;
            var y = e.offsetY;
            ctx.beginPath();
            ctx.moveTo(x, y);
            canvas.onmousemove = function (e) {
                var x = e.offsetX;
                var y = e.offsetY;
                if (x <= 0 || x >= canvas.width || y <= 0 || y >= canvas.height) {
                    // console.log('超出画布范围');
                    canvas.onmousemove = null;
                }

                // console.log(x, y); // 当前画笔位置
                ctx.lineTo(x, y);
                ctx.lineCap = 'round';
                ctx.strokeStyle = nowColor;
                ctx.lineWidth = boldInput.value;
                ctx.stroke();

                canvas.onmouseup = function () {
                    canvas.onmousemove = null;
                }
            }
        }
    }

    var eraser = document.querySelector('.eraser');
    eraser.onclick = function () {
        canvas.onmousedown = null;
        canvas.style.cursor = 'url(./images/橡皮,擦除,橡皮擦.png) 10 28, auto';
        canvas.onmousedown = function (e) {
            var ctx = canvas.getContext('2d');
            var x = e.offsetX;
            var y = e.offsetY;
            ctx.clearRect(x, y, boldInput.value, boldInput.value);
            canvas.onmousemove = function (e) {
                requestAnimationFrame(function () {
                    var x = e.offsetX;
                    var y = e.offsetY;
                    // console.log(x, y); // 当前画笔位置
                    ctx.clearRect(x, y, boldInput.value, boldInput.value);
                })


                canvas.onmouseup = function () {
                    canvas.onmousemove = null;
                }
            }
        }
    }


    // 清空画布的逻辑代码
    var clearCanvas = document.querySelector('#clearCanvas');
    clearCanvas.onclick = function () {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function getNowDateRandomNumber() {
        var str = '';
        var date = new Date().toLocaleString().replace(/\s|\/|:/g, "");
        var random = Math.random().toString(16).slice(2, 10).padEnd(8, '0');
        str = date + "-" + random;
        return str;
    }


    // 下载的执行逻辑
    var download = document.querySelector('#downloadCanvas');
    download.onclick = function () {
        var format = prompt("请输入图片格式(png/jpg/webp)").toLowerCase();
        console.log(format);

        // 检查格式是否合法，不合法则默认使用 'png'
        if (format !== 'png' && format !== 'jpg' && format !== 'webp') {
            format = 'png';
        }

        var formatStr = 'image/' + format;

        var quality = parseFloat(prompt("请输入图片质量(0~1)"));

        // 检查图片质量是否在正确范围内，不合法则默认使用 1
        if (isNaN(quality) || quality < 0 || quality > 1) {
            quality = 1;
        }

        var a = document.createElement('a');
        a.href = canvas.toDataURL(formatStr, quality);
        a.download = '图片' + getNowDateRandomNumber() + '.' + format;
        a.click();
    };

    var mobile = document.querySelector('#mobile');
    var mobileBox = document.querySelector('#mobileBox');
    mobile.onclick = function () {
        mobileBox.style.display = 'block';
    }
    mobile.onmouseout = function () {
        mobileBox.style.display = 'none';
    }
    mobileBox.onmouseout = function () {
        mobileBox.style.display = 'none';
    }
    mobileBox.onmouseover = function () {
        mobileBox.style.display = 'block';
    }

    var setRectangular = document.querySelector('.setRectangular');
    setRectangular.onclick = function () {
        // console.log('setRectangular');
        mobileBox.style.display = 'none';
        canvas.style.cursor = 'url(./images/24gl-move.png) 15 15, auto';

        canvas.onmousedown = null;
        
        canvas.onmousedown = function (e) {
            var ctx = canvas.getContext('2d');
            var mx = e.offsetX;
            var my = e.offsetY;
            ctx.beginPath();
            // ctx.moveTo(mx, my);
            canvas.onmousemove = function (e) {
                // ctx.clearRect(mx, my, e.offsetX - mx, e.offsetY - my);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                var x = e.offsetX;
                var y = e.offsetY;
                
                if (x <= 0 || x >= canvas.width || y <= 0 || y >= canvas.height) {
                    // console.log('超出画布范围');
                    canvas.onmousemove = null;
                }
                var width = x - mx;
                var height = y - my;
                ctx.strokeRect(mx, my, width, height);
                // console.log(x, y); // 当前画笔位置
                // ctx.lineTo(x, y);
                ctx.lineCap = 'round';
                ctx.strokeStyle = nowColor;
                ctx.lineWidth = boldInput.value;
                ctx.stroke();

                canvas.onmouseup = function () {
                    canvas.onmousemove = null;
                }
            }
        }
    }

    var setCircular = document.querySelector('.setCircular');

    setCircular.onclick = function () {
        // 隐藏其他元素并设置鼠标样式
        mobileBox.style.display = 'none';
        canvas.style.cursor = 'url(./images/24gl-move.png) 15 15, auto';

        // 初始化
        canvas.onmousedown = null;

        canvas.onmousedown = function (e) {
            var ctx = canvas.getContext('2d');
            var startX = e.offsetX;
            var startY = e.offsetY;

            ctx.beginPath();

            canvas.onmousemove = function (e) {
                var endX = e.offsetX;
                var endY = e.offsetY;

                if (endX <= 0 || endX >= canvas.width || endY <= 0 || endY >= canvas.height) {
                    canvas.onmousemove = null;
                    return;
                }

                // 计算圆心（起始坐标与当前鼠标坐标的中点）
                var centerX = (startX + endX) / 2;
                var centerY = (startY + endY) / 2;

                // 计算半径
                var radius = Math.sqrt(Math.pow((endX - startX) / 2, 2) + Math.pow((endY - startY) / 2, 2));

                // 清除画布并绘制新的圆形
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                ctx.lineCap = 'round';
                ctx.strokeStyle = nowColor;
                ctx.lineWidth = boldInput.value;
                ctx.stroke();

                // 停止绘制
                canvas.onmouseup = function () {
                    canvas.onmousemove = null;
                }
            }
        }
    }

    var setTriangle = document.querySelector('.setTriangle');

    setTriangle.onclick = function () {
        // 隐藏其他元素并设置鼠标样式
        mobileBox.style.display = 'none';
        canvas.style.cursor = 'url(./images/24gl-move.png) 15 15, auto';

        // 初始化
        canvas.onmousedown = null;

        canvas.onmousedown = function (e) {
            var ctx = canvas.getContext('2d');
            var startX = e.offsetX;
            var startY = e.offsetY;

            ctx.beginPath();

            canvas.onmousemove = function (e) {
                var endX = e.offsetX;
                var endY = e.offsetY;

                if (endX <= 0 || endX >= canvas.width || endY <= 0 || endY >= canvas.height) {
                    canvas.onmousemove = null;
                    return;
                }

                // 计算三角形的第三个顶点坐标
                var thirdX = startX + (endX - startX) * 2;
                var thirdY = startY;

                // 清除画布并绘制新的三角形
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                ctx.lineTo(thirdX, thirdY);
                ctx.closePath();
                ctx.lineCap = 'round';
                ctx.strokeStyle = nowColor;
                ctx.lineWidth = boldInput.value;
                ctx.stroke();

                // 停止绘制
                canvas.onmouseup = function () {
                    canvas.onmousemove = null;
                }
            }
        }
    }

    function drawGirdChart() {
        var ctx = canvas.getContext('2d');
        // 绘制格子图
        function gridChart(x, y, mx, my) {
            ctx.beginPath();
            ctx.moveTo(mx, my);
            ctx.lineTo(x, y);
            ctx.strokeStyle = '#ccc';
            ctx.lineWidth = boldInput.value;
            ctx.stroke();
        }
        for (var x = 0; x < canvas.width; x += 10) {
            gridChart(x, 0, x, canvas.height);
        }
        for (var y = 0; y < canvas.height; y += 10) {
            gridChart(0, y, canvas.width, y);
        }
    }

    function drawNoteBookLine() {
        var ctx = canvas.getContext('2d');
        function noteBook(x, y, mx, my) {
            ctx.beginPath();
            ctx.moveTo(mx, my);
            ctx.lineTo(x, y);
            ctx.strokeStyle = '#ccc';
            ctx.lineWidth = boldInput.value;
            ctx.stroke();
        }
        for (var y = 0; y < canvas.width; y += 30) {
            noteBook(0, y, canvas.width, y);
        }
    }

    var setCanvasGirdDisplay = document.querySelector('#setCanvasGirdDisplay');
    setCanvasGirdDisplay.onclick = function () {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGirdChart();
    }

    var setNoteBookLine = document.querySelector('#setNoteBookLine');
    setNoteBookLine.onclick = function () {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawNoteBookLine();
    }

}