import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

type Props = {
  onAdd: (text: string) => void;
};

export default function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState<string>('');

  function handleSave() {
    if (!text.trim()) return;
    onAdd(text);
    setText('');
  }

  return (
    <View style={styles.box}>
      <View style={styles.row}>
        <TextInput
          placeholder="Enter task"
          value={text}
          onChangeText={setText}
          style={styles.input}
        />
        <Button title="Add" onPress={handleSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#000000',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    marginRight: 10,
    fontSize: 16,
  },
});
