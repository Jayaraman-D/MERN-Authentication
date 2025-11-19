import userModel from "../models/userModel.js";

export const getUser = async (req, res) => {
    const userId = req.user._id;
    try {

        const user = await userModel.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        res.status(200).json(user);

    } catch (error) {
        console.log(`Error occured in get user controller: ${error.message}`);
        res.status(500).json({ message: "Internal server error", success: false })
    }
}