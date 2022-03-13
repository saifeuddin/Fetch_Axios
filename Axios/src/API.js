// const axios = require('axios')
// const axios = require('axios').default
import axios from 'axios';


export default axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "X-auth-key" : 'token123'
    }
})

