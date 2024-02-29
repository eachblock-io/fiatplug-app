"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import OrderCard from "@/components/OrderCard";
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function OrderStatusModal({ open, setOpen, selectedOrder }: any) {
  const { push } = useRouter();

  const cancelButtonRef = useRef(null);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-0"
          initialFocus={cancelButtonRef}
          onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed bottom-0 inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-0 w-screen overflow-y-auto">
            <div className="flex h-screen items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full flex items-center justify-center">
                  <div className="bg-gray-50 px-4 py-3 grid grid-cols-2 gap-10 sm:flex sm:flex-row-reverse sm:px-6">
                    <div className="orders-section w-full ">
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
                                  ? `text-orange-400`
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
                                  ? `text-orange-400`
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
                                ? selectedOrder?.other_details
                                    ?.payment_received_at
                                : `00:00`}
                            </p>
                            <IoIosCheckmarkCircle
                              className={`lg:text-3xl text-2xl text-gray-400 absolute lg:left-[-0.7rem] left-[-0.5rem] ${
                                selectedOrder?.other_details?.payment_received
                                  ? `text-orange-400`
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
                                  ? `text-orange-400`
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
                            <div className="steps relative ml-14">
                              {/* Slide 1 */}
                              <div
                                className={`line lg:border-l-8 border-l-[0.4rem] border-gray-400 lg:h-20 h-[4rem] mb-1 mt-1 ${
                                  selectedOrder?.other_details
                                    ?.payment_recieved_in_wallet
                                    ? `border-orange-400`
                                    : ``
                                }`}></div>
                              <div
                                className={`flex items-center ${
                                  selectedOrder?.other_details
                                    ?.payment_recieved_in_wallet
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
                                      ? `text-orange-400`
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
                                  selectedOrder?.other_details
                                    ?.payment_sent_to_user_bank
                                    ? `border-orange-400`
                                    : ``
                                }`}></div>
                              <div
                                className={`flex items-center ${
                                  selectedOrder?.other_details
                                    ?.payment_sent_to_user_bank
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
                                      ? `text-orange-400`
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
                                  selectedOrder?.other_details
                                    ?.payment_recieved_by_user
                                    ? `border-orange-400`
                                    : ``
                                }`}></div>
                              <div
                                className={`flex items-center ${
                                  selectedOrder?.other_details
                                    ?.payment_recieved_by_user
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
                                    selectedOrder?.other_details
                                      ?.payment_recieved_by_user
                                      ? `text-orange-400`
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
                            <div className="steps relative ml-14">
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
                                  {selectedOrder?.other_details
                                    ?.confirm_received_at
                                    ? selectedOrder?.other_details
                                        ?.confirm_received_at
                                    : `00:00`}
                                </p>
                                <IoIosCheckmarkCircle
                                  className={`lg:text-3xl text-2xl text-gray-400 absolute lg:left-[-0.7rem] left-[-0.5rem] ${
                                    selectedOrder?.other_details
                                      ?.confirm_received
                                      ? `text-orange-400`
                                      : ``
                                  } `}
                                />
                                {selectedOrder?.other_details
                                  ?.confirm_received ? (
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
                                  selectedOrder?.other_details
                                    ?.user_wallet_credited
                                    ? `border-orange-400`
                                    : ``
                                }`}></div>
                              <div
                                className={`flex items-center ${
                                  selectedOrder?.other_details
                                    ?.user_wallet_credited
                                    ? `text-orange-400`
                                    : `text-gray-400`
                                } `}>
                                <p className="absolute left-[-4rem] ">
                                  {selectedOrder?.other_details
                                    ?.user_wallet_credited_at
                                    ? selectedOrder?.other_details
                                        ?.user_wallet_credited_at
                                    : `00:00`}
                                </p>
                                <IoIosCheckmarkCircle
                                  className={`lg:text-3xl text-2xl text-gray-400 absolute lg:left-[-0.7rem] left-[-0.5rem] ${
                                    selectedOrder?.other_details
                                      ?.user_wallet_credited
                                      ? `text-orange-400`
                                      : ``
                                  } `}
                                />
                                {selectedOrder?.other_details
                                  ?.user_wallet_credited ? (
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
