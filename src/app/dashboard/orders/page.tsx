import React from "react";
import { cookies } from "next/headers";
import OrderWrapper from "@/components/OrderWrapper";
import Mobilenav from "@/components/Mobilenav";

async function getOrders() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const headers = {
    Authorization: `Bearer ${token?.value}`,
    "Content-Type": "application/json",
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/mobile/get-user-orders`,
    {
      headers,
    }
  );

  const orders = await res.json();

  return orders;
}

const OrdersPage = async () => {
  const orders = await getOrders();
  return (
    <>
      <section className="w-full lg:pt-[3rem] pt-[5rem] flex items-center justify-center">
        <div className="orders-section relative mt-4 lg:w-8/12 w-11/12 ">
          <h1 className="font-semibold text-2xl">Orders</h1>
          <OrderWrapper data={orders?.data} />
        </div>
      </section>
      <Mobilenav />
    </>
  );
};

export default OrdersPage;
