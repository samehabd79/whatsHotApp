import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput,TouchableOpacity} from 'react-native';
import moment from 'moment';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const DiscussionDetails = (props) => {
  const data = props.route.params.discussion;
  const baseURL = 'https://whatshotapp.herokuapp.com/api/dis';
  const [comment, setComment] = useState('');
  const [user] = useState(props.route.params.username);


  {/********************* Like Post Function *********************/}
  const AddLikeToArticle = async () => {
    const mydata = await fetch(baseURL + '/likePost/' + data._id, {
      method: 'put',
    });
  };

  {/********************* Like To Comment Function *********************/}
  const addLikeToComment = async (commentId) => {
    try {
      const mydata = await fetch(
        baseURL + '/likeComment/' + data._id + '/' + commentId,
        {
          method: 'put',
        }
      );
    } catch (e) {
      console.log(e.message);
    }
  };

  {/********************* Add Comment Function *********************/}
  const AddComment = async () => {
    if (comment != '' && user != '') {
      const mydata = await fetch(baseURL + '/comment/' + data._id, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment: comment,
          commentAuthor: user,
        }),
      });
      const discussions = await mydata.json();
      console.log(JSON.stringify(discussions));
    } else {
      Alert.alert('Add Comment', 'Please enetr comment for this article');
    }
  };


  return (
    <View style={styles.container}>

      <View style={styles.titleRow}>
        <Text style={styles.txtTitleDiscussion}>{data.title}</Text>
      </View>

      <View style={{ borderWidth: 1, width: '100%',marginTop:5}}>
        <Text></Text>
      </View>

      <View style={{ flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>
        <Image
          style={{ marginLeft: 5, margin: 5 }}
          source={{ uri: data.authorAvatar, width: 60, height: 60 }}
        />

        <View>
          <Text style={{ marginLeft: 5, marginTop: 15, fontWeight: 'bold' }}>
            {data.author}
          </Text>
          <Text style={{ fontWeight: 'bold' }}>
            {moment(data.date).format('YYYY-MM-DD')} | comment:{' '}
            {data.comments.length}
          </Text>
        </View>
      </View>

      <View style={{ borderWidth: 1, width: '100%'}}>
        <Text></Text>
      </View>

      <View style={{ flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>
      <Image
        style={styles.postImage}
        source={{ uri: data.postImage, width: 250, height: 250 }}
      />
      </View>

      <View style={styles.postContent}>
        <Text style={styles.postContent}>{data.content}</Text>
      </View>

      <View style={{ flexDirection: 'row', marginTop: 50,alignItems: 'center',justifyContent: 'center'}}>
        <TouchableOpacity onPress={AddLikeToArticle}>
          <AntDesign style={styles.like} name="heart" size={24} color="#BB0406" />
        </TouchableOpacity>
      </View>

      {/* ADD COMMENT */}
      <View style={{ flexDirection: 'row', marginTop: 50,alignItems: 'center',justifyContent: 'center'}}>
        <TextInput 
          style={styles.enterComment}
          placeholder="Enter comment"
          placeholderTextColor={"#fff"}
          onChangeText={(text) => setComment(text)}
        />
        <TouchableOpacity style={styles.btnPost} onPress={AddComment}>
          <Text style={{fontWeight: 'bold'}} >Post</Text>
        </TouchableOpacity>
      </View>


      <FlatList 
        inverted={true}
        data={data.comments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ flexDirection:'row', padding: 10,justifyContent:'space-between',borderWidth:2,marginTop:8}}>
            <Text style={styles.comment}>
              {item.commentAuthor} : {item.comment}{' '}
            </Text>
            <Text style={{ fontWeight: 'bold',marginTop:15}}>'{item.likes.length} likes'</Text>

            <TouchableOpacity style={{marginTop:7 }} onPress={() => addLikeToComment(item._id)}>
              <EvilIcons name="like" size={35} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3382F7',
    paddingLeft: 5,
    // justifyContent: 'center',
    //alignItems: 'center',
  },
  txtTitleDiscussion: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
  postImage: {
    marginTop: 20,
  },
  postContent: {
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: 20,
    marginTop:5,
    textAlign: 'center',
  },
  titleRow: {
    flexDirection: 'row',alignItems: 'center',justifyContent: 'center'
  },
  enterComment: {
    margin: 5,
    padding: 10,
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 18,
  },
  btnPost: {
    margin: 5,
    borderWidth: 2,
    padding: 10,
    borderRadius: 15,
    fontSize: 18,
  },
  comment: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold'
  },
  like: {
    fontSize: 36,
  },
});

export default DiscussionDetails;
