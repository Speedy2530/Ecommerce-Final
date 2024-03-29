import { useState } from "react"
import { Form, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'

const SearchBox = () => {
    const navigate = useNavigate();
    const { keyword: urlKeyword } = useParams();
    const [keyword, setKeyword] = useState(urlKeyword || '')

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            // setKeyword('') doesn't work for some reason, the placeholder stays the same
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }

  return (
    <Form onSubmit={submitHandler} className='d-flex' style={{height: '35px', marginTop: '3px'}}>
        <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search...'
        className='mr-sm-2 ml-sm-5'
        ></Form.Control>
        <Button type='submit' variant='outline-info' className='p-2 mx-2 d-flex align-items-center'>
            Search
        </Button>
    </Form>
  )
}

export default SearchBox
