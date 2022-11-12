import React, { useEffect } from 'react'

const Loader = ({ display = true }) => {
  // useEffect(() => {
  //   console.log('Loader display.display');
  //   console.log(display);
  // }, [])
  return (
    <div style={{ display: `${display ? '' : 'none'}` }} className='text-center'>
      <div className="lds-ring"><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loader