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

export function buildOrder(snaps) {
  const ordersSnap = [];
  for (const i in snaps) {
    const order = getOrder(
      snaps[i].key,
      snaps[i].type,
      snaps[i].title,
      snaps[i].amount,
      snaps[i].price,
      snaps[i].total,
      snaps[i].status,
      snaps[i].date,
      snaps[i].userId
    );
    ordersSnap.push(order);
  }
  return ordersSnap;
}
