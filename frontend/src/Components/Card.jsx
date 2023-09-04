import React from 'react'

function Card(props) {
  return (
    <div className='Whole CArd'>
    <div className='Card'>
     <div className='Content'>
         <h2 className='Content-h2'>{props.title}</h2>
         <h3 className='Content-h3'>{props.subTitle}</h3>
         <p className='Content-p'>{props.Para}</p>
         <img className="Content-img" src={props.images} alt='Inner File Missing'/>
     </div>
    </div>
    </div>
  )
}

export default Card