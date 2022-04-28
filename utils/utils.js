/**
 * Get Order 's data.
 * @param {*} id
 * @param {*} type
 * @param {*} title
 * @param {*} amount
 * @param {*} price
 * @param {*} total
 * @param {*} status
 * @param {*} date
 * @param {*} userId
 * @return
 */
export function getOrder(
  id,
  type,
  title,
  amount,
  price,
  total,
  status,
  date,
  userId
) {
  const order = {};
  order.id = id;
  order.type = type;
  order.title = title;
  order.amount = amount;
  order.price = price;
  order.total = total;
  order.status = status;
  order.date = date;
  order.userId = userId;
  return order;
}

/**
 * Get Orders's data.
 * @param {*} ordersSnap
 * @returns
 */
export function getOrders(ordersSnap) {
  const orders = [];
  for (const i in ordersSnap) {
    const order = getOrder(
      ordersSnap[i].id,
      ordersSnap[i].type,
      ordersSnap[i].title,
      ordersSnap[i].amount,
      ordersSnap[i].price,
      ordersSnap[i].total,
      ordersSnap[i].status,
      ordersSnap[i].userId
    );
    orders.push(order);
  }
  return orders;
}
