function myFunction() {
    document.getElementById("demo2").innerHTML = "Hello from myFunction()...";
    console.log("hi from myFunction()")
}

// GET
function GETFunction() {
    $.get("/GETIt", function(data, status){
        //alert("Data: " + data + "\nStatus: " + status);
        document.getElementById("demo3").innerHTML = data;
        console.log("Data: " + data + "\nStatus: " + status);
    });    
}

// Post
function PostFunction() {

    alert("Hi from PostFunction")
    var myObj = {name: "John", age: 31, city: "New York"};
    var myJSON = JSON.stringify(myObj);
    //alert("JSON Object is: " + myJSON)    
    $.post("/PostIt",myJSON,
    //{
        //data: myJSON
    //    name: "Kalle Anka",
    //    type: "Duck"
    //},
    function(data, status){
        document.getElementById("demo4").innerHTML = "nnn";
        alert("Datax: " + data + "\nStatus: " + status);
    });
}

// Post
function PostFunctionUsingAjax() {
    alert("Hi from PostFunctionUsingAjax")

    var data = {name: "John", age: 31, city: "New York"};

    $.ajax({
        type: 'POST',
        url: '/PostItUsingAjax',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data),
        //context: Form,
        // Callback function. Note that when Python returns a JSON-object, 'callback' is already parsed, and object members can be accessed directly
        success: function(callback, status) {
            
            //console.log(callback);
            //alert($.parseJSON(callback))
            alert("Callback status: " + callback.Status + " and code: " + callback.Code + " and http status: " + status) // These are JSON object members returned from Python
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
