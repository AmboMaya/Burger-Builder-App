import axios from 'axios'

const instance = axios.create({
  baseUrl: 'https://react-practice-burger-app.firebaseio.com/'
})

export default instance 