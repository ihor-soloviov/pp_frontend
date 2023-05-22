//Import React
import React from 'react'

//Import style
import './container.scss'

const Container = ({children}) => {
return (
    <div className='container'>
      {children}
    </div>
  )
}

export default Container
