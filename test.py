import json
import datetime

taskID = 1
_a = 42

def sayHi():
    #taskID = taskID+1
    print(_a)
    #_a = 43
    #print(_a)


# Testing an array of dicts as object
tasks=[]
todo = {'user': 'mats', 'task': 'Clean windows'}
tasks.append(todo)
todo = {'user': 'mats', 'task': 'Then go shopping'}
tasks.append(todo)
todo = {'user': 'susanne', 'task': 'Do some workout'}
tasks.append(todo)
print(json.dumps(tasks))

print("Now we shall call sayHi()")
sayHi()

# Test of time and date
dt = '{}'.format(datetime.datetime.now())  
print (dt)