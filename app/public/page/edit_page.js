var remake_table = function(){
    let data_list = get_new_data();
    for(let data of data_list){
        let tr = remake_tr(data);
        tr.id = data.id;
        tr.class = "odd";
        number_of_rows = parseInt(tr.id);
        $("#table").append(tr);
        renew();
    }
}
var remake_tr = function(data){
    let name = data.name;
    let studentId = data.studentId;
    let grade = data.grade;
    let table = $("#table");
    let tr = document.createElement("tr");
    addTd2Tr(make_box(name), tr);
    addTd2Tr(make_box(studentId), tr);
    addTd2Tr(make_box(grade), tr);
    return tr;
}
var make_box = (text) => {
    let temp = document.createElement("input");
    temp.type = "text";
    temp.value = text;
    return temp;
}
var get_new_data = function(){
    var doc;
    var http = $.ajax({
        url:"http://localhost:3000/get", 
        async:false,
        dataType:"json",
        type:"GET",
        success: (result,status)=>{
            doc = result;
            console.log(status);
        },
        error: (jqXHR, textStatus, errorThrown)=> {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
    return doc;
}
var addTd2Tr = function(value, tr){
    let temp = document.createElement("td");
    temp.className = "element";
    temp.append(value);
    tr.appendChild(temp);
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
var back = ()=>{
    let arr = [];
    let list = $("tr").find("input");
    let start_of_tr = 0;
    let tr_id = 0;
    while(list[start_of_tr]!=undefined){
        let name = list[start_of_tr++].value;
        let studentId = list[start_of_tr++].value;
        let grade = list[start_of_tr++].value;
        let temp = {
            id: ++tr_id,
            name: name,
            studentId: studentId,
            grade: grade
        }
        arr.push(temp);
    }
    let res = { 
        array: arr
    }
    $.ajax({
        url:"http://localhost:3000/back", 
        async:true, 
        dataType:"json", 
        data:res, 
        type:"POST",
        success: ()=> {
            window.location.href="http://localhost:3000/"
        }
    });
}
window.onload = remake_table;