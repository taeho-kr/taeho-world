import axios from 'axios'
import { API_KEY } from '../../static/keys'
import { LOSTARK_API_SERVER } from '../../static/server'

axios.defaults.baseURL = LOSTARK_API_SERVER
axios.defaults.headers.common["Accept"] = "application/json"
axios.defaults.headers.common["authorization"] = `bearer ${API_KEY}`
axios.defaults.headers.post["Content-Type"] = "application/json"

export const requestAPI = ({ apiFunction, onSuccess, onError, onProcess }) => {
    if (apiFunction === undefined) return

    onProcess && onProcess()
    apiFunction
        .then((res) => {
            if (Array.isArray(res)) {
                const data = res.map(el => {
                    if (el.status === 200) return el.data
                })
                onSuccess && onSuccess(data)
            } else {
                if (res.status === 200) {
                    const data = res.data
                    onSuccess && onSuccess(data)
                }
                else { }
            }
        })
        .catch((err) => {
            onError && onError(err)
        })
}

export const getInfoCharacter = ({ name }) => {
    return Promise.all([
        getInfoCharacterProfile({ name }),
        getInfoCharacterEquipment({ name }),
        getInfoCharacterAvatars({ name }),
        getInfoCharacterSkills({ name }),
        getInfoCharacterEngravings({ name }),
        getInfoCharacterCards({ name }),
        getInfoCharacterGems({ name }),
        getInfoCharacterColosseums({ name }),
        getInfoCharacterCollectibles({ name })
    ])
}
export const getInfoCharacterProfile = ({ name }) => {
    return axios.get(`/armories/characters/${name}/profiles`)
}
export const getInfoCharacterEquipment = ({ name }) => {
    return axios.get(`/armories/characters/${name}/equipment`)
}
export const getInfoCharacterAvatars = ({ name }) => {
    return axios.get(`/armories/characters/${name}/avatars`)
}
export const getInfoCharacterSkills = ({ name }) => {
    return axios.get(`/armories/characters/${name}/combat-skills`)
}
export const getInfoCharacterEngravings = ({ name }) => {
    return axios.get(`/armories/characters/${name}/engravings`)
}
export const getInfoCharacterCards = ({ name }) => {
    return axios.get(`/armories/characters/${name}/cards`)
}
export const getInfoCharacterGems = ({ name }) => {
    return axios.get(`/armories/characters/${name}/gems`)
}
export const getInfoCharacterColosseums = ({ name }) => {
    return axios.get(`/armories/characters/${name}/colosseums`)
}
export const getInfoCharacterCollectibles = ({ name }) => {
    return axios.get(`/armories/characters/${name}/collectibles`)
}
export const getAllCharacters = ({ name }) => {
    return axios.get(`/characters/${name}/siblings`)
}