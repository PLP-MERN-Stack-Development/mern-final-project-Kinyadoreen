import { Router } from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import { auth } from '../middleware/auth.js';

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.post('/avatar', auth, upload.single('avatar'), async (req, res) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'avatars' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    // Update user
    req.user.profilePicture = result.secure_url;
    await req.user.save();

    res.json({ success: true, url: result.secure_url });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;