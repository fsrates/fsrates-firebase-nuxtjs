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

export function getOrders(ordersSnap) {
  const orders = [];
  for (const i in ordersSnap) {
    const order = getOrder(ordersSnap[i].id, ordersSnap[i].type);
  }
}
