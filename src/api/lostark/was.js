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

export const makeParty = ({ groupId, party }) => {
    return axios.post('', { groudId: groupId, party: party })
}

export const removeParty = ({ groupId, partyId }) => {
    return axios.post('', { groudId: groupId, partyId: partyId })
}

export const editParty = ({ groupId, party }) => {
    return axios.post('', { groudId: groupId, party: party })

}

export const addMember = ({ groupId, partyId, memberName }) => {
    return axios.post('', { groudId: groupId, partyId: partyId, memberName: memberName })
}

export const removeMember = ({ groupId, partyId, memberName }) => {
    return axios.post('', { groudId: groupId, partyId: partyId, memberName: memberName })
}