import React, { useEffect, useState } from "react";
import TourList from "./TourList";

const Tours = () => {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeHandler = (id)=>{
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
    }

  const fetchTours = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://course-api.com/react-tours-project");
      const data = await res.json();
      setLoading(false);
      setTours(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);
  
    
  if (loading) {
    return <div className="loader">Loading...</div>;
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>no tours left</h2>
          <button className='btn' onClick={() => fetchTours()}>
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <section className="section">
      <div className="title">
        <h2>our tours</h2>
        <div className="underline"></div>
      </div>
      <div className="tours">
      {tours.map((tour) => {
        return <TourList data={tour} key={tour.id} removeHandler = {removeHandler}/>;
      })}
    </div>
    </section>
  );
};

export default Tours;
