const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 700
canvas.height = 700

var mass_triangel_cord = [],
	mass_triangel = [],
	max = 0,
	min = 0

$('.input--file').change(function () {
	if ($(this).val() != '') {
		$(this).prev().text('Файл вибрано')
		let file = document.querySelector('.input--file').files[0]
		let reader = new FileReader()
		reader.readAsText(file)
		reader.onload = function () {
			console.log(reader.result)
			mass_triangel_cord = reader.result.split('\r\n')

			for (var i = 0; i < mass_triangel_cord.length; i++) {
				mass_triangel_cord[0].replace(' ', '')
				mass_triangel_cord.push(mass_triangel_cord[0].split(','))
				mass_triangel_cord.splice(0, 1)
			}

			context.clearRect(0, 0, canvas.width, canvas.height)
			for (var i = 0; i < mass_triangel_cord.length; i++) {
				console.log(mass_triangel_cord)
				if (mass_triangel_cord[i].length == 6)
					mass_triangel[i] = new Triangle(mass_triangel_cord[i])
				else {
					context.clearRect(0, 0, canvas.width, canvas.height)
					context.font = '20px Arial'
					context.fillStyle = 'red'
					context.textAlign = 'center'
					context.fillText(
						'У файлі не коректно вказані координати!',
						canvas.width / 2,
						canvas.height / 2
					)
					mass_triangel_cord = ''
					$('.input--file').prev().text('Виберіть файл')
				}
			}
		}
	} else {
		$(this).prev().text('Виберіть файл')
	}
})
var drawError = function () {
	context.clearRect(0, 0, canvas.width, canvas.height)
	context.font = '20px Arial'
	context.fillStyle = 'red'
	context.textAlign = 'center'
	context.fillText(
		'Файл не вибрано, або в ньому не коректно вказані координати!',
		canvas.width / 2,
		canvas.height / 2
	)
}
$('#drawTriangles').click(function () {
	if (mass_triangel_cord.length == 0) {
		return drawError()
	}
	context.clearRect(0, 0, canvas.width, canvas.height)
	for (var i = 0; i < mass_triangel_cord.length; i++) {
		mass_triangel[i].drawTriangle(false, '#ffffff')
	}
})
$('#drawTrianglesWithFill').click(function () {
	if (mass_triangel_cord.length == 0) {
		return drawError()
	}
	context.clearRect(0, 0, canvas.width, canvas.height)
	for (var i = 0; i < mass_triangel_cord.length; i++) {
		mass_triangel[i].drawTriangle(true, '#ffffff')
	}
	context.font = '12px Arial'
	context.fillStyle = '#333'
	context.textAlign = 'left'
	context.fillStyle = 'red'
	context.fillText('*Червоним розфарбовано тупокутні трикутники', 15, 640)
	context.fillStyle = 'orange'
	context.fillText('*Жовтим розфарбовано прямокутні трикутники', 15, 660)
	context.fillStyle = 'green'
	context.fillText('*Зеленим розфарбовано гострокутні трикутники', 15, 680)
})
$('#drawParam').click(function () {
	if (mass_triangel_cord.length == 0) {
		return drawError()
	}
	$('.info__inner').remove()
	$('.info').append('<div class="info__inner"></div>')
	for (var i = 0; i < mass_triangel_cord.length; i++) {
		mass_triangel[i].drawParam(i + 1)
	}
})
$('#getPerimeters').click(function () {
	if (mass_triangel_cord.length == 0) {
		return drawError()
	}
	context.clearRect(0, 0, canvas.width, canvas.height)
	var max = 0,
		min = 500,
		max_p,
		min_p
	for (var i = 0; i < mass_triangel_cord.length; i++) {
		if (mass_triangel[i].perimeter > max) {
			max = mass_triangel[i].perimeter
			max_p = i
		}
		if (mass_triangel[i].perimeter < min) {
			min = mass_triangel[i].perimeter
			min_p = i
		}
	}
	for (var i = 0; i < mass_triangel_cord.length; i++) {
		mass_triangel[i].drawTriangle(false, '#ffffff')
	}
	mass_triangel[min_p].drawTriangle(false, 'green')
	mass_triangel[max_p].drawTriangle(false, 'red')
	context.font = '12px Arial'
	context.fillStyle = '#333'
	context.textAlign = 'left'
	context.fillStyle = 'red'
	context.fillText(
		'*Червоним розфарбовано трикутник із найбільшим периметром',
		15,
		660
	)
	context.fillStyle = 'green'
	context.fillText(
		'*Зеленим розфарбовано трикутник із найменшим периметром',
		15,
		680
	)
})

$('.button__info').click(function () {
	$('.about').toggleClass('about--active')
})
$('.about__cross').click(function () {
	$('.about').removeClass('about--active')
})

var getVector = function (triangle, p1, p2) {
	return {
		x: triangle[p2][0] - triangle[p1][0],
		y: triangle[p2][1] - triangle[p1][1],
	}
}
var getAngle = function (v1, v2) {
	var dot = v1.x * v2.x + v1.y * v2.y
	var cross = v1.x * v2.y - v1.y * v2.x
	alpha = Math.atan2(cross, dot)
	return (alpha * 180) / Math.PI
}
var getAllAngle = function (triangle) {
	var v10 = getVector(triangle, 1, 0)
	var v12 = getVector(triangle, 1, 2)
	var v02 = getVector(triangle, 0, 2)
	var ang1 = getAngle(v10, v12)
	var ang2 = getAngle(v10, v02)
	var ang3 = getAngle(v12, v02)
	triangle.push([ang1, ang2, ang3])
	return
}
