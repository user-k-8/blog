import React from 'react'
import africa from './img/africa.jpg'

const Card = ({element}) => {
  return (
    <div className='destination-card'>
        <div className='card-image'>
               <img src={element.img} alt=''/>
        </div>
        <div className='card-text'>
           <h3>{element.title}</h3>
           <p>{element.description}</p>
        </div>
       

    </div>
  )
}

export default Card