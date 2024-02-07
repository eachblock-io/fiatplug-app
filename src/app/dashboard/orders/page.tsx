import React from "react";
import { cookies } from "next/headers";
import OrderCard from "@/components/OrderCard";

async function Orders() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  // const headers = {
  //   Authorization: `Bearer ${token?.value}`,
  //   "Content-Type": "application/json",
  // };
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/orders`,
  //   {
  //     headers,
  //   }
  // );

  // const offer = await res.json();

  // return offer;
}

const OrdersPage = async () => {
  return (
    <section className="w-full relative flex items-center justify-center mb-20">
      <div className="orders-section lg:w-8/12 w-11/12 mt-8">
        <h1 className="font-bold text-4xl ">Orders</h1>
        <div className="space-y-6 mt-8">
          {[0, 1, 2, 3, 4].map((data, i) => (
            <OrderCard key={i} data={data} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrdersPage;
