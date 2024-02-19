"use client";
import React, { useState } from "react";
import OrderCard from "@/components/OrderCard";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Button } from "./ui/button";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { formatTime } from "@/lib/utils";

const OrderWrapper = ({ data }: any) => {
  const [displayCount, setDisplayCount] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 10);
  };

  const handleShowLess = () => {
    setDisplayCount(10);
  };

  const handleOrderClick = (orderData: React.SetStateAction<null>) => {
    setSelectedOrder(orderData);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="mb-10">
      <div className="space-y-6 mt-8">
        {data.slice(0, displayCount).map((orderData: any, i: any) => (
          <OrderCard key={i} data={orderData} onOrderClick={handleOrderClick} />
        ))}
      </div>
      {displayCount < data.length ? (
        <button
          onClick={handleShowMore}
          className="mt-4 px-4 py-2 bg-orange-100 rounded hover:bg-orange-300">
          Show More
        </button>
      ) : (
        <button
          onClick={handleShowLess}
          className="mt-4 px-4 py-2 bg-orange-100 rounded-full hover:bg-orange-300">
          Show Less
        </button>
      )}

      {selectedOrder && (
        <div
          onClick={closeModal}
          className="absolute top-0 bottom-0 right-0 left-0 w-full z-10 bg-white lg:py-4 pt-16 lg:px-20 px-10 overflow-y-scroll">
          <Button
            onClick={() => closeModal}
            variant="ghost"
            className="flex items-center mt-10">
            <FaLongArrowAltLeft className="text-xl" />
          </Button>
          <div className="orders-section lg:w-8/12 w-12/12 mt-6">
            <OrderCard data={selectedOrder} />
            {selectedOrder?.is_crypto === false ? (
              <div className="steps mt-10 relative ml-14">
                {/* Slide 1 */}
                <div
                  className={`line lg:border-l-8 border-l-[0.4rem] border-gray-400 lg:h-20 h-[4rem] mb-1 mt-1 ${
                    selectedOrder?.other_details?.card_received
                      ? `border-orange-400`
                      : ``
                  }`}></div>
                <div
                  className={`flex items-center ${
                    selectedOrder?.other_details?.card_received
                      ? `text-orange-400`
                      : `text-gray-400`
                  } `}>
                  <p className="absolute left-[-4rem] ">
                    {selectedOrder?.other_details?.card_received_at
                      ? selectedOrder?.other_details?.card_received_at
                      : `00:00`}
                  </p>
                  <IoIosCheckmarkCircle
                    className={`lg:text-3xl text-2xl text-gray-400 absolute lg:left-[-0.7rem] left-[-0.5rem] ${
                      selectedOrder?.other_details?.card_received
                        ? `border-orange-400`
                        : ``
                    } `}
                  />
                  {selectedOrder?.other_details?.card_received ? (
                    <p className="ml-8 font-medium lg:text-sm text-xs">
                      Your card has been verified
                    </p>
                  ) : (
                    <p className="ml-8 font-medium text-gray-400 lg:text-sm text-xs">
                      Your card has been verified
                    </p>
                  )}
                </div>

                {/* Slide 2 */}
                <div
                  className={`line lg:border-l-8 border-l-[0.4rem] border-gray-400 lg:h-20 h-[4rem] mb-1 mt-1 ${
                    selectedOrder?.other_details?.card_verified
                      ? `border-orange-400`
                      : ``
                  }`}></div>
                <div
                  className={`flex items-center ${
                    selectedOrder?.other_details?.card_verified
                      ? `text-orange-400`
                      : `text-gray-400`
                  } `}>
                  <p className="absolute left-[-4rem] ">
                    {selectedOrder?.other_details?.card_verified_at
                      ? selectedOrder?.other_details?.card_verified_at
                      : `00:00`}
                  </p>
                  <IoIosCheckmarkCircle
                    className={`lg:text-3xl text-2xl text-gray-400 absolute lg:left-[-0.7rem] left-[-0.5rem] ${
                      selectedOrder?.other_details?.card_verified
                        ? `border-orange-400`
                        : ``
                    } `}
                  />
                  {selectedOrder?.other_details?.card_verified ? (
                    <p className="ml-8 font-medium lg:text-sm text-xs">
                      Your card has been verified
                    </p>
                  ) : (
                    <p className="ml-8 font-medium text-gray-400 lg:text-sm text-xs">
                      Your card has been verified
                    </p>
                  )}
                </div>

                {/* Slide 3 */}
                <div
                  className={`line lg:border-l-8 border-l-[0.4rem] border-gray-400 lg:h-20 h-[4rem] mb-1 mt-1 ${
                    selectedOrder?.other_details?.payment_received
                      ? `border-orange-400`
                      : ``
                  }`}></div>
                <div
                  className={`flex items-center ${
                    selectedOrder?.other_details?.payment_received
                      ? `text-orange-400`
                      : `text-gray-400`
                  } `}>
                  <p className="absolute left-[-4rem] ">
                    {selectedOrder?.other_details?.payment_received_at
                      ? selectedOrder?.other_details?.payment_received_at
                      : `00:00`}
                  </p>
                  <IoIosCheckmarkCircle
                    className={`lg:text-3xl text-2xl text-gray-400 absolute lg:left-[-0.7rem] left-[-0.5rem] ${
                      selectedOrder?.other_details?.payment_received
                        ? `border-orange-400`
                        : ``
                    } `}
                  />
                  {selectedOrder?.other_details?.payment_received ? (
                    <p className="ml-8 font-medium lg:text-sm text-xs">
                      Your payment has been received
                    </p>
                  ) : (
                    <p className="ml-8 font-medium text-gray-400 lg:text-sm text-xs">
                      Your payment has been received
                    </p>
                  )}
                </div>

                {/* Slide 4 */}
                <div
                  className={`line lg:border-l-8 border-l-[0.4rem] border-gray-400 lg:h-20 h-[4rem] mb-1 mt-1 ${
                    selectedOrder?.other_details?.payment_received
                      ? `border-orange-400`
                      : ``
                  }`}></div>
                <div
                  className={`flex items-center ${
                    selectedOrder?.other_details?.payment_sent
                      ? `text-orange-400`
                      : `text-gray-400`
                  } `}>
                  <p className="absolute left-[-4rem] ">
                    {selectedOrder?.other_details?.payment_sent_at
                      ? selectedOrder?.other_details?.payment_sent_at
                      : `00:00`}
                  </p>
                  <IoIosCheckmarkCircle
                    className={`lg:text-3xl text-2xl text-gray-400 absolute lg:left-[-0.7rem] left-[-0.5rem] ${
                      selectedOrder?.other_details?.payment_sent
                        ? `border-orange-400`
                        : ``
                    } `}
                  />
                  {selectedOrder?.other_details?.payment_sent ? (
                    <p className="ml-8 font-medium lg:text-sm text-xs">
                      Your payment has been sent
                    </p>
                  ) : (
                    <p className="ml-8 font-medium text-gray-400 lg:text-sm text-xs">
                      Your payment has been sent
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <>
                {selectedOrder?.other_details?.type === "sell" && (
                  <div className="steps mt-10 relative ml-14">
                    {/* Slide 1 */}
                    <div
                      className={`line lg:border-l-8 border-l-[0.4rem] border-gray-400 lg:h-20 h-[4rem] mb-1 mt-1 ${
                        selectedOrder?.other_details?.payment_recieved_in_wallet
                          ? `border-orange-400`
                          : ``
                      }`}></div>
                    <div
                      className={`flex items-center ${
                        selectedOrder?.other_details?.payment_recieved_in_wallet
                          ? `text-orange-400`
                          : `text-gray-400`
                      } `}>
                      <p className="absolute left-[-4rem] ">
                        {selectedOrder?.other_details
                          ?.payment_recieved_in_wallet_at
                          ? selectedOrder?.other_details
                              ?.payment_recieved_in_wallet_at
                          : `00:00`}
                      </p>
                      <IoIosCheckmarkCircle
                        className={`lg:text-3xl text-2xl text-gray-400 absolute lg:left-[-0.7rem] left-[-0.5rem] ${
                          selectedOrder?.other_details
                            ?.payment_recieved_in_wallet
                            ? `border-orange-400`
                            : ``
                        } `}
                      />
                      {selectedOrder?.other_details
                        ?.payment_recieved_in_wallet ? (
                        <p className="ml-8 font-medium lg:text-sm text-xs">
                          Your crypto payment has been recieved
                        </p>
                      ) : (
                        <p className="ml-8 font-medium text-gray-400 lg:text-sm text-xs">
                          Your crypto payment has been recieved
                        </p>
                      )}
                    </div>

                    {/* Slide 2 */}
                    <div
                      className={`line lg:border-l-8 border-l-[0.4rem] border-gray-400 lg:h-20 h-[4rem] mb-1 mt-1 ${
                        selectedOrder?.other_details?.payment_sent_to_user_bank
                          ? `border-orange-400`
                          : ``
                      }`}></div>
                    <div
                      className={`flex items-center ${
                        selectedOrder?.other_details?.payment_sent_to_user_bank
                          ? `text-orange-400`
                          : `text-gray-400`
                      } `}>
                      <p className="absolute left-[-4rem] ">
                        {selectedOrder?.other_details
                          ?.payment_sent_to_user_bank_at
                          ? selectedOrder?.other_details
                              ?.payment_sent_to_user_bank_at
                          : `00:00`}
                      </p>
                      <IoIosCheckmarkCircle
                        className={`lg:text-3xl text-2xl text-gray-400 absolute lg:left-[-0.7rem] left-[-0.5rem] ${
                          selectedOrder?.other_details
                            ?.payment_sent_to_user_bank
                            ? `border-orange-400`
                            : ``
                        } `}
                      />
                      {selectedOrder?.other_details
                        ?.payment_sent_to_user_bank ? (
                        <p className="ml-8 font-medium lg:text-sm text-xs">
                          Your payment has been sent to your bank
                        </p>
                      ) : (
                        <p className="ml-8 font-medium text-gray-400 lg:text-sm text-xs">
                          Your payment has been sent to your bank
                        </p>
                      )}
                    </div>

                    {/* Slide 3 */}
                    <div
                      className={`line lg:border-l-8 border-l-[0.4rem] border-gray-400 lg:h-20 h-[4rem] mb-1 mt-1 ${
                        selectedOrder?.other_details?.payment_recieved_by_user
                          ? `border-orange-400`
                          : ``
                      }`}></div>
                    <div
                      className={`flex items-center ${
                        selectedOrder?.other_details?.payment_recieved_by_user
                          ? `text-orange-400`
                          : `text-gray-400`
                      } `}>
                      <p className="absolute left-[-4rem] ">
                        {selectedOrder?.other_details
                          ?.payment_recieved_by_user_at
                          ? selectedOrder?.other_details
                              ?.payment_recieved_by_user_at
                          : `00:00`}
                      </p>
                      <IoIosCheckmarkCircle
                        className={`lg:text-3xl text-2xl text-gray-400 absolute lg:left-[-0.7rem] left-[-0.5rem] ${
                          selectedOrder?.other_details?.payment_recieved_by_user
                            ? `border-orange-400`
                            : ``
                        } `}
                      />
                      {selectedOrder?.other_details
                        ?.payment_recieved_by_user ? (
                        <p className="ml-8 font-medium lg:text-sm text-xs">
                          You have recieved payment
                        </p>
                      ) : (
                        <p className="ml-8 font-medium text-gray-400 lg:text-sm text-xs">
                          You have recieved payment
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Buy order status */}

                {selectedOrder?.other_details?.type === "buy" && (
                  <div className="steps mt-10 relative ml-14">
                    {/* Slide 1 */}
                    <div
                      className={`line lg:border-l-8 border-l-[0.4rem] border-gray-400 lg:h-20 h-[4rem] mb-1 mt-1 ${
                        selectedOrder?.other_details?.confirm_received
                          ? `border-orange-400`
                          : ``
                      }`}></div>
                    <div
                      className={`flex items-center ${
                        selectedOrder?.other_details?.confirm_received
                          ? `text-orange-400`
                          : `text-gray-400`
                      } `}>
                      <p className="absolute left-[-4rem] ">
                        {selectedOrder?.other_details?.confirm_received_at
                          ? selectedOrder?.other_details?.confirm_received_at
                          : `00:00`}
                      </p>
                      <IoIosCheckmarkCircle
                        className={`lg:text-3xl text-2xl text-gray-400 absolute lg:left-[-0.7rem] left-[-0.5rem] ${
                          selectedOrder?.other_details?.confirm_received
                            ? `border-orange-400`
                            : ``
                        } `}
                      />
                      {selectedOrder?.other_details?.confirm_received ? (
                        <p className="ml-8 font-medium lg:text-sm text-xs">
                          Your payment has been recieved
                        </p>
                      ) : (
                        <p className="ml-8 font-medium text-gray-400 lg:text-sm text-xs">
                          Your payment has been recieved
                        </p>
                      )}
                    </div>

                    {/* Slide 2 */}
                    <div
                      className={`line lg:border-l-8 border-l-[0.4rem] border-gray-400 lg:h-20 h-[4rem] mb-1 mt-1 ${
                        selectedOrder?.other_details?.user_wallet_credited
                          ? `border-orange-400`
                          : ``
                      }`}></div>
                    <div
                      className={`flex items-center ${
                        selectedOrder?.other_details?.user_wallet_credited
                          ? `text-orange-400`
                          : `text-gray-400`
                      } `}>
                      <p className="absolute left-[-4rem] ">
                        {selectedOrder?.other_details?.user_wallet_credited_at
                          ? selectedOrder?.other_details
                              ?.user_wallet_credited_at
                          : `00:00`}
                      </p>
                      <IoIosCheckmarkCircle
                        className={`lg:text-3xl text-2xl text-gray-400 absolute lg:left-[-0.7rem] left-[-0.5rem] ${
                          selectedOrder?.other_details?.user_wallet_credited
                            ? `border-orange-400`
                            : ``
                        } `}
                      />
                      {selectedOrder?.other_details?.user_wallet_credited ? (
                        <p className="ml-8 font-medium lg:text-sm text-xs">
                          Your wallet has been credited
                        </p>
                      ) : (
                        <p className="ml-8 font-medium text-gray-400 lg:text-sm text-xs">
                          Your wallet has been credited
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderWrapper;
