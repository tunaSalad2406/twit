import React from 'react';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Icon,
  Left, Body, Right
} from 'native-base';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import { ModalComponent } from "../index"
import { useMutation } from '@apollo/react-hooks';
import { DELETE_MUTATION, INTEREST_MUTATION, } from "./gql";
import { utils, userStore } from "../../core"
import { UserBG } from "../Images"
import PropTypes from 'prop-types';
import { DELETE_TWIT } from "../../constant"
import TwitDetail from "../TwitDetail"
import styles from "./styles"

const CardComponent = ({
  author,
  createdAt, content, id,
  image, interestCount, renderEditComponent, allowEdit, allowComment, nested, commentCount
}) => {

  const { me } = React.useContext(userStore) || {};
  const hasPermission = utils.permissonCheck(me.id, author.id)

  const [editModalOpen, toggleEditModal] = React.useState(false);
  const [detailModalOpen, toggleDetailModal] = React.useState(false);

  const [deleteTwit] = useMutation(DELETE_MUTATION);
  const [interestTwit] = useMutation(INTEREST_MUTATION);

  const removeTwit = async () => {
    if (hasPermission) {
      try {
        await deleteTwit({ variables: { id } });
        utils.setSuccess(DELETE_TWIT.SUCCESSFUL)
      } catch (err) {
        utils.setError(DELETE_TWIT.FAILED)
      }
    }
  }

  const interest = async () => {
    try {
      await interestTwit({ variables: { twitID: id } });
    } catch (err) {
    }
  }

  const toggleEdit = () => {
    if (hasPermission) {
      toggleEditModal(!editModalOpen)
    }
  }

  const toggleDetail = () => {
    toggleDetailModal(!detailModalOpen)
  }

  return (
    <React.Fragment>
      <Card style={styles.card}>
        <CardItem style={styles.flex}>
          <Left style={styles.flex}>
            <Thumbnail source={UserBG} small />
            <Body>
              <Text>{author && author.email || ""}</Text>
              <Text note>User</Text>
            </Body>
          </Left>
          <Right sstyle={styles.flex}>
            {
              hasPermission && nested ? <>
                <TouchableOpacity onPress={toggleEdit}>
                  <Icon active name="md-create" />
                </TouchableOpacity>
                <TouchableOpacity onPress={removeTwit}>
                  <Icon active name="md-close" />
                </TouchableOpacity>
              </> : null
            }
          </Right>
        </CardItem>

        {nested && <React.Fragment>
          <CardItem cardBody style={styles.twitLowerBody}>
            <View style={styles.twitContent}>
              <Text>{content}</Text>
            </View>
            {!!image && <Image source={{ uri: utils.convertImg(image) }} style={styles.twitImg} resizeMode="contain" />}
          </CardItem>
          <CardItem style={styles.flex}>
            <Left style={styles.left}>
              <TouchableOpacity transparent onPress={interest} style={styles.interestButton}>
                <Text style={styles.interest}>{interestCount}</Text>
                <Icon active name="md-heart-empty" style={{ color: 'black' }} />
              </TouchableOpacity>
            </Left>
            <Body style={styles.middle}>
              {
                allowComment && (
                  <TouchableOpacity transparent onPress={toggleDetail} style={styles.interestButton}>
                    <Text style={styles.interest}>{commentCount}</Text>
                    <Icon active name="md-chatboxes" style={{ color: 'black' }} />
                  </TouchableOpacity>
                )
              }
            </Body>
            <Right style={styles.right}>
              <Text>{utils.convertDate(createdAt)}</Text>
            </Right>
          </CardItem>
        </React.Fragment>}

        {!nested &&
          <CardItem cardBody style={styles.twitLowerBody}>
            <View style={styles.twitContent}>
              <Text>{content}</Text>
            </View>
            {!!image && <Image source={{ uri: utils.convertImg(image) }} style={styles.largeTwitImg} resizeMode="contain" />}
          </CardItem>
        }
      </Card>
      {allowEdit && <ModalComponent open={editModalOpen} toggle={toggleEdit}>
        {renderEditComponent({ author, createdAt, content, id, toggleEdit })}
      </ModalComponent>}
      {allowComment && <ModalComponent open={detailModalOpen} toggle={toggleDetail} large>
        <TwitDetail twitId={id} />
      </ModalComponent>}
    </React.Fragment>
  );
}

CardComponent.propsTypes = {
  author: PropTypes.object.isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  interestCount: PropTypes.number.isRequired,
  renderEditComponent: PropTypes.func,
  allowEdit: PropTypes.bool,
  allowComment: PropTypes.bool
}

CardComponent.defaultProps = {
  allowEdit: false,
  allowComment: false,
  nested: true,
  author: {},
}

export default CardComponent;
