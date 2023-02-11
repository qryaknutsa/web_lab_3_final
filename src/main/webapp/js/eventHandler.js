const inputY = document.getElementById("form:Y");
let x = 0;
let y = 0;
let r = 0;


function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    // m = checkTime(m);
    // s = checkTime(s);
    document.getElementById('time').innerHTML = "Текущее время: " + h + ":" + m + ":" + s;
    setTimeout(startTime, 5000);
}


function putR(id) {
    r = parseInt(document.getElementById(id).title);
    draw(r);
    for (let i = 1; i <= 5; i++) {
        if (r == i.toString()) {
            document.getElementById("form:r" + i).checked = true;
            document.getElementById("form:r_value").value = i;
            console.log(document.getElementById("form:r_value").value);
            // document.getElementById("form:button_r" + i).click();
            // console.log(document.getElementById("form:button_r" + i));
            continue;
        }
        document.getElementById("form:r" + i).checked = false;
    }
}



window.onload = function (){
    let r = Number.parseFloat(document.getElementById("form:checkBoxValue").innerText.split(" ")[2]);
    for (let i = 1; i <= 5; i++) {
        if (r == i.toString()) {
            document.getElementById("form:r" + i).checked = true;
            continue;
        }
        document.getElementById("form:r" + i).checked = false;
    }
}


// function validateY(e) {
//     console.log("we are here");
//     console.log(e.value);
//     if (!/^-?\d+([.,])?\d*$/i.test(e.value)) {
//         e.value = "";
//     }
//     if (e.value.split(/[.,]/)[1] != null) {
//         if (e.value.split(/[.,]/)[1].length > 10) {
//             // error_message.innerText = "Слишком большое количество знаков после запятой.";
//             e.value = e.value.substring(0, 12);
//         }
//     }
//     y = inputY.value.replace(/,/, ".");
// }
