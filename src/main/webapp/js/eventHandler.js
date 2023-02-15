function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    checkTime(h);
    checkTime(m);
    checkTime(s);
    document.getElementById('time').innerHTML = "Текущее время: " + h + ":" + m + ":" + s;
    setTimeout(startTime, 5000);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function putR(id) {
    let r = parseInt(document.getElementById(id).title);
    draw(r);
    for (let i = 1; i <= 5; i++) {
        if (r == i.toString()) {
            document.getElementById("form:r" + i).checked = true;
            document.cookie = "r=" + i;
            continue;
        }
        document.getElementById("form:r" + i).checked = false;
    }
    document.getElementById("form:button_r" + r).click();
}

window.onload = function () {
    let all_coolies = document.cookie.split(";");
    for (let i = 0; i < all_coolies.length; i++) {
        let params = all_coolies[i].split("=");
        let name = params[0].trim();
        if (name === "r") {
            let r = params[1].trim();
            draw(r);
            for (let i = 1; i <= 5; i++) {
                if (r == i.toString()) {
                    document.getElementById("form:r" + i).checked = true;
                    document.getElementById("form:r_value").value = i;
                    document.cookie = "r=" + i;
                    continue;
                }
                document.getElementById("form:r" + i).checked = false;
            }
        }
    }
    if (document.getElementById("form:r1").checked != true
        && document.getElementById("form:r2").checked != true
        && document.getElementById("form:r3").checked != true
        && document.getElementById("form:r4").checked != true
        && document.getElementById("form:r5").checked != true) {
        draw(3);
        document.getElementById("form:r3").checked = true;
    }
}


function findPos(obj) {
    let curleft = 0;
    let curtop = 0;
    if (obj.offsetLeft) curleft += parseInt(obj.offsetLeft);
    if (obj.offsetTop) curtop += parseInt(obj.offsetTop);
    if (obj.scrollTop && obj.scrollTop > 0) curtop -= parseInt(obj.scrollTop);
    if (obj.offsetParent) {
        let pos = findPos(obj.offsetParent);
        curleft += pos[0];
        curtop += pos[1];
    } else if (obj.ownerDocument) {
        let thewindow = obj.ownerDocument.defaultView;
        if (!thewindow && obj.ownerDocument.parentWindow)
            thewindow = obj.ownerDocument.parentWindow;
        if (thewindow) {
            if (thewindow.frameElement) {
                let pos = findPos(thewindow.frameElement);
                curleft += pos[0];
                curtop += pos[1];
            }
        }
    }

    return [curleft, curtop];
}

if (graph !== null) {
    ctx = graph.getContext('2d');
    let zero_x = findPos(graph)[0] + 100;
    let zero_y = findPos(graph)[1] + 100;


    graph.onmousemove = function (e) {
        x = Math.round((e.pageX - zero_x) / (300 / (4 * r)));
        restoreCanvas();
        draw_boundaries();
        let x_pos = (Math.round((e.pageX - zero_x) / (300 / (4 * r))) * 300) / (4 * r) + 100;
        let y_pos = e.pageY - zero_y + 100;
        if (((r === "4" || r === 4) && (x_pos > 160 || y_pos > 160)) ||
            ((r === "5" || r === 5) && (x_pos > 148 || x_pos < 20 || y_pos > 152 || y_pos < 20)))
            drawDot((Math.round((e.pageX - zero_x) / (300 / (4 * r))) * 300) / (4 * r) + 100, e.pageY - zero_y + 100, 4, "black", "", ctx);
        else drawDot((Math.round((e.pageX - zero_x) / (300 / (4 * r))) * 300) / (4 * r) + 100, e.pageY - zero_y + 100, 4, "red", "", ctx);
    }

    //чтобы убрать точку, если мышка не в графике
    graph.onmouseout = function () {
        restoreCanvas();
        draw_boundaries();
    }


    graph.onclick = function (e) {
        error_message.innerText = '';
        restoreCanvas();
        draw_boundaries();
        // console.log("pageX " + e.pageX);
        // console.log("pageY " + e.pageY);
        //
        // console.log("try1 x_zero " + zero_x)
        // console.log("try1 y_zero " + zero_y)

        //let x_val = Math.round((e.pageX - zero_x) / 80 * r);
        let y_val = -Math.floor((e.pageY - zero_y) / 80 * r * 1000) / 1000;

        // console.log("x val "+ x_val);
        // console.log("y val "+ y_val);
        if (r !== 0) {
            if ((x > 3 || x < -5) && (y_val > 5 || y_val < -3)) {
                error_message.innerText = "Невозможно определить значения x и y.";
            } else if (x > 3 || x < -5) {
                error_message.innerText = "Невозможно определить значение x.";
            } else if (y_val > 5 || y_val < -3) {
                error_message.innerText = "Невозможно определить значение y.";
            } else {
                drawDot(e.pageX - zero_x + 100, e.pageY - zero_y + 100, 4, "red", "", ctx);
                for (let i = -5; i <= 3; i++) {
                    if (x === i) {
                        document.getElementById("x" + i).checked = true;
                        continue;
                    }
                    document.getElementById("x" + i).checked = false;
                }
                document.getElementById("y").value = y_val.toString();

                document.cookie = "r=" + Math.round(r);
                document.cookie = "x=" + x;
                document.cookie = "y=" + y_val;

                document.getElementById("form").submit();
            }
        } else error_message.innerText = "Вы не ввели значение R";
    }
}




