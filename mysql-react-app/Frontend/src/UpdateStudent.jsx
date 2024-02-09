import { useState, useEffect } from "react";
import {  useParams, useNavigate  } from "react-router-dom";
import axios from 'axios';


const UpdateStudent = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [error, setError] = useState({
      code: "",
      message: ""
    });
  const navigate = useNavigate();


    let { studentId } =  useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/${studentId}`)
        .then(res => {
            setName(res.data.Name)
            setEmail(res.data.Email)
            setAge(res.data.Age)
        })
        .catch(err => setError({code: err.code, message: err.message}))
    }, [studentId])
    
    const updateStudentHandler = (e) => {
        e.preventDefault();

        console.log(name,email,age)

        axios.put(`http://localhost:5000/edit/${studentId}`, {name, email, age})
        .then(res => {
            console.log(res)
            navigate('/', {replace: true});
        })
        .catch(err => setError({code: err.code, message: err.message}))
    }

    return (
    <div>
     <h1 className="text-center font-bold text-2xl">UPDATE EXISTING STUDENT</h1>

         <form onSubmit={updateStudentHandler} className='max-w-sm mx-auto my-9'>
        <div className='mb-5'>
          <label
            htmlFor='name'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Name
          </label>
          <input
            type='text'
            id='name'
            value={name}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  transition-all duration-500 ease-linear'
            required
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            value={email}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  transition-all duration-500 ease-linear'
            placeholder='Enter Email Here'
            onChange={e => {
              setEmail(e.target.value)
            }}
            required
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='age'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Age
          </label>
          <input
            type='number'
            id='age'
            value={age}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  transition-all duration-500 ease-linear'
            placeholder='Enter Age Here'
            max={50}
            min={1}
            onChange={e => {
              setAge(e.target.value)
            }}
            required
          />
        </div>
        <div className='flex items-start mb-5'>
          <div className='flex items-center h-5'>
            <input
              id='remember'
              type='checkbox'
              value=''
              className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:outline-blue-600 dark:outline-offset-gray-800 dark:focus:outline-offset-gray-800 transition-all duration-500 ease-linear'
              required
            />
          </div>
          <label
            htmlFor='remember'
            className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Activate Student
          </label>
        </div>
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all duration-500 ease-linear'
        >
          Update
        </button>
      </form>
      <div className="mt-5">
        <h6 className="font-bold text-sm text-center">{error.code}</h6>
        <p className="font-semibold text-xs text-center">{error.message}</p>
      </div>
    </div>
    )
}

export default UpdateStudent;