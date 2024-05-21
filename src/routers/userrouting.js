import express from "express";
import User from "../models/usermodel.js";
import validator from "validator";

const router = express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        if (!validator.isEmail(user.email)) {
            return res.status(400).json({ message: 'Invalid Email' });
        }
        if (user.phno.toString().length !== 10) {
            return res.status(400).json({ message: 'Phone number must have 10 digits' });
        }
        if (user.password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }
        const existingUser = await User.findOne({ $or: [{ email: user.email }, { phno: user.phno }] }).lean();
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = req.body;
        const existingUser = await User.findOne({ email: user.email }).lean();
        if (!existingUser) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        if (user.password !== existingUser.password) {
            return res.status(400).json({ message: 'Invalid Password' });
        }
        if (!existingUser.status) {
            return res.status(400).json({ message: 'User is not active' });
        }
        if (user.email === existingUser.email && user.password === existingUser.password) {
            res.status(200).json({ message: "Login Success", existingUser })
        }
    }
    catch (error) {
        res.send(error)
    }
})


router.get('/users', async (req, res) => {
    const id = req.query.adminId;
    const filterValue = req.query.filterValue;
    const sortBy = req.query.sortBy;
    const sortOrder = req.query.sortOrder;
    const match = { adminId: id };

    if (filterValue) {
        if (!isNaN(filterValue)) {
            match['phno'] = +filterValue;
        } else {
            // Construct a regex pattern to match the filter value case-insensitively
            const regexPattern = new RegExp(filterValue, 'i');

            // Update the match object to check for matches in any of the fields
            match.$or = [
                { name: regexPattern },
                { email: regexPattern }
            ];
        }
    }

    try {
        let users;
        if (sortBy && sortOrder) {
            // If sortBy and sortOrder are provided, sort the users
            users = await User.find(match).sort({ [sortBy]: sortOrder }).lean();
        } else {
            // Otherwise, just find users without sorting
            users = await User.find(match).lean();
        }
        res.send(users);
    } catch (error) {
        res.status(500).send("Error: " + error);
    }
});


router.patch('/users/:id', async (req, res) => {
    const id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'password', 'status']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(id).lean();
        if (!user) {
            return res.status(404).send('Message : user not found')
        }

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})

router.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id).lean();
        if (!user) {
            return res.status(404).send('Message : user not found')
        }
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})

export default router;