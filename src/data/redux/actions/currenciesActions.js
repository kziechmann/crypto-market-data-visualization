import { FETCH_CURRENCIES } from './types'

const fetchCurrencies = ( ) => async (dispatch) =>{
    const stream = await fetch('https://api.coincap.io/v2/assets')
    const json = await stream.json()
    dispatch({
        type: 'FETCH_CURRENCIES',
        data: json.data
    })
}

export default {
    fetchCurrencies
}