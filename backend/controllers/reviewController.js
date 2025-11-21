export const addReview = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { rating, comment } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already reviewed
    const existingReview = course.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    );

    if (existingReview) {
      existingReview.rating = rating;
      existingReview.comment = comment;
    } else {
      course.reviews.push({
        user: req.user._id,
        rating,
        comment,
      });
    }

    course.calculateAverageRating();
    await course.save();

    res.json({ success: true, course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};