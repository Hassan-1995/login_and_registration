import client from "./client";

const endPoint = '/user_information';

const getAllContent = () => client.get(endPoint);

const addContent= async (listings)=>{
    const data = new FormData();
    data.append('user_email', listings.email);
    data.append('user_name', listings.name);
    data.append('user_password', listings.password);
    data.append('user_phone', listings.phone);
    try {
        const response = await client.post(endPoint, listings)
        // console.log('data', response.data)
        return response.data
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
}

const updateListings= async(listingID, updatedData)=>{
    try {
        const result = await client.put(endPoint+'/'+listingID, updatedData)
        return result
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
}

const deleteListings= async(listingID)=>{
    try {
        await client.delete(endPoint+'/'+listingID);
      } catch (error) {
        console.error('Error deleting data:', error);
        throw error; 
      }
}

const getSingleContent= async(listingID)=>{
    try {
        const result = await client.get(endPoint+'/'+listingID);
        return result
    } catch (error) {
        console.error('Error getting data:', error);
        throw error; 
      }
}

export default {
    addContent,         //addListings,
    deleteListings,
    getSingleContent,   //getListing,
    getAllContent,      //getListings,
    updateListings,
};