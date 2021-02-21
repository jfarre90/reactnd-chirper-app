import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav () {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <Link to='/' exact activeClassName='active'>
            Home
          </Link>
        </li>
        <li>
          <Link to='/new' activeClassName='active'>
            New Tweet
          </Link>
        </li>
      </ul>
    </nav>
  )
}