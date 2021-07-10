import React,{useEffect, useState} from 'react';

const useForm = (initialFeedValues, setCurrentId) => {
    const [values, setValues] = useState(initialFeedValues)
    const [errors, setErrors] = useState({}) 

    const handleInputChange = e =>{
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const resetForm =() =>{
        setValues(initialFeedValues)
        setErrors({})
        setCurrentId(0)
    }

    return{
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    };
}

export default useForm;