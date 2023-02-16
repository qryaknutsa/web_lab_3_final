let ctx, canvas;
let points = []
const SCALE = 10.1


function drawDot(x, y, r, color, text, ctx){
    ctx.fillStyle= color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.fillText(text, x + 3, y - 6);
    ctx.closePath();

}


function restorePoints(R) {

    let zero_x = document.getElementById('graph').offsetWidth / 2;
    let zero_y = document.getElementById('graph').offsetHeight / 2;
    let width = canvas.width;
    let height = canvas.height;

    for (let i = 0; i < points.length; i++) {
        let x_pos = points[i][0]
        let y_pos = points[i][1]


        let y_cord = -1 * (y_pos - zero_y), x_cord = (x_pos - zero_x);

        x_cord = x_cord / width * SCALE;
        y_cord = y_cord / height * SCALE;

        drawDot(x_pos, y_pos,"black" ,'', ctx)
    }

}

function draw(R = 3, withPoints = true) {
    canvas = document.querySelector('#graph');
    let width = canvas.width;
    let height = canvas.height;

    R = width * (R / SCALE)
    if (!canvas.getContext) {
        return;
    }
    ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#5a7953';
    ctx.strokeStyle = 'blue';
    ctx.font = '12px serif';


    //круг - 2
    ctx.beginPath();
    ctx.moveTo(width / 2 - R, height / 2);
    ctx.lineTo(width / 2, height / 2);
    ctx.lineTo(width / 2, height / 2 - R);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(width / 2, height / 2, R, Math.PI,
        -Math.PI / 2, false);
    ctx.fill();

    //квадрат - 1
    ctx.fillRect(width / 2, height / 2 - R / 2, R, R / 2); //II


    //треугольник - 3
    ctx.beginPath();
    ctx.moveTo(width / 2 + R, height / 2);
    ctx.lineTo(width / 2, height / 2);
    ctx.lineTo(width / 2, height / 2 + R);
    ctx.fill();


    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1.1;

    //оси
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    drawDot(width / 2, height / 2 - R, 2,"black",'R', ctx);
    drawDot(width / 2, height / 2 - R / 2,2,"black", 'R/2', ctx);
    drawDot(width / 2, height / 2 + R,2,"black", '-R', ctx);
    drawDot(width / 2, height / 2 + R / 2,2,"black", '-R/2', ctx);
    drawDot(width / 2 + R, height / 2,2,"black", 'R', ctx);
    drawDot(width / 2 + R / 2, height / 2,2,"black", 'R/2', ctx);
    drawDot(width / 2 - R, height / 2,2,"black", '-R', ctx);
    drawDot(width / 2 - R / 2, height / 2,2,"black", '-R/2', ctx);

    if (withPoints) restorePoints(R * SCALE / width)

}

function restoreCanvas(R = 3, withPoints = true) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw(R, withPoints);
}

draw();