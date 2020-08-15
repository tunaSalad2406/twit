import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';

const InputComponent = ({ value, changeValue, comment }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.innerWrapper}>
        <TextInput placeholder='Comment' value={value}
          style={styles.input} onChangeText={changeValue} />
        <TouchableOpacity style={styles.button} onPress={comment}>
          <Icon active name='send' />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingVertical: 5,
    paddingHorizontal: 10, fontSize: 14,
    width: "100%", flex: 5,
    height: 60
  },
  wrapper: {
    flexDirection: 'row', width: '100%',
    justifyContent: 'center', borderWidth: 0.3,
    alignItems: 'center', borderColor: 'lightgray'
  },
  innerWrapper: {
    flexDirection: 'row',
    width: '100%', justifyContent: 'center',
    alignItems: 'center'
  },
  button: { width: 50, alignItems: 'center', flex: 1 },
});

InputComponent.propsTypes = {
  value: PropTypes.string.isRequired,
  changeValue: PropTypes.func.isRequired,
  comment: PropTypes.func.isRequired
}

InputComponent.defaultProps = {}

export default InputComponent
