import User from '../mongodb/models/user.js';

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).limit(req.query._end);
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(503).json({ message: error.message });
    }
}


const createUser = async (req, res) => {
    try {
        const { name, email, avatar } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) return res.status(200).json(userExists);

        const newUser = await User({
            name,
            avatar,
            email,
        });
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

const getUserInfoById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById({ _id: id }).populate('allProperties');

        if (!user) return res.status(404).json({ message: "User not found!" });

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(503).json({ message: error });
    }
}

export { getAllUsers, createUser, getUserInfoById };