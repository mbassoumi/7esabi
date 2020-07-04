import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faEuroSign, faShekelSign } from '@fortawesome/free-solid-svg-icons'

// USA, NIS, JOD, EUR
export default [
  {
    key: 'nis',
    symbol: <FontAwesomeIcon icon={faShekelSign}/>,
  },
  {
    key: 'usa',
    symbol: <FontAwesomeIcon icon={faDollarSign}/>,
  },
  {
    key: 'euro',
    symbol: <FontAwesomeIcon icon={faEuroSign}/>,
  },
  {
    key: 'jod',
    symbol: <span><b>JOD</b></span>,
  },
]