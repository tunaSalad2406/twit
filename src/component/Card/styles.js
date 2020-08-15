import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: { paddingHorizontal: 10, paddingVertical: 5, minHeight: 250 },
  ava: { height: 50, width: 50, borderRadius: 25 },
  twitImg: { minHeight: 250, width: "100%" },
  largeTwitImg: { width: "100%", height: 300 },
  twitLowerBody: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  twitContent: { marginVertical: 20, alignItems: 'flex-start', width: '100%' },
  flex: { flex: 1 },
  interest: { marginRight: 10 },
  right: { justifyContent: 'flex-end', alignItems: 'center', flex: 1 },
  middle: { justifyContent: 'center', alignItems: 'center', flex: 1 },
  left: { justifyContent: 'flex-start', alignItems: 'center', flex: 1 },
  interestButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }
});

export default styles;
