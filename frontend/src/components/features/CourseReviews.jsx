import React, { useState } from 'react';
import { Star } from 'lucide-react';

function CourseReviews({ courseId, reviews, onSubmit }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, comment });
    setComment('');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Reviews</h3>

      {/* Add Review */}
      <form onSubmit={handleSubmit} className="card">
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Your Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <Star
                key={value}
                size={32}
                className={`cursor-pointer ${
                  value <= rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
                onClick={() => setRating(value)}
              />
            ))}
          </div>
        </div>

        <textarea
          className="input mb-4"
          rows="4"
          placeholder="Share your thoughts about this course..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        <button type="submit" className="btn-primary">
          Submit Review
        </button>
      </form>

      {/* Display Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="card">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    size={16}
                    className={
                      value <= review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }
                  />
                ))}
              </div>
              <span className="font-semibold">{review.user?.name}</span>
              <span className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseReviews;
