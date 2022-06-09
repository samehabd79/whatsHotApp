import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import moment from 'moment';
const Discussions = (props) => {
  const baseURL = 'https://whatshotapp.herokuapp.com/api';
  const [allData, setAllData] = useState({});
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(props.route.params.username);

  useEffect(() => {
    loadAllDiscussions();
  }, []);

  const loadAllDiscussions = async () => {
    setLoading(true);
    const data = await fetch(baseURL + '/dis/getAllDisccusions', {
      method: 'get',
    });
    const discussions = await data.json();
    setAllData(discussions);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color="#F7567C" size="large" />
      ) : (
        <View style={{ width: '100%' }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('AddNew')}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Add New</Text>
          </TouchableOpacity>
          <FlatList
            style={{ marginTop: 8 }}
            inverted={true}
            data={allData.Disccusions}
            keyExtractor={(item) => item._id}
            renderItem={(itemRow) => (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('DiscussionDetails', {
                    discussion: itemRow.item,
                    username:username
                  });
                }}
                style={styles.row}
              >
                {itemRow.item.postImage ? 
                 <Image
                 source={{ uri: itemRow.item.postImage }}
                 style={styles.avatar}
               />
               :
               <Image
               source={{ uri: itemRow.item.authorAvatar }}
               style={styles.avatar}
             />
              }
               
                <View style={{ width: '60%', marginLeft: 12 }}>
                  <Text style={styles.postTitle}>
                    {itemRow.item.title} | {itemRow.item.author}
                  </Text>
                  <Text style={styles.postContent}>
                    {itemRow.item.content} |{' '}
                    {moment(itemRow.item.Date).format('DD/MM/yyyy')}
                  </Text>
                </View>
                <View style={{ width: '20%', marginLeft: 12 }}>
                  <Text style={styles.postContent}>
                    {itemRow.item.likes.length} likes
                  </Text>
                </View>
                <View style={{ width: '20%', marginLeft: 12 }}>
                  <Text style={styles.postContent}>
                    {itemRow.item.comments.length} Comments
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3382F7',
    padding: 30,
  },
  postAuthor: {
    fontSize: 12,
    fontWeight: '300',
  },
  postContent: {
    fontSize: 14,
    fontWeight: '300',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  row: {
    width: '100%',
    backgroundColor: '#FCFCFC',
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 46,
    height: 50,
  },
  btn: {
    width: '100%',
    marginTop: 8,
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 30,
    backgroundColor: '#F7567C',
  },
  btnText: {
    fontSize: 20,
    color: '#FCFCFC',
    fontWeight: '700',
  },
});

export default Discussions;
