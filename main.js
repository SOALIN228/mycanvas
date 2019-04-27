var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var lineWidth = 5

autoSetCanvasSize(canvas)

listenToMouse(canvas)

var eraserEnabled = false

pen.onclick = function () {
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}

eraser.onclick = function () {
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}

clear.onclick = function () {
  context.clearRect(0, 0, canvas.width, canvas.height)
}

download.onclick = function () {
  var url = canvas.toDataURL('image/png')
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '我的画'
  a.click()
}

function setPenColor (pen) {
  var list = document.getElementById('colors').getElementsByTagName('li')
  for (var i = 0; i < list.length; i++) {
    list[i].classList.remove('active')
  }
  pen.classList.add('active')
}

black.onclick = function () {
  context.fillStyle = 'black'
  context.strokeStyle = 'black'
  setPenColor(this)
}

red.onclick = function () {
  context.fillStyle = 'red'
  context.strokeStyle = 'red'
  setPenColor(this)
}

green.onclick = function () {
  context.fillStyle = 'green'
  context.strokeStyle = 'green'
  setPenColor(this)
}

blue.onclick = function () {
  context.fillStyle = 'blue'
  context.strokeStyle = 'blue'
  setPenColor(this)
}

thin.onclick = function () {
  lineWidth = 5
}

thick.onclick = function () {
  lineWidth = 8
}

function drawLine (x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1) // 起点
  context.lineWidth = lineWidth
  context.lineTo(x2, y2) // 终点
  context.stroke()
  context.closePath()
}

function autoSetCanvasSize (canvas) {
  setCanvasSize()

  window.onresize = function () {
    setCanvasSize()
  }

  function setCanvasSize () {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function listenToMouse (canvas) {
  var using = false
  var lastPoint = { x: undefined, y: undefined }

  if (document.body.ontouchstart !== undefined) {
    // 触屏设备
    canvas.ontouchstart = function (ev) {
      var x = ev.touches[0].clientX
      var y = ev.touches[0].clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = { x: x, y: y }
      }
    }

    canvas.ontouchmove = function (ev) {
      var x = ev.touches[0].clientX
      var y = ev.touches[0].clientY

      if (!using) {
        return
      }

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = { x: x, y: y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }

    canvas.ontouchend = function () {
      using = false
    }

  } else {
    // 非触屏设备
    // 按下鼠标
    canvas.onmousedown = function (ev) {
      var x = ev.clientX
      var y = ev.clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = { x: x, y: y }
      }
    }

    // 拖动鼠标
    canvas.onmousemove = function (ev) {
      var x = ev.clientX
      var y = ev.clientY

      if (!using) {
        return
      }

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = { x: x, y: y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }

    // 松开鼠标
    canvas.onmouseup = function () {
      using = false
    }
  }
}
