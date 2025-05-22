const express = require('express');
const User = require('../models/User');
const schemes = require('../../data/schemes.json');
const router = express.Router();

router.get('/recommend/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  const eligibleSchemes = schemes.filter(s => {
    const c = s.criteria;
    return (
      (!c.age || user.age <= c.age) &&
      (!c.gender || user.gender === c.gender) &&
      (!c.occupation || user.occupation === c.occupation) &&
      (!c.income || user.income <= c.income) &&
      (!c.caste || user.caste === c.caste) &&
      (!c.disability || user.disability === c.disability)
    );
  });

  res.json(eligibleSchemes);
});

module.exports = router;
