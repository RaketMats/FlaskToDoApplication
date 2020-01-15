// Add to do items to the list
// Here is about how to parse an object array in javascript: https://stackoverflow.com/questions/11468806/json-parse-for-array-of-object
function AddToDo() {
    //alert("Hi from AddToDo")

    var data = {name: "John", age: 31, city: "New York"};

    // Build the todo-object
    var task = document.getElementById("txtToDo").value;
    var todo = {user: "Mats", time: "181105", task: task};
    //alert(todo.task);

    $.ajax({
        type: 'POST',
        url: '/AddToDo',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(todo),
        //context: Form,
        // Callback function. Note that when Python returns a JSON-object, 'callback' is already parsed, and object members can be accessed directly
        success: function(callback, status) {
            
            //console.log(callback);
            //alert($.parseJSON(callback))
            alert("Callback status: " + callback.Status + " and code: " + callback.Code + " and http status: " + status) // These are JSON object members returned from Python
            document.getElementById("todolist").innerHTML = callback.Status;	

            //alert(callback.Code)
            //alert(status) // This is the http status
            
            // Test javascript JSON object
            //var obj = jQuery.parseJSON('{"name":"John"}')
            //alert("Success: " + obj.name)
            // Watch out for Cross Site Scripting security issues when setting dynamic content!
        },
        error: function() {
            //$(this).html("error!");
            alert("Error")
        }
    });
}


// Get items
function GetToDo() {
    alert("Hi from GetToDo()")

    // Build request
    var data = {verb: "get", noun: "all"};

    $.ajax({
        type: 'POST',
        url: '/GetToDo',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data),
        //context: Form,
        // Callback function. Note that when Python returns a JSON-object, 'callback' is already parsed, and object members can be accessed directly
        success: function(callback, status) {
            
            //alert("Hi from callback()")
            //console.log(callback);
            //alert("Callback: " + callback + " and http status: " + status) // These are JSON object members returned from Python
            
            // This works
            //alert(callback[0].user);

            // Why does this not work?
            //for(var item in callback) {
            //    alert(item.user);
            //}

            // This also works
            var arrayLength = callback.length;
            document.getElementById("todolist").innerHTML = "";	
            for (var i = 0; i < arrayLength; i++) {
                //alert(callback[i].user);
                //document.getElementById("todolist").innerHTML += callback[i].user;	
                document.getElementById("todolist").innerHTML += callback[i].id;	
                document.getElementById("todolist").innerHTML += " - ";	
                document.getElementById("todolist").innerHTML += callback[i].task;	
                document.getElementById("todolist").innerHTML += "<br>";	
            }
        },
        error: function() {
            //$(this).html("error!");
            alert("Error")
        }
    });
}