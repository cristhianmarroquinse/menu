import React from "react";
import './style.css';
import { MenuController } from './controller';

const FoodTypeItem = ({ item }) => {
    return <div className="FoodType-item">
        <div>
            <div>$</div>
            <div>{item.price}</div>
        </div>
        <div>{item.name}</div>
    </div>
}

const FoodType = ({ menu }) => {
    return <div className="FoodType-root">
        <div className="FoodType-title">{`(${menu.items.length}) ${menu.food_type}`}</div>
        { menu.items.map((item) =>  <FoodTypeItem item={item} key={item.name}/>) }
    </div>
}

const Menu = () => {

    const {
        data
    } = MenuController({});

    if(!data) return <div className="Menu-root">Loading...</div>

    return <div className="Menu-root">
        <div>{`Welcome to ${data.name}`}</div>

        <div>{`Here you have ${data.quantity} delicious menu options`}</div>

        <div className="Menu-food-types-container">
            { data.menu_items.map((menu) => <FoodType menu={menu} key={menu.food_type}/>) }
        </div>
        
    </div>
    
}

export default Menu;