import React,{useState} from "react";
import { View, Text, StyleSheet,TouchableOpacity,TextInput} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
const AddNew = props => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const baseURL = 'https://whatshotapp.herokuapp.com/api/dis';
  const [postImage, setPostImage] = useState('');

  const sendADisscussion = async () => {
    if (title != '' && content != '') {
      const data = await fetch(baseURL + '/uploadDisccusionSub', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          content: content,
          author: author,
          postImage:postImage
        })
      });
      const discussion = await data.json();
      console.log(JSON.stringify(discussion));
    } else {
      console.log('Add discussion', 'Please ENTER title or content for this disscusion');
    }
  }
    return(
        <View style={styles.container}>
          <View style={styles.Form}>
            <Text style={styles.txtTitleDiscussion}>Discussion details</Text>
            <Text style={styles.txtTitle}>Title</Text>
            <TextInput style={styles.txtTitleInput}
              placeholder="enter your title"
              placeholderTextColor={"#fff"}
              onChangeText={(val) => setTitle(val)} 
             />
            <TextInput style={styles.txtTitleInput}
              placeholder="enter your Author"
              placeholderTextColor={"#fff"}
              onChangeText={(val) => setAuthor(val)} 
             />
            <View>
              <Text style={styles.txtTitleContent}>Content</Text>
              <TextInput style={styles.txtContent}
                placeholder={"subgect"}
                placeholderTextColor={"#fff"}
                onChangeText={(val) => setContent(val)}
                multiline={true}
                numberOfLines={4}
              />
              <Text style={styles.txtTitleContent}>Image</Text>
          <TextInput
            placeholder="Enter image link here"
            style={styles.txtTitleInput}
            onChangeText={(val) => setPostImage(val)}
          />
              <TouchableOpacity onPress={sendADisscussion} style={styles.addButton}>
                  <Ionicons name="add-circle" size={50} color="#22214A" />
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3382F7',
      alignItems: 'center',
    },
    Form: {
      marginTop:100,
    },
    txtTitleDiscussion:{
      fontSize: 50,
      color: '#fff',
      fontWeight: '600',
    },
    txtTitle: {
      fontSize: 20,
      color: '#fff',
      marginTop: 20,
      fontWeight: '500',
    },
    txtTitleInput:{
      padding:8,
      marginTop: 10,
      borderWidth:2,
      borderRadius:5,
      borderColor: '#22214A'
    },
    txtTitleContent:{
      fontSize: 20,
      color: '#fff',
      marginTop: 20,
      fontWeight: '500',
    },
    txtContent:{
      marginTop:10,
      height: 150,
      justifyContent: "flex-start",
      textAlignVertical: 'top',
      borderWidth:2,
      padding:5,
      color: '#fff',
      borderColor: '#22214A',
      borderRadius:5,
    },
    addButton:{
      marginTop:20,
      alignItems: 'center'
    },
  });
  
export default AddNew;