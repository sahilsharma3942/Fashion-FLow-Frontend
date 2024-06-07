import React from 'react'
import { Link } from 'react-router-dom'

export const BottomWaring = ({label, to}) => {
  return (
    <div className=' text-right'><Link to={`/${to}`}>{label}</Link></div>
  )
}
