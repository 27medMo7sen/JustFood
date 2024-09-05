import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchMeals();
  }, []);
  const fetchMeals = async () => {
    setIsLoading(true);
    const res = await fetch(
      "https://react-3b53b-default-rtdb.firebaseio.com/meals.json"
    );
    try {
      if (!res.ok) throw new Error("Something went wrong !");
      const data = await res.json();
      console.log(data);
      const loadedMeals = [];
      for (const element in data) {
        loadedMeals.push({
          id: element,
          name: data[element].name,
          price: data[element].price,
          description: data[element].description,
        });
      }
      setMeals(loadedMeals);
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
    setIsLoading(false);
  };
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  let cardContent = <ul>{mealsList}</ul>;
  if (isLoading) cardContent = <div>Loading....</div>;
  else if (error) cardContent = <div>{error}</div>;
  return (
    <section className={classes.meals}>
      <Card>{cardContent}</Card>
    </section>
  );
};

export default AvailableMeals;
