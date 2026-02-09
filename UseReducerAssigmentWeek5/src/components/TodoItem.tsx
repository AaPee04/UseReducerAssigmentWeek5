import { Pressable, Text, View, StyleSheet, LayoutChangeEvent } from 'react-native';
import { useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  item: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function TodoItem({ item, onToggle, onRemove }: Props) {
  const [textWidth, setTextWidth] = useState<number>(0);

  function onTextLayout(e: LayoutChangeEvent) {
    setTextWidth(e.nativeEvent.layout.width);
  }

  return (
    <View style={styles.row}>
    <Pressable onPress={() => onToggle(item.id)} style={styles.pressable}>
      <View style={styles.textWrapper}>
        <Text
          style={styles.text}
          onLayout={onTextLayout}
        >
          {item.text}
        </Text>

        {item.done && (
          <View
            style={[
              styles.strike,
              { width: textWidth },
            ]}
          />
        )}
      </View>
    </Pressable>
    <Pressable
    onPress={() => onRemove(item.id)}
    style={styles.removeButton}
    >
      <Text style={styles.removeText}>❌</Text>
    </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  pressable: {
    paddingVertical: 8,
  },
  textWrapper: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 18,
    color: '#ffffff',
  },
  strike: {
    position: 'absolute',
    left: 0,
    top: '50%',
    height: 2,
    backgroundColor: '#000',
  },
  removeButton: {
    paddingHorizontal: 6,
  },
  removeText: {
    fontSize: 18,
  },
});
