import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';

// Компонент Header
const Header = () => {
  return (
    <header>
      <h1>Добро пожаловать на нашу страницу средств для похудения!</h1>
    </header>
  );
};


// Компонент информации о продукте
const ProductInfo = ({ name, description, price, image }) => {
  return (
    <div className="product-card">
      <div className="product-image" style={{ backgroundImage: `url(${image})` }}>
        <div className="product-info">
          <h3>{name}</h3>
          <p>{price} руб.</p>
        </div>
        <div className="product-description">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};




// Интерактивный компонент - Калькулятор калорий
const CalorieCalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [calories, setCalories] = useState(null);
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const BMR = calculateBMR(weight, height, age, gender);
    setCalories(BMR);
  };

  const preventNegative = (e) => {
    if (e.key === '-') {
      e.preventDefault();
    }
  };


  const calculateBMR = (weight, height, age, gender) => {
    // Базовый обмен веществ (BMR) рассчитывается по формуле Миффлина-Сан Жеора
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  };


  return (<div>
	
    <form onSubmit={handleSubmit}>
	<h2> Калькулятор для расчета базового обмена веществ (BMR)</h2>
      <label>
        Вес (в кг):
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
		  onKeyDown={preventNegative}
          required
        />
      </label>
      <label>
        Рост (в см):
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
		  onKeyDown={preventNegative}
          required
        />
      </label>
      <label>
        Возраст:
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
		  onKeyDown={preventNegative}
          required
        />
      </label>
      <label>
        Пол:
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </select>
      </label>
      <button type="submit">Рассчитать BMR</button>
      {calories && <p>Ваш базовый обмен веществ (BMR): {calories} ккал/день</p>}
    </form>
	</div>
  );
};
// Компонент для отслеживания веса
const WeightTracker = ({ initialWeight }) => {
  const [weight, setWeight] = useState(initialWeight);
  const [weightRecords, setWeightRecords] = useState([]);

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleRecordWeight = (e) => {
    e.preventDefault(); 
    const newRecord = {
      date: new Date().toLocaleDateString(),
      weight: weight
    };
    setWeightRecords([...weightRecords, newRecord]);
  };

  return (
    <div>
      <form>
        <h2>Отслеживание веса</h2>
        <input
          type="number"
          value={weight}
          onChange={handleWeightChange}
        />
        <button type="button" onClick={handleRecordWeight}>Записать вес</button>
        <ul>
          {weightRecords.map((record, index) => (
            <li key={index}>
              {record.date}: {record.weight} кг
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};


// Массив продуктов
const products = [
  {
    name: 'Супер-сжигатель жира',
    description: 'Этот продукт поможет вам быстро сбросить вес.',
    price: '1999',
    image: '15e573927f4912af3c48ca1ef092f0a1.png'
  },
  {
    name: 'Энергетический бустер',
    description: 'Повышает энергию и улучшает фокусировку.',
    price: '1500',
    image: '501183-1.jpg'
  },
  {
    name: 'Детокс-напиток',
    description: 'Очищает организм и поддерживает здоровье.',
    price: '1200',
    image: '365-GREEN-1000-75.jpg'
  }
  // Добавьте больше продуктов по аналогии
];

// Основной компонент App
const App = () => {
	
	const initialWeight = 70;
  return (
    <div>
      <Header />
	        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      {products.map((product, index) => (
        <ProductInfo
          key={index}
          name={product.name}
          description={product.description}
          price={product.price}
          image={product.image}
        />
		))}
		      </div>
      <CalorieCalculator />
	  <WeightTracker initialWeight={initialWeight} />
    </div>
  );
};



export default App;
