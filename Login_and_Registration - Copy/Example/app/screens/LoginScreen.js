import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import *as Yup from 'yup';


import Screen from '../components/Screen';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import listingsApi from '../api/listings';

const validationSchema = Yup.object().shape({
    user_email: Yup.string().required().email().label('Email'),
    user_password: Yup.string().required().min(4).label('Password'),
})

function LoginScreen(props) {

    const [userData, setUserData] = useState([])
    const [loginID, setLoginID] = useState(true)

    useEffect(()=>{
        loadData();
    }, []);

    const loadData = async ()=>{
        const response = await listingsApi.getAllContent();
        setUserData(response.data)
    }

    const handleSubmit= async (values)=>{
        const email = userData.find(user => user.user_email === values.user_email)
        if(email){
            if(email.user_password === values.user_password){
                setLoginID(true)
            }else{
                setLoginID(false)
                }
            }else{
                setLoginID(false)
        }
    }

    return (
        <Screen style={styles.container} >
            <Image
                style={styles.logo}
                source={require('../assets/icon.png')} 
            />
            {
                loginID ?
                    <Text></Text>
                :
                <Text>User ID or Password is incorrect</Text>
            }
            <AppForm
                initialValues={{user_email:'', user_password:''}}
                // onSubmit={(values) => console.log(values)}
                onSubmit={(values) => handleSubmit(values)}
                validationSchema={validationSchema}
            >
                <AppFormField
                    autoCapitalize='none' 
                    autoCorrect={false}
                    icon={'email'}
                    keyboardType="email-address"
                    name={'user_email'}
                    placeholder='Email'
                    textContentType='emailAddress'
                />            
                <AppFormField
                    autoCapitalize='none' 
                    autoCorrect={false}
                    icon={'lock'}
                    name={'user_password'}
                    placeholder='Password'
                    secureTextEntry={true}
                    textContentType='emailAddress'
                />                        
                <SubmitButton title={'Login'} />
            </AppForm>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container:{
        padding: 10,
    },
    logo:{
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20,
    },
})

export default LoginScreen;