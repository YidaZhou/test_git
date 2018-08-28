var number_of_rows = 0;

var add = function() {
    add_data();
    let tr = makeNewTr();
    tr.id = number_of_rows;
    console.log(tr);
    $("#table").append(tr);
    renew();
}

var goto_edit_page = function() {
    $.ajax({
        url:"http://localhost:3000/edit_page", 
        async:true, 
        type:"GET",
        success: ()=> {
            window.location.href="http://localhost:3000/edit_page"
        }
    });
}

var remake_table = function(){
    let data_list = get_new_data();
    for(let data of data_list){
        let tr = remake_tr(data);
        tr.id = data.id;
        tr.class = "odd";
        number_of_rows = parseInt(tr.id);
        $("#table").append(tr);
        renew();
        console.log(tr);
    }
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

var renew_data = function(){
    $.ajax({
        url:"http://localhost:3000/renew_data", 
        async:true, 
        type:"POST"
    });
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
            let ID = current[0].id;
            delete_data(ID);
            current.remove();
        }
    }
    renew();
    renew_data();
}

var remake_tr = function(data){
    let check = document.createElement("input");
    let name = data.name;
    let studentId = data.studentId;
    let grade = data.grade;
    let table = $("#table");
    let tr = document.createElement("tr");
    check.type = "checkbox";
    check.className = "checktd";
    tr.appendChild(check);
    addTd2Tr(name, tr);
    addTd2Tr(studentId, tr);
    addTd2Tr(grade, tr);
    return tr;
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

var add_data = function() {
    let name = $("#Name").val();
    let studentId = $("#StudentId").val();
    let grade = $("#Grade").val();
    let id = ++number_of_rows;
    $.ajax({
        url:"http://localhost:3000/add", 
        async:true, 
        dataType:"json", 
        data:{
            id: id,
            name: name,
            studentId: studentId,
            grade: grade
        }, 
        type:"POST",
        success: function(result, err){
            console.log();
        }
    });
}

var delete_data = function(ID){
    $.ajax({
        url:"http://localhost:3000/del", 
        async:true, 
        dataType:"json", 
        data:{
            id: ID,
        }, 
        type:"POST"
    });
}
// xmlhttp=$.ajax({url:"page/page.xml",async:true, dataType:"xml", data:"<p>hello world.</p>", success: function(result, status){
//     var n = document.createElement("row");
//     n.id = "1";
//     n.innerHTML = "This is another test.";
//     var main = result.getElementsByTagName("note")[0];
//     main.appendChild(n);
//     console.log(main);
// }});


// xmlDoc=xmlhttp.responseXML; 
// if (xmlhttp.readyState==4 && xmlhttp.status==200){
//     var s = xmlDoc;
//     console.log(xmlhttp);    
// }

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
    // $(document).ajaxComplete(function(event, xhr, settings){
    //     var obj = xhr.responseText;
    //     // var data = obj.data;
    //     console.log(obj)
    // });
}

window.onload = remake_table;