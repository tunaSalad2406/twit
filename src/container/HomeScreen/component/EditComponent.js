import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_MUTATION } from "./gql"
import PropTypes from 'prop-types';
import { utils } from "../../../core";
import { UPDATE_TWIT } from "../../../constant"

const EditComponent = ({ author, createdAt, content = "", id, toggleEdit }) => {
  const [value, changeValue] = React.useState(content)
  const [updateTwit] = useMutation(UPDATE_MUTATION);

  React.useEffect(() => {
    changeValue(content)
  }, [content])

  edit = async () => {
    try {
      await updateTwit({ variables: { id, content: value } });
      toggleEdit();
      utils.setSuccess(UPDATE_TWIT.SUCCESSFUL)
    } catch (err) {
      utils.setError(UPDATE_TWIT.FAILED)
    }
  }

  return (
    <View>
      <View style={styles.header}>
        <Text>Edit Twit</Text>
      </View>
      <TextInput value={value} style={styles.input} onChangeText={changeValue} />
      <View style={styles.header}>
        <TouchableOpacity onPress={edit}><Text>Edit</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: { paddingVertical: 5, paddingHorizontal: 10, borderWidth: 1, marginHorizontal: 20, height: 50 },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderColor: 'lightgray'
  }
});

EditComponent.propsTypes = {
  author: PropTypes.object,
  createdAt: PropTypes.string,
  content: PropTypes.string,
  id: PropTypes.string,
  toggleEdit: PropTypes.func
}

EditComponent.defaultProps = {}

export default EditComponent
