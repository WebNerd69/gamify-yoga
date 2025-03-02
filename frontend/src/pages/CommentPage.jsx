import React from 'react'
import { useParams } from 'react-router-dom'

const CommentPage = () => {
  const {_id} = useParams();
  console.log(_id)
  return (
    <div></div>
  )
}

export default CommentPage