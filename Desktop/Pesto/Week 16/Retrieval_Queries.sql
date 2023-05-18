
--Find the item that has minimum weight.
select item_id , item_name , item_weight from ITEMS where (SELECT MIN(item_weight) FROM ITEMS) = item_weight ;

--○Find the different warehouses in “Pune”.
SELECT warehouse_name
FROM WAREHOUSES 
JOIN CITIES ON WAREHOUSES.city_id = CITIES.city_id 
WHERE city_name = 'Pune';

--○Find the details of items ordered by a customer “Mr. Patil”.
select items.item_name, items.item_weight, ORDER_ITEMS.quantity, ORDERS.order_date
from items
join ORDER_ITEMS on items.item_id = ORDER_ITEMS.item_id
join ORDERS on ORDERS.order_id = ORDER_ITEMS.order_id
join customers on customers.customer_id = ORDERS.customer_id
where customers.customer_name = 'Mr Patil';

--○Find a Warehouse which has maximum stores.
select WAREHOUSES.warehouse_name
from WAREHOUSES
where  (select STORES.warehouse_id 
from STORES 
group by STORES.warehouse_id  
order by count(STORES.warehouse_id) desc 
limit 1) = warehouse_id;

--○Find an item which is ordered for a minimum number of times.
select items.item_name, count(ORDER_ITEMS.order_id)
from items
join ORDER_ITEMS on ORDER_ITEMS.item_id = items.item_id
group by items.item_id 
order by count(ORDER_ITEMS.order_id) 
limit 1;

--○Find the detailed orders given by each customer.
select items.item_name, items.item_weight, ORDER_ITEMS.quantity, ORDERS.order_date, customers.customer_name
from items
join ORDER_ITEMS on items.item_id = ORDER_ITEMS.item_id
join ORDERS on ORDERS.order_id = ORDER_ITEMS.order_id
join customers on customers.customer_id = ORDERS.customer_id;