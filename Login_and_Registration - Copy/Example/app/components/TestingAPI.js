import React, { useEffect, useState } from 'react';
import listingsApi from '../api/listings';

import { View, StyleSheet } from 'react-native';


const newData = {
    user_name: "sunny",
    user_email: "3 Nevada Parkway",
    user_password: "Syracuse",
    user_phone: "315-252-7305"
}

function TestingAPI(props) {
    
    const [listings, setListings] =  useState([]);
    const [error, setError] =  useState(false);
    const [loading, setLoading] =  useState(false);

    useEffect(()=>{
        loadListings();
    }, []);
    
    
    const loadListings = async () => {
       
        // setLoading(true)
        const response = await listingsApi.addContent(newData);
        // setLoading(false)
       
    //     if (!response.ok){
    //         setError(true)
    //    }
    //    setError(false)
    //    setListings(response.data);
       console.log(response)
    }
    return (
        <View style={styles.container}></View>
    );
}

const styles = StyleSheet.create({
    container:{},
});

export default TestingAPI;