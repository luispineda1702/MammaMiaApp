import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ViewStyle } from 'react-native';


type MyButtonProps = {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    style?: ViewStyle;
  };
  
  function MyButton(props: MyButtonProps) {
    const { title, onPress, style } = props;
  
    return (
      <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  }
  
  const styles = StyleSheet.create({
    button: {
      backgroundColor: 'green',
      paddingVertical: 12,
      paddingHorizontal: 24,
      width: '50%',
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      marginTop: 30,
    },
    text: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600'
    }
  });
  
  export default MyButton;