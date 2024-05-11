const SharingPost = require('../models/sharingPost');
const CommunityPost = require('../models/communityPost');
const Notification = require('../models/notification');
const jwt = require('jsonwebtoken');
const Issue = require('../models/issue');
const HouseholdUser = require('../models/householdUser');
const bcrypt = require('bcrypt');

const householdUserControllers = {};

householdUserControllers.register = async (req, res) => {
  const { name, email, password, wardNumber, location } = req.body;

  try {
    // Check if the user already exists
    let user = await HouseholdUser.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user
    user = new HouseholdUser({
      name,
      email,
      password,
      wardNumber,
      location,
    });

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user in the database
    await user.save();

    res.json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// Add this to your householdUserControllers object
householdUserControllers.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    let user = await HouseholdUser.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // If the credentials are valid, sign a JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });

      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

householdUserControllers.createIssue = async (req, res) => {
  const { content } = req.body;

  try {
    if (!content) {
      return res.status(400).json({ msg: 'Content is required' });
    }

    const newIssue = new Issue({
      householdUserId: req.user.id,
      content,
    });

    const issue = await newIssue.save();

    res.status(201).json(issue);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Invalid user ID' });
    }
    res.status(500).send('Server Error');
  }
};


householdUserControllers.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ time: -1 });
    if (!notifications) {
      return res.status(404).json({ msg: 'No notifications found' });
    }
    res.status(200).json(notifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

householdUserControllers.createCommunityPost = async (req, res) => {
  const { content } = req.body;

  try {
    if (!content) {
      return res.status(400).json({ msg: 'Content is required' });
    }

    const newPost = new CommunityPost({
      userId: req.user.id,
      content,
    });

    const post = await newPost.save();

    res.status(201).json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

householdUserControllers.createSharingPost = async (req, res) => {
  const { content } = req.body;

  try {
    if (!content) {
      return res.status(400).json({ msg: 'Content is required' });
    }

    const newPost = new SharingPost({
      userId: req.user.id,
      content,
    });

    const post = await newPost.save();

    res.status(201).json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};
householdUserControllers.getSharingPosts = async (req, res) => {
  try {
    const posts = await SharingPost.find().sort({ time: -1 });
    if (!posts) {
      return res.status(404).json({ msg: 'No posts found' });
    }
    res.status(200).json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};
householdUserControllers.getCommunityPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.find().sort({ time: -1 });
    if (!posts.length) {
      return res.status(404).json({ msg: 'No community posts found' });
    }
    res.status(200).json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

householdUserControllers.likeCommunityPost = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (post.likedPerson.some((like) => like.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likedPerson.unshift(req.user.id);

    await post.save();

    res.status(200).json(post.likedPerson);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};
householdUserControllers.unlikeCommunityPost = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const removeIndex = post.likedPerson.map((like) => like.toString()).indexOf(req.user.id);
    if (removeIndex === -1) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    post.likedPerson.splice(removeIndex, 1);

    await post.save();

    res.status(200).json(post.likedPerson);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};
householdUserControllers.upvoteSharingPost = async (req, res) => {
  try {
    const post = await SharingPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (post.upvotePerson.some((upvote) => upvote.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post already upvoted' });
    }

    post.upvotePerson.unshift(req.user.id);

    await post.save();

    res.status(200).json(post.upvotePerson);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};
householdUserControllers.downvoteSharingPost = async (req, res) => {
  try {
    const post = await SharingPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const removeIndex = post.upvotePerson.map((upvote) => upvote.toString()).indexOf(req.user.id);
    if (removeIndex === -1) {
      return res.status(400).json({ msg: 'Post has not yet been upvoted' });
    }

    post.upvotePerson.splice(removeIndex, 1);

    await post.save();

    res.status(200).json(post.upvotePerson);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};
module.exports = householdUserControllers;
