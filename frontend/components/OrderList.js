import React, { useState } from 'react';
import { useGetOrdersQuery } from '../state/pizzaApi';

export default function OrderList() {
  const { data: orders } = useGetOrdersQuery();
  const [filterSize, setFilterSize] = useState('All');


  const handleFilter = (size) => {
    setFilterSize(size);
  };

  const filteredOrders = filterSize === 'All' ? orders
    : orders.filter(order => order.size === filterSize);


  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {filteredOrders && filteredOrders.map(order => (
          <li key={order.id}>
            <div>
              <p>
              {order.customer} ordered a size {order.size} with{' '}
                {order.toppings !== undefined && order.toppings.length > 0
                  ? order.toppings.length === 1
                    ? `${order.toppings.length} topping`
                    : `${order.toppings.length} toppings`
                  : 'no toppings'}.
              </p>
            </div>
          </li>
        ))}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {['All', 'S', 'M', 'L'].map(size => {
          const className = `button-filter${filterSize === size ? ' active' : ''}`;
          return (
            <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
              onClick={() => handleFilter(size)}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
