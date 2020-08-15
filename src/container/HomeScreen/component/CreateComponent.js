import React from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  Picker,
  ScrollView
} from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_MUTATION } from "./gql"
import { Icon } from 'native-base';
import { ReactNativeFile } from 'apollo-upload-client';
import { CREATE_TWIT } from "../../../constant";
import { utils } from "../../../core"
import PropTypes from 'prop-types';

const options = {
  title: 'Select Uploading Picture',
};

const CreateComponent = ({ toggleCreate }) => {
  const [value, changeValue] = React.useState("");
  const [isShow, showPicker] = React.useState(false);
  const [image, changeImage] = React.useState({});

  const [createTwit] = useMutation(CREATE_MUTATION);
  const input = React.createRef();
  React.useEffect(() => input.current.focus(), [])

  const create = async () => {
    try {
      const file = new ReactNativeFile({
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });
      await createTwit({ variables: { content: value, file } });
      toggleCreate();
      utils.setSuccess(CREATE_TWIT.SUCCESSFUL)
    } catch (err) {
      utils.setError(CREATE_TWIT.FAILED)
    }
  }

  const gallery = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response) {
        changeImage({ ...response, fileName: utils.createRandomString() })
      }
    });
  }

  const camera = () => {
    ImagePicker.launchCamera(options, (response) => {
      if (response) {
        changeImage({ ...response, fileName: utils.createRandomString() })
      }
    });
  }

  const pickImage = () => {
    showPicker(true)
  };

  const closeImage = () => {
    changeImage({})
  }

  return (
    <View>
      <ScrollView>
        <View style={styles.header}>
          <Text>Create Twit</Text>
        </View>
        <TextInput value={value} style={styles.input} onChangeText={changeValue} ref={input} />
        <View style={styles.body}>
          {image.uri && <View style={styles.imgWrapper}>
            <Image source={{ uri: image.uri }} style={styles.img} />
            <TouchableOpacity onPress={closeImage} style={styles.closeButton}>
              <Icon style={styles.white} name="ios-close-circle-outline" />
            </TouchableOpacity>
          </View>}
          {!isShow && <TouchableOpacity onPress={pickImage} style={styles.button}><Text>Get image</Text></TouchableOpacity>}
          {isShow
            && <View>
              <TouchableOpacity onPress={camera} style={styles.button}><Text>Get image from camera</Text></TouchableOpacity>
              <TouchableOpacity onPress={gallery} style={styles.button}><Text>Get image from gallery</Text></TouchableOpacity>
            </View>
          }
          <TouchableOpacity onPress={create} style={styles.button}><Text>Create Twit</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: { paddingVertical: 5, paddingHorizontal: 10, borderWidth: 1, marginHorizontal: 20, height: 50, marginBottom: 20 },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderColor: 'lightgray'
  },
  white: { color: "white" },
  body: {
    alignItems: 'center'
  },
  imgWrapper: { alignItems: 'center', justifyContent: 'center' },
  closeButton: { position: 'absolute', right: 5, top: 5 },
  img: { height: 200, width: 300, marginBottom: 20 },
  button: { borderWidth: 1, paddingVertical: 10, paddingHorizontal: 20, marginVertical: 10, minWidth: "70%", justifyContent: 'center', alignItems: 'center' }
});

CreateComponent.propsTypes = {
  toggleCreate: PropTypes.func,
}

CreateComponent.defaultProps = {}

export default CreateComponent
