import { Toast as NBToast } from 'native-base';
import { Platform } from "react-native"

const permissonCheck = (userId, authorId) => {
  return userId === authorId;
}

const convertDate = timeString => {
  const day = new Date(timeString).toLocaleString('en-us', { weekday: 'long' });
  const date = new Date(timeString).getDate();
  const month = new Date(timeString).toLocaleString('en-us', { month: 'long' });
  const hour = new Date(timeString).getHours();
  const minute = new Date(timeString).getMinutes();
  const second = new Date(timeString).getSeconds();

  if (Platform.OS === "android") {
    return `${day}`
  }
  return `${day}, ${month} ${date} ${hour}:${minute}:${second}`
}

const convertImg = image => {
  const i = image.split(".")[1];
  return `https://afternoon-gorge-81699.herokuapp.com/public${i}`
}

const createRandomString = () => {
  return Math.random().toString(36).slice(2);
}

const Toast = {
  error: message =>
    NBToast.show({
      text: message,
      textStyle: { fontSize: 20 },
      buttonTextStyle: { fontSize: 20 },
      duration: 3000,
      type: 'danger',
    }),
  success: message =>
    NBToast.show({
      text: message,
      textStyle: { fontSize: 20 },
      buttonTextStyle: { fontSize: 20 },
      duration: 3000,
      type: 'success',
    })
};

setError = error => {
  Toast.error(`Failed: ${error}`);
};

setSuccess = success => {
  Toast.success(`Successful: ${success}`);
};

export default { permissonCheck, convertDate, convertImg, setError, setSuccess, createRandomString }
