import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import { useEffect, useState } from 'react'

function Home() {
  
  const [search, setSearch] = useState("");

  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {

    try {
      let respo = await fetch("food-delivery-app-server-three.vercel.app/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!respo.ok) {
        throw new Error('Network response was not ok');
      }

      respo = await respo.json();
      // console.log(respo[0],respo[1]);

      setFoodItem(respo[0]);
      setFoodCat(respo[1]);

    } catch (error) {
      console.error('Error:', error);
    }

  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
    <div><Navbar /></div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain" }}>
          <div className="carousel-inner" id='carousel'>
            <div className='carousel-caption' style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => {setSearch(e.target.value)}} />
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..."></img>
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..."></img>
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..."></img>
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className='container'>
        {foodCat.length !== 0 ?
          foodCat.map((data) => (
            <div className='row mb-3' key={data._id}>
              <div className='fs-3 m-3'>{data.CategoryName}</div>
              <hr />
              {foodItem.length !== 0 ?
                foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                  .map(filterItems => (
                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 m-3'>
                      <Card foodItem = {filterItems}
                        options={filterItems.options[0]}
                        ></Card>    
                    </div>
                  ))
                : <div>No such data</div>}
            </div>
          ))
          : <div>No food categories available</div>
        }
      </div>
      <div><Footer /></div>
    </>
  )
}

export default Home