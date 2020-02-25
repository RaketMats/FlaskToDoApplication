#! /usr/bin/python
import os
from flask import Flask,render_template, request, json
import json
import datetime

app = Flask(__name__)

# This is the tasks object
_tasks = []
_taskID = 0

@app.route('/')
def hello():
    return render_template('home.html')

@app.route('/ajaxRefPage')
def signUp():
    print('hello from ajax reference page')
    return render_template('ajaxRefPage.html')

@app.route('/guiTests')
def guiTests():
    print('hello from the GUI tests page')
    return render_template('guitests.html')

@app.route('/signUpUser', methods=['POST'])
def signUpUser():
    print('hello from signUpUser')
    user =  request.form['username'];
    password = request.form['password'];
    return json.dumps({'status':'OK','user':user,'pass':password});

@app.route('/GETIt')
def GETIt():
    #if 'name' in request.args:
    #    return 'Hello ' + request.args['name']
    #else:
    #    return 'Hello John Doe'    
    #n = request.args.get("n")    
    print('hello from GETIt')
    return "Hello from GETIt"

# Ajax using Post-method
@app.route('/PostIt', methods=['POST'])
def PostIt():
    # Show the raw data
    print('hello from PostIt')
    data = request.get_data()
    print(data)
    # Try to show JSON (does not work however)
    data2 = request.get_json()
    print(data2)
    # Parse raw data into object
    y = json.loads(data)
    print("Via Python json: ",  y["age"])
    return "Hello from PostIt"

# Ajax using ajax-object
@app.route('/PostItUsingAjax', methods=['POST'])
def PostItUsingAjax():
    print("Hello from PostItUsingAjax")
    data = request.get_data()
    print(data)
    y = json.loads(data)
    print("Via Python json: ",  y["age"])
    # Note, since content in transmission is json, we need to respond in json, otherwise the $ajax-parser in JQuery results in error
    return '{"Status":"Ok", "Code":"Blue"}'

# To do page again (by some reason the ToDoPage-link below does not work)
@app.route('/ToDo')
def Test2():
    print('Hi from To do')
    return render_template('todo.html')

# Render the todo application page
@app.route('/ToDoPage')
def ToDo():
    print('Hello from todo application')
    return render_template('todo.html')

# Add todo items
@app.route('/AddToDo', methods=['POST'])
def AddToDo():
    print("Hello from AddToDo")

    global _taskID
    global _tasks

    # Interpret command
    data = request.get_data()
    print(data)
    y = json.loads(data)
    print("Via Python json: ",  y["task"])
    if y["task"].find('add:') != -1:
        print ("Found 'add'!")
        _taskID = _taskID+1
        #todo = {'id': (_taskID), 'task': y["task"]}
        #dt = '{}'.format(datetime.datetime.now()) #  date and time
        todo = {'id': ('{}'.format(datetime.datetime.now())), 'task': y["task"]}
        _tasks.append(todo)

    elif y["task"].find('delete:') != -1:
        print ("Found 'delete'!")
    elif y["task"].find('swap:') != -1:
        print ("Found 'swap'!")
    else:
        print ("Found nothing")

    # Debug show the tasks
    print("Showing all tasks:")
    for t in _tasks:
        print(t)

    # Note, since content in transmission is json, we need to respond in json, otherwise the $ajax-parser in JQuery results in error
    return '{"Status":"Good", "Code":"Green"}'


# Get todo items
@app.route('/GetToDo', methods=['POST'])
def GetToDo():
    
    global _tasks

    print("Hello from AddToDo")
    # There are no indata, using POST anyway since it is simple to use same methods in all services
    data = request.get_data()
    print(data)

    # Create a test array of dicts as object
    #tasks=[]
    #todo = {'user': 'mats', 'task': 'Clean windows'}
    #tasks.append(todo)
    #todo = {'user': 'mats', 'task': 'Then go shopping'}
    #tasks.append(todo)
    #todo = {'user': 'susanne', 'task': 'Do some workout'}
    #tasks.append(todo)
    #data = json.dumps(tasks)
    #print(data)
    
    # Note, since content in transmission is json, we need to respond in json, otherwise the $ajax-parser in JQuery results in error
    #return data
    return json.dumps(_tasks)

if __name__=="__main__":
    app.run()
