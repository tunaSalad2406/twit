import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { useMutation, useQuery, useSubscription } from '@apollo/react-hooks';
import { Icon, List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';

import { DETAIL_QUERY, COMMENT_MUTATION, COMMENT_TWIT_SUBSCRIPTION, COMMENT_QUERY } from "./gql"
import { utils } from "../../core";
import { Card, InputComponent } from "../index";
import { UserBG } from "../Images"
import styles from "./styles"

const TwitDetail = ({ twitId }) => {
  const { data: subscribeData } = useSubscription(COMMENT_TWIT_SUBSCRIPTION);
  const commentData = subscribeData && subscribeData.commentTwit;
  // comment subscription

  const { loading, error, data } = useQuery(DETAIL_QUERY, {
    variables: { id: twitId }
  })
  const { getTwit: twitDetail } = data || {};
  const { comments } = twitDetail || [];
  // twit detail query

  const { data: commentQuery, refetch } = useQuery(COMMENT_QUERY, {
    variables: { id: twitId }
  })
  const { getComments: commentsList } = commentQuery || [];
  // comments list query

  const [value, changeValue] = React.useState("");
  const [commentTwit] = useMutation(COMMENT_MUTATION);
  // comment mutation

  React.useEffect(() => {
    if (commentData && commentData.id === twitId) {
      refetch()
    }
  }, [commentData])

  const comment = async () => {
    try {
      await commentTwit({ variables: { id: twitId, content: value } });
      changeValue("");
    } catch (err) {
      utils.setError(UPDATE_TWIT.FAILED)
    }
  }

  return (
    <View>
      <View style={styles.header}>
        <Text>Twit Detail</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollviewInner} style={styles.scrollviewOuter}>
        <Card {...twitDetail} nested={false} />
        <View>
          <List>
            {commentsList && commentsList.map(cmt => {
              return (
                <ListItem avatar key={cmt.id}>
                  <Left>
                    <Thumbnail source={UserBG} circular small />
                  </Left>
                  <Body>
                    <Text>{cmt.user && cmt.user.email}</Text>
                    <Text>{cmt.content}</Text>
                    <Text style={styles.time}>{utils.convertDate(cmt.createdAt)}</Text>
                  </Body>
                </ListItem>
              )
            })}
            {commentsList && commentsList.length === 0 && <View style={styles.noCmt}><Text>No comments</Text></View>}
          </List>
        </View>
        <View style={styles.bottomGap} />
      </ScrollView>
      <View style={styles.inputWrapper}>
        <InputComponent value={value} changeValue={changeValue} comment={comment} />
      </View>
    </View>
  );
}

TwitDetail.propsTypes = {
  id: PropTypes.number,
}

TwitDetail.defaultProps = {}

export default TwitDetail
