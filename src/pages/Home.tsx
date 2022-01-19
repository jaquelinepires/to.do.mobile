import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;

}
export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find(task => task.title === newTaskTitle);

    if(taskWithSameTitle) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    } 
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldTasks => [...oldTasks, newTask])
    }

  function handleToggleTaskDone(id: number) {
    const updatedTask = tasks.map(task => ({...task}))

    const taskToBeMarkedAsDone = updatedTask.find(item => item.id === id)

    if(!taskToBeMarkedAsDone)
    return;
    
    taskToBeMarkedAsDone.done = !taskToBeMarkedAsDone.done
    setTasks(updatedTask)
  }
 
  function handleRemoveTask(id: number) {
  Alert.alert('Remover Item','Tem certeza que você deseja remover esse item?', [
    //continua item
  {
    style: 'cancel',
    text: 'Não'
  },
  { 
    //remove item
    style:'destructive',
    text: 'Sim',
    onPress: () =>{
      const updatedTask = tasks.filter(task => task.id !== id)

      setTasks(updatedTask)
    }
  }
 ])
}

  function handleEditTask({taskId, taskNewTitle}: EditTaskArgs) {
    const updatedTask = tasks.map(task => ({...task}))

    const taskToBeUpdated = updatedTask.find(item => item.id === taskId)

    if(!taskToBeUpdated)
    return;

    taskToBeUpdated.title = taskNewTitle
    setTasks(updatedTask)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1e25'
  }
})