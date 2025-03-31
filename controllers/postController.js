const Post = require('../models/Post');
const User = require('../models/User');
const PostImage = require('../models/PostImage'); 

const { bucket } = require('../config/gcs');
const { format } = require('util');
const { v4: uuidv4 } = require('uuid');

const uploadToGCS = (file) => {
    return new Promise((resolve, reject) => {
      const filename = `${Date.now()}-${uuidv4()}-${file.originalname}`;
      const blob = bucket.file(filename);
      const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: file.mimetype,
      });
  
      blobStream.on('error', err => reject(err));
  
      blobStream.on('finish', () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        resolve(publicUrl);
      });
  
      blobStream.end(file.buffer);
    });
  };

exports.createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const post = await Post.create({
            userId: req.user.id,
            content
        });

        if (req.files) {
            const imageUrls = [];

            for (const file of req.files) {
                const url = await uploadToGCS(file);
                imageUrls.push({ imageUrl: url });
            }
            await PostImage.bulkCreate(
                imageUrls.map(img => ({ postId: post.id, imageUrl: img.imageUrl }))
            );            
 
        }

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include:  [
                {
                    model: User,
                    attributes: ['name', 'profile_picture']
                },
                {
                    model: PostImage,
                    attributes: ['imageUrl']  // ✅ Include all images
                }
            ]
        });

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        if (post.userId !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await post.destroy();
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
