import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadExists = tasks.find(task => task.title === newTaskTitle);

    if (taskAlreadExists) {
      Alert.alert('Task já cadastrada', 'Você já tem uma tarefa com o mesmo nome cadastrada.');
      return;
    }

    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks(oldTasks => [...oldTasks, newTask]);
  }

  function handleTaskEditing(id: number, title: string) {
    setTasks(oldTasks => oldTasks.map(task =>
      task.id === id ? {
        ...task,
        title,
      } : task));
  }

  function handleToggleTaskDone(id: number) {
    setTasks(oldTasks => oldTasks.map(task =>
      task.id === id ? {
        ...task,
        done: !task.done,
      } : task));

    // const newTasks = [...tasks];
    // const task = newTasks.find(task => task.id === id);

    // if (task) {
    //   task.done = !task.done;

    //   setTasks(newTasks);
    // }
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover Item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          onPress: () => {
            setTasks(oldTasks => oldTasks.filter(task => task.id !== id));
          }
        }
      ],
    )
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleTaskEditing}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})