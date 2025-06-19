let sum = 0;
let result_average = 0;
let element_p = document.getElementById("result_average");
let element_status_grade = document.getElementById("status_grade"); 
let flag = true;

const gradeAverage = () =>{
    for (let i = 0; i<5; i++) {
        let rawValue = document.getElementById(`number${i+1}`).value;

        let valueNumber = Number(rawValue);

        if (isNaN(valueNumber)) {
            notification(`El valor "${rawValue}" no es un número`,"rgb(188, 71, 73)",2000)
            clear()
            flag = false
            element_status_grade.textContent = ""
            element_p.textContent = ""
        } else if(valueNumber<=-1){
            notification(`El valor "${rawValue}" es un número NEGATIVO`,"rgb(188, 71, 73)",2000)
            
            clear()
            flag = false
            element_status_grade.textContent = ""
            element_p.textContent = ""
        }else {
            sum = sum + valueNumber;            
        }
    }

    if (flag) {
        result_average = sum/5;
        element_p.textContent = `El promedio es: ${result_average.toFixed(1)}`;
        statusGrade(result_average)
        element_p.style.display = "block"
    }

    clear()
    result_average = 0
}

const statusGrade = (average) =>{
    if (average>=3) {
        notification("El ESTUDIANTE APROBÓ!","rgb(167, 201, 87)",-1)        
    } else {
        notification("El ESTUDIANTE REPROBÓ!","rgb(188, 71, 73)",-1)
        element_p.style.borderColor = "rgb(188, 71, 73)"
    }
    sum = 0
}

const clear = () =>{
    number1.value = "";
    number2.value = "";
    number3.value = "";
    number4.value = "";
    number5.value = "";
}

const notification = (text, color, duration) =>{
    Toastify({
        text: text,
        duration: duration,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {background: color}
        }).showToast();
}


