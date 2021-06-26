import { useEffect, useState } from "react";
import axios from "axios";

export const MenuController = () => {

    const [ data, setData ] = useState();
    
    useEffect(() => {
        /** fetch data when component did mount */
        axios.get('menu.json')
        .then((response) => {
            if(response.status === 200 && !!response.data){

                /** 1. Sorting by price in increasing order. */
                response.data.menu_items.sort((a, b) => {
                    if (a.price < b.price) return -1;
                    if (a.price > b.price) return 1;
                    return 0;
                });

                /** 2. Grouping by food type. */
                const items = response.data.menu_items.reduce((acu, item) => {
                    acu[item.food_type] = acu[item.food_type] || [];
                    acu[item.food_type].push(item);
                    return acu;
                }, {});

                /** 3. Convert food types from objects to array. */
                const menu_items = [];

                for (const [key, value] of Object.entries(items)) {
                    menu_items.push({
                        food_type: key,
                        items: value
                    })
                };

                /** 4. Order array in requested order. */
                const menu_required_order = ['appetizer', 'entree', 'dessert'];

                const menu_items_reordered = menu_required_order.map((order) => {
                    return menu_items.filter(menu => menu.food_type === order)[0]
                });

                setData({ name: response.data.restaurant, menu_items: menu_items_reordered, quantity: response.data.menu_items.length })
            }
        }).catch(err => {
            console.log(err);
        })
    }, []);

    return { data }
}