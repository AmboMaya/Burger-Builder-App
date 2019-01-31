import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-practice-burger-app.firebaseio.com/'
})

export default instance 