import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import Modal from './Modal'

function App () {
  const [student, setStudent] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState('')
  const [deleteStudent, setDeleteStudent] = useState({
    id: 0,
    name: ''
  })
  const [error, setError] = useState({
    code: '',
    message: ''
  })

  const getAllStudentHandler = () => {
    axios
    .get('http://localhost:5000/')
    .then(res => setStudent(res.data))
    .catch(err => setError({ code: err.code, message: err.message }))

  }

  const deleteHandler = (id) => {
    axios
      .delete(`http://localhost:5000/delete/${id}`)
      .then(res => {
        console.log(res)
            setDeleteSuccess('Student Successfully Deleted!')
            setOpenModal(false)
            setTimeout(() => {
              getAllStudentHandler()
            }, 700)
      })
      .catch(err => setError({ code: err.code, message: err.message }))

  }
  

  useEffect(() => {
    getAllStudentHandler()
  }, [])

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <h1 className='text-green-700 text-2xl font-extrabold mx-auto'>
        DATABASE MANAGMENT PRACTICE
      </h1>
      <Link to='/create' className='btn btn-sm my-4 text-white btn-primary'>
        Add
      </Link>
      <div className='text-black'>
        <table className='table-auto table table-xs'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='py-2 px-4 border-b'>Name</th>
              <th className='py-2 px-4 border-b'>Age</th>
              <th className='py-2 px-4 border-b'>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {student.map(data => {
              return (
                <tr key={data.studentId} className='hover:bg-gray-50'>
                  <td className='py-2 px-4 border-b'>{data.Name}</td>
                  <td className='py-2 px-4 border-b'>{data.Age}</td>
                  <td className='py-2 px-4 border-b'>{data.Email}</td>
                  <td>
                    <Link
                      to={`/edit/${data.studentId}`}
                      className='btn btn-success btn-sm'
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        setOpenModal(true)
                        setDeleteStudent({id: data.studentId, name: data.Name})
                      }}
                      className='ml-3 btn btn-error btn-sm'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
    </div>

      <div className='mt-5'>
        <h6 className='font-bold text-sm text-center'>{error.code}</h6>
        <p className='font-semibold text-xs text-center'>{error.message}</p>
        <p className='font-semibold text-xs text-center text-green'>{deleteSuccess}</p>
      </div>

    {openModal && <div className='absolute w-[100vw] h-[100vh] top-0 left-0 p-16 flex justify-center items-center'>
        <div className='absolute w-[100vw] h-[100vh] bg-white opacity-90 z-[10] top-0 left-0'></div>
      <div className='z-[90] flex flex-col gap-y-7 bg-yellow-100 px-5 py-3 rounded'>
        <h3 className='font-bold text-lg'>Confirm you want to delete {deleteStudent.name} Record?</h3>

        <div className='flex justify-end gap-x-4'>
          <button className='btn btn-error' onClick={()=>{deleteHandler(deleteStudent.id)}}>Yes</button>
          <button className='btn' onClick={() =>  setOpenModal(false)}>No</button>
        </div>
      </div>
    </div>
    }
    </div>
  )
}

export default App
