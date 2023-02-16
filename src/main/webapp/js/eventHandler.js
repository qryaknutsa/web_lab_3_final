const graph = document.getElementById("graph");
const error_message = document.getElementById("form:errorMessage");
const submitButton = document.getElementById("form:submit_button");

const sliderValueX = document.getElementById("form:sliderValue");
const inputValueY = document.getElementById("form:Y");
let r = 3;


function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
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
    r = parseInt(document.getElementById(id).title);
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
            r = params[1].trim();
            draw(r);
            for (let i = 1; i <= 5; i++) {
                if (r == i.toString()) {
                    document.getElementById("form:r" + i).checked = true;
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
    let x_pos, y_pos, x_val, y_val;

    ctx = graph.getContext('2d');
    let zero_x = findPos(graph)[0] + 100;
    let zero_y = findPos(graph)[1] + 100;


    graph.onmousemove = function (e) {
        restoreCanvas(r);

        x_pos = (e.pageX - zero_x) + 100;
        y_pos = e.pageY - zero_y + 100;

        x_val = Math.floor(((x_pos - 100 - 1.5) / 20) * 10) / 10;
        y_val = Math.floor((-(y_pos - 100) / 20) * 10) / 10;

        // console.log("__________________\nx_val = " + x_val);
        // console.log("y_val = " + y_val);
        // console.log("x_pos = " + x_pos);
        // console.log("y_pos = " + y_pos + "\n__________________");

        if (((x_val >= 0 && y_val >= 0) && (x_val <= r) && (y_val <= (r / 2)))
            || (x_val >= 0 && y_val <= 0 && y_val >= (x_val - r))
            || (x_val <= 0 && y_val >= 0 && r * r >= y_val * y_val + x_val * x_val)) {
            drawDot((e.pageX - zero_x) + 100, e.pageY - zero_y + 100, 4, "red", "", ctx);
        } else {
            drawDot((e.pageX - zero_x) + 100, e.pageY - zero_y + 100, 4, "dimgrey", "", ctx);
        }
    }

    //чтобы убрать точку, если мышка не в графике
    graph.onmouseout = function () {
        restoreCanvas(r);
    }


    graph.onclick = function (e) {
        error_message.innerText = '';
        restoreCanvas(r);

        if ((x_val > 4 || x_val < -4) && (y_val > 5 || y_val < -5)) {
            error_message.innerHTML = "Невозможно определить значения x и y.";
            sliderValueX.value = 0;
            document.getElementById("form:sliderValueOutput").innerText = "X = 0";
            inputValueY.value = 0;
        } else if (x_val > 4 || x_val < -4) {
            error_message.innerHTML = "Невозможно определить значение x.";
            sliderValueX.value = 0;
            document.getElementById("form:sliderValueOutput").innerText = "X = 0";
        } else if (y_val > 5 || y_val < -5) {
            error_message.innerHTML = "Невозможно определить значение y.";
            inputValueY.value = 0;
        } else {
            sliderValueX.value = x_val;
            document.getElementById("form:sliderValueOutput").innerText = "X = " + x_val;

            inputValueY.value = y_val;
            document.getElementById("form:yValue").value = y_val;

            submitButton.click();

        }
    }
}