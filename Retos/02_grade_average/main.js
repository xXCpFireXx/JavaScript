let sum = 0;
let result_average = 0;
let element_span = document.getElementById("result_average");
let element_status_grade = document.getElementById("status_grade"); 

//Primera Opción
const gradeAverage = () =>{
    let number1 = document.getElementById("number1");
    let number2 = document.getElementById("number2");
    let number3 = document.getElementById("number3");
    let number4 = document.getElementById("number4");
    let number5 = document.getElementById("number5");

    if (condition) {
        
    } else {
        
    }
    
    number1 = Number(number1.value);
    number2 = Number(number2.value);
    number3 = Number(number3.value);
    number4 = Number(number4.value);
    number5 = Number(number5.value);
    
    let total = [number1, number2, number3, number4, number5]
    for (let i = 0; i<5; i++) {
        sum = sum + total[i]
    }
    
    result_average = sum/total.length;

    element_span.textContent = result_average.toFixed(1);
    statusGrade(result_average)
    clear()
    result_average = 0
}


//Segunda Opción
const gradeAverage1 = () => {

    for (let i = 0; i<5; i++) {
        sum = sum + Number(document.getElementById(`number${i+1}`).value);
    }

    result_average = sum/5;

    element_span.textContent = result_average.toFixed(1);

    statusGrade(result_average)
    clear()
    sum = 0
    result_average = 0
}

const statusGrade = (average) =>{

    if (average>=3) {
        element_status_grade.textContent = "El ESTUDIANTE APROBÓ!"
    } else {
        element_status_grade.textContent = "El ESTUDIANTE REPROBÓ!"
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