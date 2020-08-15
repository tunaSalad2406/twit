import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Keyboard,
  RefreshControl
} from 'react-native';
import {
  Container,
} from 'native-base';
import { ModalComponent, CardComponent, HeaderComponent } from "../../component";
import { EditComponent, CreateComponent } from "./component";
import {
  FEED_QUERY,
  CREATE_TWIT_SUBSCRIPTION,
  DELETE_TWIT_SUBSCRIPTION,
  UPDATE_TWIT_SUBSCRIPTION,
  INTEREST_TWIT_SUBSCRIPTION
} from "./gql";
import { useQuery, useSubscription } from '@apollo/react-hooks';
import NavigatorMap from "../../navigators/NavigatorMap";

export const HomeScreen = () => {
  const [createModalOpen, toggleCreateModal] = React.useState(false)
  const [feeds, setFeeds] = React.useState([]);
  // init

  const { loading, error, data: feedData, refetch } = useQuery(FEED_QUERY);
  // feed datas

  const { data: subscribeData } = useSubscription(CREATE_TWIT_SUBSCRIPTION);
  const newFeed = subscribeData && subscribeData.createTwit;
  // create subscription

  const { data: subscribeDeleteData } = useSubscription(DELETE_TWIT_SUBSCRIPTION);
  const deleteTwitID = subscribeDeleteData && subscribeDeleteData.deleteTwit;
  // delete subscription

  const { data: subscribeUpdateData } = useSubscription(UPDATE_TWIT_SUBSCRIPTION);
  const editedFeed = subscribeUpdateData && subscribeUpdateData.updateTwit;
  // edit subscription

  const { data: subscribeInterestData } = useSubscription(INTEREST_TWIT_SUBSCRIPTION);
  const interestTwitFeed = subscribeInterestData && subscribeInterestData.interestTwit;
  // interest subscription

  useEffect(() => {
    setFeeds(feedData && feedData.getTwits || [])
  }, [feedData && feedData.getTwits])

  useEffect(() => {
    if (newFeed) {
      setFeeds([newFeed, ...feeds])
    }
  }, [newFeed])

  useEffect(() => {
    if (deleteTwitID) {
      setFeeds(feeds.filter(feed => feed.id !== deleteTwitID))
    }

  }, [deleteTwitID])

  useEffect(() => {
    if (editedFeed) {
      const newArr = feeds.slice();
      const editTwit = newArr.find(feed => feed.id === editedFeed.id);
      editTwit.content = editedFeed.content;
      setFeeds(newArr)
    }
  }, [editedFeed])

  useEffect(() => {
    if (interestTwitFeed) {
      const newArr = feeds.slice();
      const feed = newArr.find(feed => feed.id === interestTwitFeed.id);
      feed.interestCount = interestTwitFeed.interestCount;
      setFeeds(newArr)
    }
  }, [interestTwitFeed])


  const toggleCreate = () => {
    toggleCreateModal(!createModalOpen)
  }

  const focus = () => {
    Keyboard.dismiss()
    toggleCreate()
  }

  const _renderItem = ({ item }) => {
    const { author, content, createdAt, id, image, interestCount, commentCount } = item;
    return (
      <CardComponent
        allowComment
        allowEdit
        author={author}
        content={content}
        createdAt={createdAt}
        id={id}
        image={image}
        renderEditComponent={props => <EditComponent {...props} />}
        interestCount={interestCount}
        commentCount={commentCount}
      />
    );
  }

  return (
    <Container style={styles.container}>
      <HeaderComponent screen={NavigatorMap.Home} />
      <View style={styles.content}>
        <TextInput caretHidden={true} style={styles.input} placeholder="Write something here..." onFocus={focus} />
        <FlatList
          refreshControl={<RefreshControl
            colors={["#9Bd35A", "#689F38"]}
            refreshing={loading}
            onRefresh={() => refetch()}
          />}
          data={feeds}
          renderItem={item => _renderItem(item)}
          keyExtractor={item => `feed#${item.id}`}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <View style={styles.footerHeight} />}
        />
        <ModalComponent open={createModalOpen} toggle={toggleCreate}>
          <CreateComponent toggleCreate={toggleCreate} />
        </ModalComponent>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  footerHeight: { height: 200 },
  input: { marginBottom: 30, paddingVertical: 5, paddingHorizontal: 10, borderWidth: 1, height: 50, borderColor: 'lightgray', borderRadius: 5 }
});

