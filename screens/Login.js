import React, {useState} from "react";
import { View, Text, TextInput, Alert,
     TouchableOpacity, StyleSheet} from 'react-native';

const Login = props => {

    const [username, setUsername] = useState('');

    const letstalk = () => {
        if(username != ''){
            props.navigation.navigate('Discussions', {username: username});
        } else {
            Alert.alert('Please enter your name');
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Welcome to WhatsHOT
            </Text>
            <Text style={styles.context}>
                Please enter your name to start a new discussion or comment to others
            </Text>
            <TextInput
                style={styles.input}
                keyboardType="default"
                value={username}
                onChangeText={text => setUsername(text)}
            />
            <TouchableOpacity onPress={letstalk} style={styles.btn}>
                <Text style={styles.btnText}>Let's Talk</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3382F7',
      alignItems: 'center',
      justifyContent: 'center',
      padding:30
    },
    btn:{
        width:'100%',
        marginTop:12,
        alignItems:'center',
        paddingVertical:20,
        borderRadius:30,
        backgroundColor:'#F7567C'
    },
    context:{
        textAlign:'center',
        fontSize:18,
        color:'#FCFCFC',
        fontWeight:'400'
    },
    title:{
        fontSize:28,
        color:'#FCFCFC',
        fontWeight:'800'
    },
    btnText:{
        fontSize:18,
        color:'#FCFCFC',
        fontWeight:'700'
    },
    input: {
        marginTop:20,
        width:'100%',
        paddingVertical:20,
        borderRadius:30,
        paddingHorizontal:20,
        fontSize:18,
        backgroundColor:'#FCFCFC'
    },
  });
  
export default Login;