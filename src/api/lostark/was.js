import axios from 'axios'
import { LOSTARK_WAS_SERVER } from '../../static/server'

axios.defaults.baseURL = LOSTARK_WAS_SERVER
axios.defaults.headers.common["Accept"] = "application/json"
axios.defaults.headers.post["Content-Type"] = "application/json"

export const requestAPI = ({ apiFunction, pass, fail, onProcess }) => {
    console.log(apiFunction, pass, fail, onProcess)
    if (apiFunction === undefined) return

    onProcess && onProcess()
    apiFunction
        .then((res) => {
            if (res.status === 200) pass && pass(res.data)
            else { }
        })
        .catch((err) => {
            fail && fail(err)
        })
}