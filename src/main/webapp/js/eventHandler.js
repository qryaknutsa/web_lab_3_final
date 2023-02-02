const inputY = document.getElementById("form:Y");
let x = 0;
let y = 0;
let r = 0;

function sliderChangeStep(){

}

function putR(id){
    r = parseInt(document.getElementById(id).title);
    draw(r);
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
