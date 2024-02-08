import React from 'react'

export default function Card() {
  return (
    <>
    <div>
        <div className="card mt-3" style={{"width": "18rem","maxHeight": "360px"}}>
            <img src="/photos/p1.avif" class="card-img-top" alt="..."></img>
            <div className="card-body">
            <h5 className='card-title'>Card Title</h5>
            <p class="card-text">This is some imp text.</p>
            <div className="container w-100">
            <select className='m-2 h-100 bg-success rounded'>
                {Array.from(Array(6), (e,i) => {
                return(
                    <option key={i+1} value={i+1}> {i+1} </option>
                )
                })}
            </select>

            <select className='m-2 h-100 bg-success rounded'>
            <option value="half">Half</option>
            <option value="full">Full</option>
            </select>

            <div className='d-inline h-100 f-s5'>
                Total price
            </div>
            

            </div>
            </div>
        </div>
    </div>
    </>
  )
}
