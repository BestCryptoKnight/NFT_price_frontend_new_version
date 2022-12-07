import React from 'react'

const Loader = () => {
  // useEffect(() => {
  //   console.log('Loader display.display');
  //   console.log(display);
  // }, [])
  // return (
  //   <div style={{ display: `${display ? '' : 'none'}` }} className='text-center'>
  //     <div className="lds-ring"><div></div><div></div><div></div></div>
  //   </div>
  // )
  return (
    <div className="loader">
      <div className="outer"></div>
      <div className="middle"></div>
      <div className="inner"></div>
    </div>
  )
}

export default Loader