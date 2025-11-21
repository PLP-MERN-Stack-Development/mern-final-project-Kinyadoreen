import PDFDocument from 'pdfkit';

export const generateCertificate = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const progress = await Progress.findOne({
      student: req.user._id,
      course: courseId,
    }).populate('course');

    if (!progress || progress.overallProgress < 100) {
      return res.status(400).json({ message: 'Course not completed' });
    }

    // Create PDF
    const doc = new PDFDocument({ size: 'A4', layout: 'landscape' });
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=certificate-${courseId}.pdf`
    );

    doc.pipe(res);

    // Certificate design
    doc.fontSize(40).text('Certificate of Completion', { align: 'center' });
    doc.moveDown();
    doc.fontSize(20).text('This certifies that', { align: 'center' });
    doc.moveDown();
    doc.fontSize(30).text(req.user.name, { align: 'center' });
    doc.moveDown();
    doc.fontSize(20).text('has successfully completed', { align: 'center' });
    doc.moveDown();
    doc.fontSize(25).text(progress.course.title, { align: 'center' });
    doc.moveDown();
    doc.fontSize(15).text(
      new Date().toLocaleDateString(),
      { align: 'center' }
    );

    doc.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};