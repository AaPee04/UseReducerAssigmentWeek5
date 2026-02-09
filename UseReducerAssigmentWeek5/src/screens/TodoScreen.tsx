import { View, FlatList, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoItem from '../components/TodoItem';
import TodoInput from '../components/TodoInput';
import { useTodos } from '../hooks/useTodos';
import { Todo } from '../types/Todo';

const STORAGE_KEY = 'TODOS';

export default function TodoScreen() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();

  return (
    <View style={styles.container}>
      <TodoInput onAdd={addTodo} />

      <FlatList<Todo>
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TodoItem item={item} onToggle={toggleTodo} onRemove={removeTodo} />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  list: {
    alignItems: 'center',
  },
});
