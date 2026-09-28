import axios from "axios";
import React from "react";
import { Grid } from "react-loader-spinner";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {

  function GetCategory (){
   return axios.get('https://ecommerce.routemisr.com/api/v1/categories');

  }

  const {data, isLoading} = useQuery('categorySlider', GetCategory);


  if( isLoading ){
    return <div className="d-flex vh-100 bg-white bg-opacity-50 justify-content-center align-items-center">
      <Grid
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="grid-loading"
      radius="12.5"
      wrapperStyle={{}}
      wrapperClass="grid-wrapper"
      />
      </div>
    
    };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
  };
  return (
    <Slider {...settings}>
      {data.data.data.map((category, idx)=>  <div key={idx}>
        <img style={{height:"200px", marginTop:"25px", borderRadius:"5px"}} className="w-100" src={category.image} alt={category.name} />
        <h4>{category.name}</h4>
      </div> )}
    </Slider>
  );
}
