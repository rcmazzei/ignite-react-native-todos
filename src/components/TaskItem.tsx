import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ItemWrapper } from './ItemWrapper';
import trashIcon from '../assets/icons/trash/trash.png'
import { Task } from './TasksList';

interface TaskItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title: string) => void;
}

export const TaskItem = ({ task, index, toggleTaskDone, removeTask, editTask }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  // const [selectedTask, setSelectedTask] = useState<Task>();
  const [taskTitle, setTaskTitle] = useState('');

  const handleEditTask = (task: Task) => {
    setIsEditing(true);
    // setSelectedTask(task);
    setTaskTitle(task.title);
  }

  const handleSaveTask = () => {
    if (isEditing) {
      editTask(task.id, taskTitle);
      // editTask(selectedTask.id, taskTitle);
      setIsEditing(false);
      // setSelectedTask(undefined);
    }
  }

  const handleCancelEditing = () => {
    if (isEditing) {
      setIsEditing(false);
      // setSelectedTask(undefined);
    }
  }
  return (
    <ItemWrapper index={index}>
      <View style={styles.container}>
        <View style={styles.taskContainer}>
          <TouchableOpacity
            testID={`button-${index}`}
            activeOpacity={0.7}
            style={styles.taskButton}
            onPress={() => {
              toggleTaskDone(task.id);
            }}
          >
            <View
              testID={`marker-${index}`}
              style={task.done ? styles.taskMarkerDone : styles.taskMarker}
            >
              {task.done && (
                <Icon
                  name="check"
                  size={12}
                  color="#FFF"
                />
              )}
            </View>
            {
              !isEditing &&
              // selectedTask?.id !== task.id ?
              (
                <Text
                  style={task.done ? styles.taskTextDone : styles.taskText}
                >
                  {task.title}
                </Text>
              )
            }
          </TouchableOpacity>
          {
            isEditing && (
              // selectedTask?.id === task.id && (
              <TextInput
                style={[styles.taskText]}
                value={taskTitle}
                onChangeText={(text) => {
                  setTaskTitle(text);
                }}
                onSubmitEditing={() => {
                  handleSaveTask();
                }}
                autoFocus={true}
              />
            )
          }
        </View>
        <View style={styles.buttonContainer}>
          {
            isEditing ? (
              // selectedTask?.id === task.id ? (
              <TouchableOpacity
                testID={`edit-${index}`}
                style={styles.actionButton}
                onPress={() => {
                  handleCancelEditing();
                }}
              >
                <Icon name="x" size={24} color="#B2B2B2" />
              </TouchableOpacity>
            ) : (

              <TouchableOpacity
                testID={`edit-${index}`}
                style={styles.actionButton}
                onPress={() => {
                  handleEditTask(task);
                }}
              >
                <Icon name="edit-3" size={24} color="#B2B2B2" />
              </TouchableOpacity>
            )
          }
          <TouchableOpacity
            testID={`trash-${index}`}
            style={styles.actionButton}
            onPress={() => {
              removeTask(task.id);
            }}
            disabled={isEditing}
          // disabled={selectedTask?.id === task.id}
          >
            <Image
              source={trashIcon}
              style={{ opacity: isEditing ? 0.2 : 1 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ItemWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  taskContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  actionButton: {
    marginLeft: 16,
  },
  taskButton: {
    // flex: 1,
    paddingLeft: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})