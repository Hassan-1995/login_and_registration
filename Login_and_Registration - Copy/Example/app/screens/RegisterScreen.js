import React from 'react';
import { StyleSheet } from 'react-native';
import *as Yup from 'yup';

import Screen from '../components/Screen';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import listingsApi from '../api/listings';


const newData = {
    user_name: "hassan",
    user_email: "3 Parkway",
    user_password: "Syracuse",
    user_phone: "315-252-7305"
}


const validationSchema = Yup.object().shape({
    user_name: Yup.string().required().label('Name'),
    user_email: Yup.string().required().email().label('Email'),
    user_password: Yup.string().required().min(4).label('Password'),
    user_phone: Yup.string().required().min(4).label('Phone'),
})

function RegisterScreen(props) {
    
    const handleSubmit= async (values)=>{
        // console.log(values)
        const response = await listingsApi.addContent(values);
        console.log('response', response)
    }

    return (
        <Screen style={styles.container} >
            <AppForm
                initialValues={{user_name:'', user_email:'', user_password:'', user_phone:''}}
                // onSubmit={(values) => console.log(values)}
                onSubmit={(values) => handleSubmit(values)}
                validationSchema={validationSchema}
            >
                <AppFormField
                    autoCapitalize='words' 
                    autoCorrect={false}
                    icon={'account'}
                    keyboardType="email-address"
                    name={'user_name'}
                    placeholder='Name'
                />            
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
                />                        
                <AppFormField
                    autoCapitalize='none' 
                    autoCorrect={false}
                    icon={'phone'}
                    name={'user_phone'}
                    placeholder='03XX-XXXXXXX'
                    keyboardType='numeric'
                />                        
                <SubmitButton title={'Register'} />
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
});

export default RegisterScreen;