import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function Products() {
  const category=useParams()          //params is url used to access by console..
  console.log(category)                // here we can only access(category.categoryName which specifes only the name in console but not the key called 'categoryName')
  const [products,setProducts]=useState([])
  useEffect(()=>{
    axios .get(`https://dummyjson.com/products/category/${category.categoryName}`)  //categories is made to category  for ex: we can write category/laptop  so use $....[we have use back key here as it must consider it as a variable but not string]
    .then((res)=>{                                             //copied this from category.js
      console.log(res.data.products,1111)
      setProducts(res.data.products)                              // set will be used to map [loop]
      
    })
    .catch((err)=>{
      console.log(err,2222)
    })
  },[])                // when we need to call api we need to  call use Effect
  
  
  
  return (
    <div style={{ padding: 10 }}>
      <Grid
        container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
          "& > :not(style)": {},
        }}
      >
        {products.map((item)=>{
        return(
          <Card sx={{ width: 345 }}>
          <CardMedia                                 
            component="img"                                 //from this we have multiple cardsof the product category selected
            alt="green iguana"
            height="200"
            width="200"
            image={item.images[0]}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.title}
            </Typography>
            <Typography gutterBottom variant="body2" color="text.secondary">
              {item.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Typography variant="h5">₹{item.price}</Typography>

            <Typography
              variant="h5"
              style={{ textAlign: "end", width: "100%" }}
            >
              {item.brand}
            </Typography>
          </CardActions>
        </Card>
        )
        })}
       
      </Grid>
    </div>
  );
}

export default Products;
