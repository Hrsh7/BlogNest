import React from 'react'

function Post() {
  return (
    <div className='post'>
      <div className='image'>
        <img src="https://cdn.pixabay.com/photo/2016/10/26/19/00/domain-names-1772243_960_720.jpg" />
      </div>
        
        <div className='texts'>
          <h2>Full house battery backup coming later this year</h2>
          <p className='info'>
            <a className='author'>Harsh Raj</a>
            <time>2023-01-06 16:45</time>
          </p>
          <p className='summary'>Toaday st its special launch event.</p>
        </div>
      </div>
  )
}

export default Post