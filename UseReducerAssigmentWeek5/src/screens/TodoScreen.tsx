import { View, FlatList, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoItem from '../components/TodoItem';
import TodoInput from '../components/TodoInput';
import { Todo } from '../types/Todo';

const STORAGE_KEY = 'TODOS';

export default function TodoScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  async function loadTodos(): Promise<void> {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTodos(JSON.parse(stored) as Todo[]);
    }
  }

  function addTodo(text: string): void { // Taskin lisäys
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      done: false,
    };

    console.log('➕ Adding todo:', newTodo); // Consoleen viesti, kun lisätään uusi Taski

    setTodos(prev => [...prev, newTodo]);
  }

  function toggleTodo(id: string): void { // Taskin tehdyksi/tekemättömäksi merkkaus
    console.log('🔁 Toggling todo with id:', id);

    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? (() => {
            const updated = { ...todo, done: !todo.done };
            console.log('✅ Updated todo:', updated); // Consoleen viesti, kun Toglataan Tehdyksi tai tekemättömäksi
            return updated;
          })()
          : todo
      )
    );
  }

  return (
    <View style={styles.container}>
      <TodoInput onAdd={addTodo} />

      <FlatList<Todo>
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TodoItem item={item} onToggle={toggleTodo} />
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
