import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  inputWrapper: { width: '100%', paddingHorizontal: 10 },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    marginBottom: 10
  },
  scrollviewInner: { padding: 10, width: '100%' },
  scrollviewOuter: { height: "70%", borderWidth: 0.3, marginHorizontal: 10, borderColor: 'lightgray', marginBottom: 10 },
  button: { width: 50, alignItems: 'center', flex: 1 },
  comment: { paddingHorizontal: 10, paddingVertical: 5, minHeight: 50 },
  bottomGap: { height: 50 },
  time: { color: 'gray', fontSize: 12 },
  noCmt: {
    width: '100%',
    alignItems: 'center', height: 60, justifyContent: 'center'
  }
});

export default styles
