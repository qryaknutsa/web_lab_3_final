let r = 0;

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
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
            document.cookie = "r=" + i;
            continue;
        }
        document.getElementById("form:r" + i).checked = false;
    }
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
    if(document.getElementById("form:r1").checked != true
        && document.getElementById("form:r2").checked != true
        && document.getElementById("form:r3").checked != true
        && document.getElementById("form:r4").checked != true
        && document.getElementById("form:r5").checked != true){
        draw(3);
        document.getElementById("form:r3").checked = true;
    }
}



