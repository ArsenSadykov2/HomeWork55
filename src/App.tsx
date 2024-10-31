import './App.css';
import meatImage from "./assets/meat.png";
import cheeseImage from "./assets/cheese.png";
import baconImage from "./assets/bacon.png";
import saladImage from "./assets/salad.png";
import { Ingredient } from './types';
import { useState } from 'react';


const App = () => {
  const INGREDIENTS: Ingredient[] = [
    {name: 'Meat', price: 80, image: meatImage},
    {name: 'Cheese', price: 50, image: cheeseImage},
    {name: 'Bacon', price: 60, image: baconImage},
    {name: 'Salad', price: 10, image: saladImage},
  ];

  const [ingredients, setIngredients] = useState([
    {name: 'Meat', count: 0},
    {name: 'Cheese', count: 0},
    {name: 'Bacon', count: 0},
    {name: 'Salad', count: 0},
  ]);

  const [total, setTotal] = useState<number>(30);

  const addIngredients = (nameIngredient: string) => {
    let countIngredients = ingredients.map(ingredient => {
      if(ingredient.name === nameIngredient) {
        return {
          ...ingredient,
          count: ingredient.count + 1
        }
      }
      return ingredient;
    });
    let totalPrice = INGREDIENTS.reduce((acc, ingredient) => {
      countIngredients.forEach(ingred => {
        if(ingredient.name === ingred.name && ingred.count > 0) {
          acc = acc + ingred.count * ingredient.price;
        }
      });
      return acc;
    }, 30);

    setIngredients(countIngredients);
    setTotal(totalPrice);
  };

  const deleteIngredient = (nameIngredient: string) => {
    let countIngredients = ingredients.map(ingredient => {
      if(ingredient.name === nameIngredient && ingredient.count > 0) {
        return {
          ...ingredient,
          count: ingredient.count - 1
        }
      }
      return ingredient;
    });
    let totalPrice = INGREDIENTS.reduce((acc, ingredient) => {
      countIngredients.forEach(ingred => {
        if(ingredient.name === ingred.name && ingred.count > 0) {
          acc = acc + ingred.count * ingredient.price;
        }
      });
      return acc;
    }, 30);
    setTotal(totalPrice);
    setIngredients(countIngredients);
  };

  const getBurger = () => {
    let ingredName: string[] = [];

    ingredients.forEach(ingredient => {
      if(ingredient.count > 0) {
        for (let i = 0; i < ingredient.count; i++) {
          ingredName.push(ingredient.name);
        }
      }
    });
    return (
      <>
          {ingredName.map(ingredName => {
            <div key={ingredName} className={ingredName}></div>
          })}
      </>
    )
  };

  return (
    <div className="container my-3">
      <div className="row justify-content-between">
        <div className="border border-black col me-3">
          <h4 className="mt-2">Ingredients</h4>
          <div className="row row-cols-2">
            <div className="col">
              {INGREDIENTS.map(ingredient => (
                <div key={ingredient.name} className="mb-3">
                  <button onClick={() => addIngredients(ingredient.name)} type="button" >
                    <img width={80} src={ingredient.image} alt={ingredient.name}/>
                    {ingredient.price}
                  </button>
                </div>
              ))}
            </div>
            <div className="col">
              {ingredients.map((ingredient) => (
                <p><strong>{ingredient.name}</strong>{ingredient.count}
                  <button onClick={() => deleteIngredient(ingredient.name)} className="deleteBtn"/>
                </p>
              ))}
            </div>
          </div>

          <hr/>
        </div>

        <div className="border border-black col align-self-center">
          <h4 className="mt-2">Burger</h4>
          <hr/>
          <div className="Burger">
            <div className="BreadTop">
            </div>
            {getBurger()}
            <div className="BreadBottom"></div>
          </div>
          <div>
            <h5>Price:{total} </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App