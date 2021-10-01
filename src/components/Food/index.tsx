import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import api from '../../services/api';
import React from 'react';

interface FoodObject {
  available: boolean;
  id: any;
  image: string;
  name: string;
  description: string;
  price: number;
}

interface FoodEditingProps {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  available?: boolean;
  image?: string;
}

interface FoodProps {
  food: FoodObject;
  handleDelete: (id: number) => Promise<void>;
  handleEditFood: (food: FoodEditingProps) => void;
}
function Food(props: FoodProps) {
    const { available } = props.food;
    const [isAvailable, setIsAvailable] = React.useState(available)
  

  const toggleAvailable = async () => {
    const { food } = props;

    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable,
    });

    setIsAvailable(!isAvailable)
  }

  const setEditingFood = () => {
    const { food, handleEditFood } = props;

    handleEditFood(food);
  }

    const { food, handleDelete } = props;

    return (
      <Container available={isAvailable}>
        <header>
          <img src={food.image} alt={food.name} />
        </header>
        <section className="body">
          <h2>{food.name}</h2>
          <p>{food.description}</p>
          <p className="price">
            R$ <b>{food.price}</b>
          </p>
        </section>
        <section className="footer">
          <div className="icon-container">
            <button
              type="button"
              className="icon"
              onClick={setEditingFood}
              data-testid={`edit-food-${food.id}`}
            >
              <FiEdit3 size={20} />
            </button>

            <button
              type="button"
              className="icon"
              onClick={() => handleDelete(food.id)}
              data-testid={`remove-food-${food.id}`}
            >
              <FiTrash size={20} />
            </button>
          </div>

          <div className="availability-container">
            <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

            <label htmlFor={`available-switch-${food.id}`} className="switch">
              <input
                id={`available-switch-${food.id}`}
                type="checkbox"
                checked={isAvailable}
                onChange={toggleAvailable}
                data-testid={`change-status-food-${food.id}`}
              />
              <span className="slider" />
            </label>
          </div>
        </section>
      </Container>
    );
};

export default Food;
