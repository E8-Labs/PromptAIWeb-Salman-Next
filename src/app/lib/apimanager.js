import axios from 'axios'
import ApiPath from '../lib/ApiPath';

export const SubscribeUser = (user, callback) => {
    //
    var u = null
    if (typeof localStorage !== 'undefined') {
        let localData = localStorage.getItem(process.env.REACT_APP_LocalSavedUser);
        u = JSON.parse(localData)
    }
    if (!u) {
        return
    }


    //console.log("Sending follow request to server now", user.user.id)

    const config = {
        headers: {
            "Authorization": "Bearer " + u.token,
        }
    };
    const data = { userid: user.id };
    //console.log("Data is ", JSON.stringify(data))
    axios.post(ApiPath.FollowUser, data, config)
        .then(data => {
            console.log("Follow User response")
            console.log(data.data)

            if (data.data.status) {
                let receieved = data.data.data;
                callback(data.data, null)
            }
            else {
                callback(data.data, null)
            }
        })
        .catch(error => {
            //console.log(error)
            callback(null, error.message)
        })
}