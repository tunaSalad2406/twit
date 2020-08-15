import React from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text, Icon } from 'native-base';
import { StyleSheet } from "react-native"
import { ME_QUERY } from "./gql"
import { useQuery } from "@apollo/react-hooks"
import { HeaderComponent } from "../../component"
import NavigatorMap from "../../navigators/NavigatorMap"

export const ProfileScreen = props => {
  const { error, loading, data } = useQuery(ME_QUERY);
  const profile = data && data.me || {};

  return (
    <Container>
      <HeaderComponent screen={NavigatorMap.Profile} />
      <Content>
        <Card>
          <CardItem>
            <Body style={styles.body}>
              <Icon name="ios-contact" style={styles.icon}></Icon>
              <Text style={styles.text}>
                {`E-mail: ${profile.email}`}
              </Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  body: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  icon: { fontSize: 16, marginRight: 10 },
  text: { fontSize: 16 }
})
