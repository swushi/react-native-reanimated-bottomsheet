import React, { useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import BottomSheet from 'react-native-reanimated-bottomsheet';

const Button = ({ label, onPress }: { label: string; onPress: any }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default function App() {
  // refs
  const bottomsheetRef = useRef<BottomSheet>(null);

  const expand = () => {
    bottomsheetRef.current?.expand();
  };

  const dismiss = () => {
    bottomsheetRef.current?.dismiss();
  };

  const collapse = () => {
    bottomsheetRef.current?.collapse();
  };

  const snapTo = (index: number) => {
    bottomsheetRef.current?.snapTo(index);
  };

  return (
    <View style={styles.container}>
      <Button label="Open to 100%" onPress={expand} />
      <Button label="Open to 75%" onPress={() => snapTo(2)} />
      <Button label="Open to 50%" onPress={() => snapTo(1)} />
      <Button label="Close to 25%" onPress={collapse} />
      <Button label="Close to 0%" onPress={dismiss} />
      <BottomSheet ref={bottomsheetRef}>
        <View style={styles.sheetContainer} pointerEvents="none">
          <Text>Im the bottom sheet!</Text>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  button: {
    borderRadius: 12,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  buttonText: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sheetContainer: {
    height: 350,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3f3f3f',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
});
