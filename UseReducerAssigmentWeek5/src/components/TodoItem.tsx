import { Pressable, Text, View, StyleSheet, LayoutChangeEvent } from 'react-native';
import { useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  item: Todo;
  onToggle: (id: string) => void;
};

export default function TodoItem({ item, onToggle }: Props) {
  const [textWidth, setTextWidth] = useState<number>(0);

  function onTextLayout(e: LayoutChangeEvent) {
    setTextWidth(e.nativeEvent.layout.width);
  }

  return (
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
  );
}

const styles = StyleSheet.create({
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
});
