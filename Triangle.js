class Triangle {
    constructor(mass) {
        this.x1 = mass[0];
        this.y1 = mass[1];
        this.x2 = mass[2];
        this.y2 = mass[3];
        this.x3 = mass[4];
        this.y3 = mass[5];
        this.first_side = Math.sqrt((this.x2 - this.x1) ** 2 + (this.y2 - this.y1) ** 2);
        this.second_side = Math.sqrt((this.x3 - this.x2) ** 2 + (this.y3 - this.y2) ** 2);
        this.third_side = Math.sqrt((this.x3 - this.x1) ** 2 + (this.y3 - this.y1) ** 2);
        this.perimeter = this.first_side + this.second_side + this.third_side;
        this.p = this.perimeter / 2;
        this.square = Math.sqrt(this.p * (this.p - this.first_side) * (this.p - this.second_side) * (this.p - this.third_side));
        this.out_circle = (this.first_side * this.second_side * this.third_side) / (4 * this.square)
        this.in_circle = this.square / this.p
    }
    drawTriangle(auto, color) {
        context.beginPath();
        context.moveTo(this.x1, this.y1);
        context.lineTo(this.x2, this.y2);
        context.lineTo(this.x3, this.y3);
        context.lineTo(this.x1, this.y1);
        context.closePath;

        if (auto) {
            var a = this.first_side;
            var b = this.second_side;
            var c = this.third_side;
            if (a * a == b * b + c * c || b * b == a * a + c * c || c * c == b * b + a * a) {
                context.fillStyle = "yellow";
            } else if (a * a > b * b + c * c || b * b > a * a + c * c || c * c > b * b + a * a) {
                context.fillStyle = "red";
            } else {
                context.fillStyle = "green";
            }
        }
        else {
            context.fillStyle = color;
        }
        context.fill();
        context.stroke();
        context.beginPath();
        context.arc(this.x1, this.y1, 3, 0, 2 * Math.PI);
        context.closePath;
        context.fillStyle = "black";
        context.fill();
        context.beginPath();
        context.arc(this.x2, this.y2, 3, 0, 2 * Math.PI);
        context.closePath;
        context.fillStyle = "black";
        context.fill();
        context.beginPath();
        context.arc(this.x3, this.y3, 3, 0, 2 * Math.PI);
        context.closePath;
        context.fillStyle = "black";
        context.fill();
    }
    drawParam(i) {
        $(".info__inner").append("<div class='triangle'><div class='triangle__name'>Трикутник №" + i + "</div><div class='param'>Площа = " + +this.square.toFixed(1) + "</div><div class='param'>Периметр = " + +this.perimeter.toFixed(1) + "</div><div class='param'>Сторона 1 = " + +this.first_side.toFixed(1) + "</div><div class='param'>Сторона 2 = " + +this.second_side.toFixed(1) + "</div><div class='param'>Сторона 3 = " + +this.third_side.toFixed(1) + "</div><div class='param'>Радіус описаного кола = " + +this.out_circle.toFixed(1) + "</div><div class='param'>Радіус вписаного кола = " + +this.in_circle.toFixed(1) + "</div></div>");
    }
}