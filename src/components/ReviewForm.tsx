"use client";
import React, { useState } from "react";
import { IoStarOutline } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { Button } from "./ui/button";
import fetchToken from "@/lib/auth";
import ReviewSuccessModal from "./ReviewSuccessModal";

// Review component
const ReviewForm = () => {
  // State for rating and comment
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  // Handle rating change
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  // Handle comment change
  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setOpenSuccessModal(true);
    try {
      const token = await fetchToken();
      const headers = {
        Authorization: `Bearer ${token?.data?.token}`,
        "Content-Type": "application/json",
      };
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          review: comment,
          star_rating: rating,
        }),
      });

      const resdata = await res.json();
      if (resdata?.status == "success") {
        setLoading(false);
        setOpenSuccessModal(true);
      }
    } catch (error) {}
    setRating(0);
    setComment("");
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg mt-10">
      <ReviewSuccessModal openSuccessModal={openSuccessModal} />
      {/* Star rating */}
      <div className="flex mb-4 mx-auto justify-center items-center space-x-6">
        {[1, 2, 3, 4, 5].map((index) => (
          <button
            key={index}
            onClick={() => handleRatingChange(index)}
            className={`focus:outline-none text-2xl ${
              index <= rating ? "text-orange-400" : "text-gray-300"
            }`}>
            {index <= rating ? (
              <IoStar />
            ) : (
              <IoStarOutline className="text-orange-400" />
            )}
          </button>
        ))}
      </div>
      {/* Comment textarea */}
      <form onSubmit={handleSubmit} className="mt-8">
        <textarea
          className="w-full p-3 placeholder:text-xs border border-gray-500 rounded-lg focus:outline-none focus:border-orange-400"
          rows={4}
          placeholder="Describe your experience"
          value={comment}
          onChange={handleCommentChange}
        />
        <div className="text-right">
          <p className="text-xs text-gray-400">0/500</p>
        </div>

        <div className="mt-6 px-10 pb-10 fixed bottom-0 right-0 left-0 bg-white">
          <Button className="w-full mt-8 py-7 rounded-full bg-[#F9A21B] hover:bg-[#ffb151] flex items-center px-6">
            Post review
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
