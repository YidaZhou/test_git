

var number_of_rows = 0;

var add = function() {
    let tr = makeNewTr();
    tr.id = ++number_of_rows;
    $("#table").append(tr);
    renew();
}

var renew = function(){
    let list = $("#table tr");
    number_of_rows = 0;
    for(let tr of list){
        if(tr.className!="heading"){
            tr.id = ++number_of_rows;
            if(number_of_rows%2==0){ 
                tr.className = "even"; 
            } else { 
                tr.className = "odd"; 
            }            
        }
    }
}

var del = function() {
    let list = $("#table").find("tr");
    let current = list.first();
    let next = current.next();
    for(let i=0;i<number_of_rows;i++){
        current = next;
        next = current.next();
        let check = current.find("input:checkbox");
        if(check.is(":checked")){
            current.remove();
        }
    }
    renew();
}

var makeNewTr = function() {
    let check = document.createElement("input");
    let name = $("#Name");
    let studentId = $("#StudentId");
    let grade = $("#Grade");
    let table = $("#table");
    let tr = document.createElement("tr");
    check.type = "checkbox";
    check.className = "checktd";
    tr.appendChild(check);
    addTd2Tr(name.val(), tr);
    addTd2Tr(studentId.val(), tr);
    addTd2Tr(grade.val(), tr);
    return tr;
}

var addTd2Tr = function(value, tr){
    let temp = document.createElement("td");
    temp.className = "element";    
    temp.innerText = value;
    tr.appendChild(temp);
}

if (window.XMLHttpRequest)
{// code for IE7+, Firefox, Chrome, Opera, Safari
xmlhttp=new XMLHttpRequest();
}
else
{// code for IE6, IE5
xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}

xmlhttp.open("GET","page.xml",false);
xmlhttp.send();
xmlDoc=xmlhttp.responseXML; 