const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Posts');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// route:       POST api/posts
// description: Create a post
// access:      Private
router.post(
    '/',
    [
        auth,
        [
            check('text', 'Text is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const user = await User.findById(req.user.id).select('-password');

            const newPost = {
                text: req.body.text,
                user: req.user.id,
                avatar: user.avatar,
                name: user.name
            };

            const post = new Post(newPost);
            await post.save();
            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// route:       GET api/posts
// description: Get all posts
// access:      Private
router.get('/', [auth], async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });

        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// route:       GET api/posts/:id
// description: Get single post by post ID
// access:      Private
router.get('/:post_id', [auth], async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found.' });
        }

        res.json(post);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found.' });
        }
        res.status(500).send('Server Error');
    }
});

// route:       DELETE api/posts/:id
// description: Deletes post by post id
// access:      Private
router.delete('/:post_id', [auth], async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found.' });
        }

        if (String(post.user) === req.user.id) {
            await post.remove();
            return res.json({ msg: 'Post Deleted.' });
        } else {
            return res.status(400).json({ msg: 'You are unable delete this post.' });
        }
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found.' });
        }
        res.status(500).send('Server Error');
    }
});

// route:       PUT api/posts/like/:id
// description: Like a post
// access:      Private
router.put('/like/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) return res.status(404).json({ msg: 'Post not found' });

        const likesArray = post.likes.map(like => like['user']);
        if (!likesArray.includes(req.user.id)) {
            const user = await User.findById(req.user.id).select('-password');
            post.likes.unshift({ user: req.user.id, name: user.name });
            await post.save();
            res.json(post.likes);
        } else {
            return res.status(400).json({ msg: 'Post already liked' });
        }
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found.' });
        }
        res.status(500).send('Server Error');
    }
});

// route:       PUT api/posts/unlike/:id
// description: Unlike a post
// access:      Private
router.put('/unlike/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) return res.status(404).json({ msg: 'Post not found' });

        const likesArray = post.likes.map(like => like['user']);

        if (likesArray.includes(req.user.id)) {
            const newLikes = post.likes.filter(like => String(like.user) !== req.user.id);
            post.likes = newLikes;
            await post.save();
            res.json(post.likes);
        } else {
            return res.status(400).json({ msg: 'Post has not yet been liked' });
        }
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found.' });
        }
        res.status(500).send('Server Error');
    }
});

// route:       PUT api/posts/comment/:id
// description: Add comment to a post
// access:      Private
router.put(
    '/comment/:post_id',
    [
        auth,
        [
            check('text', 'Comment cannot be empty.')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const post = await Post.findById(req.params.post_id);

            if (!post) return res.status(404).json({ msg: 'Post not found' });

            const user = await User.findById(req.user.id).select('-password');
            post.comments.push({
                user: req.user.id,
                text: req.body.text,
                name: user.name,
                avatar: user.avatar
            });
            await post.save();
            res.json(post.comments);
        } catch (err) {
            console.error(err.message);
            if (err.kind === 'ObjectId') {
                return res.status(404).json({ msg: 'Post not found.' });
            }
            res.status(500).send('Server Error');
        }
    }
);

// route:       DELETE api/posts/:post_id/comment/:comment_id
// description: Delete a comment from a post
// access:      Private
router.delete('/:post_id/comment/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) return res.status(404).json({ msg: 'Post not found' });

        const commentToRemove = post.comments.find(
            comment => String(comment._id) === req.params.comment_id
        );

        if (!commentToRemove) return res.status(404).json({ msg: 'Comment not found' });

        //validate user
        if (String(commentToRemove.user) === req.user.id) {
            const newComments = post.comments.filter(
                comment => comment.id !== req.params.comment_id
            );

            post.comments = newComments;
            await post.save();
            res.json(post.comments);
        } else {
            res.status(401).json({ msg: 'User not authorized' });
        }
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found.' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;
