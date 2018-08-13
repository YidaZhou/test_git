
var number_of_rows = 2;

var add = function() {
    let tr = makeNewTr();
    tr.id = ++number_of_rows;
    let table = document.getElementById("table");
    table.appendChild(tr);
    renew();
}

var renew = function(){
    let list = document.getElementById("table").getElementsByTagName("tr");
    number_of_rows = 0;
    for(let tr of list){
        if(tr.className!="heading"){
            tr.id = ++number_of_rows;
            if(number_of_rows%2==0){ tr.className = "even"; }
            else { tr.className = "odd"; }            
        }
    }
    console.log(list);
}

var del = function() {
    let table = document.getElementById("table");
    let list = table.getElementsByTagName("tr");
    for (let i=number_of_rows;i>0;i--){
        for(let row of list){
            if(row.className!="heading"){
                let check = row.getElementsByClassName("checktd")[0];
                if(check.checked){
                    table.removeChild(row);
                }
            }
        }
    }
    renew();
}

var makeNewTr = function() {
    let check = document.createElement("input");
    let name = document.getElementById("Name");
    let studentId = document.getElementById("StudentId");
    let grade = document.getElementById("Grade");
    let table = document.getElementById("table");
    let tr = document.createElement("tr");
    check.type = "checkbox";
    check.className = "checktd";
    tr.appendChild(check);
    addTd2Tr(name.value, tr);
    addTd2Tr(studentId.value, tr);
    addTd2Tr(grade.value, tr);
    return tr;
}

var addTd2Tr = function(value, tr){
    let temp = document.createElement("td");
    temp.className = "element";    
    temp.innerText = value;
    tr.appendChild(temp);
}
