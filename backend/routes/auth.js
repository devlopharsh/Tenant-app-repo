const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const Organisation = require('../Models/Organisations');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, organizationName, joinOrgId } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        let org;

        if (organizationName) {
            org = await Organisation.create({ name: organizationName });
        } else if (joinOrgId) {
            org = await Organisation.findById(joinOrgId);
            if (!org) {
                return res.status(400).json({ message: 'No organisation exists' });
            }
        } else {
            return res.status(400).json({ message: 'Organization details necessary' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            organisation: org._id,
            role: organizationName ? 'Admin' : 'Member',
        });

        await user.save();

        const token = jwt.sign(
            { userId: user._id, orgId: org._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).populate('organisation');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect Password' });
        }

        if (!user.organisation) {
            return res.status(400).json({ message: 'User has no linked organisation' });
        }

        const token = jwt.sign(
            { userId: user._id, orgId: user.organisation._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                organisation: user.organisation.name,
            },
        });

    } catch (error) {
        console.error('Login problem:', error);
        res.status(500).json({ message: 'Server error' });
    }
});




module.exports = router;
