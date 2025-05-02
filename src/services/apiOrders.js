import supabase from "./supabase";

import { PAGE_SIZE } from '../utils/constance'
import { getToday } from "../utils/helpers";

export async function getOrders({ filter, page }) {
  // render the orders by the newest first
  let query = supabase
    .from('orders')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  // filter
  if (filter) query = query.eq(filter.field, filter.value);

  // pagination
  if (page) query = query.range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  const { data, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error('Orders could not be loaded')
  }

  return { data, count };
}

export async function getOrder(id) {
  let { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)

  if (error) {
    console.log(error);
    throw new Error('Order could not be loaded')
  }
  return data[0];
}

export async function updateOrder(id, obj) {
  const { error } = await supabase
    .from('orders')
    .update(obj)
    .eq('id', id)
    .select()


  if (error) {
    console.log(error);
    throw new Error('Order could not be updated')
  }
}

export async function deleteOrder(id) {
  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', id)

  if (error) {
    console.log(error);
    throw new Error('Order could not be deleted')
  }
}

export async function deleteAllOrders() {
  const { error } = await supabase.from('orders').delete().gt('id', 0);
  if (error) console.log(error.message);
}

export async function getOrdersAfterDate(date) {
  const { data, error } = await supabase
    .from("orders")
    .select("id, created_at, orderPrice,deliveryPrice, status, cart, customer")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Orders could not get loaded");
  }

  return data;
}