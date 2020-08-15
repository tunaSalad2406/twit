import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage"
import { Header, Icon, Left, Body, Right } from 'native-base';
import NavigatorMap from "../../navigators/NavigatorMap"
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../../core"
import PropTypes from 'prop-types';
import { ACCESS_TOKENS } from "../../constant"

const HeaderComponent = ({ screen }) => {
  const navigation = useNavigation();
  const authContext = React.useContext(AuthContext);
  const { logout: storeLogout } = authContext;
  const toggleMenu = () => {
    navigation.toggleDrawer()
  }
  const logout = async () => {
    await AsyncStorage.removeItem(ACCESS_TOKENS);
    storeLogout();
  }
  return (
    <React.Fragment>
      <Header style={styles.bg}>
        <Left style={styles.sides}>
          <TouchableOpacity onPress={toggleMenu}>
            <Icon name="md-menu" style={styles.icon} />
          </TouchableOpacity>
        </Left>
        <Body style={styles.center}>
          <Text style={styles.screenText}>{screen}</Text>
        </Body>
        <Right style={styles.sides}>
          <TouchableOpacity onPress={logout}>
            <Icon name="md-log-out" style={styles.icon} />
          </TouchableOpacity>
        </Right>
      </Header>
      <StatusBar hidden />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  icon: { fontSize: 20, paddingHorizontal: 15 },
  screenText: { fontSize: 18 },
  sides: { flex: 0.2 },
  center: { flex: 1, alignItems: "center" },
  bg: { backgroundColor: 'transparent' }
});

HeaderComponent.propsTypes = {
  screen: PropTypes.string.isRequired,
}

HeaderComponent.defaultProps = {}

export default HeaderComponent;
