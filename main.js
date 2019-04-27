var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

autoSetCanvasSize(canvas)

listenToMouse(canvas)

var eraserEnabled = false
eraser.onclick = function () {
  eraserEnabled = true
  actions.className = 'actions active'

}
brush.onclick = function () {
  eraserEnabled = false
  actions.className = 'actions'
}

function drawLine (x1, y1, x2, y2) {
  context.beginPath()
  context.strokeStyle = 'black'
  context.moveTo(x1, y1) // 起点
  context.lineWidth = 5
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

  // 按下鼠标
  canvas.onmousedown = function (aaa) {
    var x = aaa.clientX
    var y = aaa.clientY
    using = true
    if (eraserEnabled) {
      context.clearRect(x - 5, y - 5, 10, 10)
    } else {
      lastPoint = { x: x, y: y }
    }
  }

  // 拖动鼠标
  canvas.onmousemove = function (a) {
    var x = a.clientX
    var y = a.clientY

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
