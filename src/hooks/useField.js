import {useState} from 'react'

export const useField = ({type, defaultValue}) => {
    const [value, setValue] = useState(defaultValue)
    const onChange = (e) => setValue(e.target.value)
    return {type, value, setValue, onChange}
}
