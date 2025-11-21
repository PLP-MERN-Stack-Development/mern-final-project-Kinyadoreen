import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, Reply } from 'lucide-react';

function DiscussionForum({ courseId, comments, onAddComment }) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddComment({ content: newComment });
    setNewComment('');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold flex items-center gap-2">
        <MessageCircle size={28} />
        Discussion
      </h3>

      {/* Add Comment */}
      <form onSubmit={handleSubmit} className="card">
        <textarea
          className="input mb-3"
          rows="3"
          placeholder="Ask a question or share your thoughts..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary">
          Post Comment
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="card">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="font-bold text-primary-600">
                  {comment.user?.name[0]}
                </span>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{comment.user?.name}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">{comment.content}</p>

                <div className="flex items-center gap-4 text-sm">
                  <button className="flex items-center gap-1 text-gray-600 hover:text-primary-600">
                    <ThumbsUp size={16} />
                    {comment.likes?.length || 0} Likes
                  </button>
                  <button className="flex items-center gap-1 text-gray-600 hover:text-primary-600">
                    <Reply size={16} />
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiscussionForum;
