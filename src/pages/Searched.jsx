import React from 'react'
import {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import styled, { isStyledComponent } from 'styled-components';

function Searched(){

  const [searchedRecipes, setSearchedRecipes] = useState([]);
  let params = useParams();

  const getSearched = async (name) => {
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=00a672a4372f4a7e9393023cf22188fd&query=${name}`)
    const recipes = await data.json();
    setSearchedRecipes(recipes.results);
  };

  useEffect(()=>{
    getSearched(params.search);
  },[params.search])
  return (
    <Grid>
      {searchedRecipes.map((item)=>{
        return(
          <Card key={item.id}>
            <Link to={'/recipe/'+item.id}>
            <img src={item.image} alt="" />
            </Link>
          </Card>
        )
      })}
    </Grid>
  )
}

const Grid = styled.div`
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-grap: 3rem;
`;

const Card = styled.div`
  img{
    width: 90%;
    border-radius:2rem;
  }
  a{
    text-decoration:center;
  }
  h4{
    text-align:center;
    padding: 1rem;
  }
`;


export default Searched