const User = require('../models/user.model');
const Message = require('../models/message.model');
const {cloudinary} = require('../lib/cloudinary');
const { getRounds } = require('bcrypt');
const {io, getRecieverSocketId} = require('../lib/socket');

const getUsersForSidebar = async (req, res)=>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id : {$ne : loggedInUserId}}); // $ne means not equal to, so we are filtering out the logged in user

        res.status(200).json({
            users : filteredUsers
        });
    } catch (error) {
        console.log('Error in getUsersForSidebar, message.controller.js', error);
        res.status(500).json({
            error : 'Internal Server Error'
        });
    }
}

const getMessages = async (req, res) => {
    try {
        const { id: chatPartnerId } = req.params; // ID of the user we're chatting with
        const loggedInUserId = req.user._id; // Logged-in user's ID

        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId, receiverId: chatPartnerId },
                { senderId: chatPartnerId, receiverId: loggedInUserId }
            ]
        })

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages, message.controller.js", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const sendMessage = async (req,res)=>{
    try {
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadedResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadedResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image : imageUrl
        })

        await newMessage.save();

        //todo : real time messaging using socket.io

        const recieverSocketId = getRecieverSocketId(receiverId);
        if(recieverSocketId){
            io.to(recieverSocketId).emit('newMessage', newMessage); // to because we are sending message to a specific user
        }

        res.status(201).json({
            message : newMessage
        });

        
    } catch (error) {
        console.log('Error in sendMessage, message.controller.js', error);
        res.status(500).json({
            error : 'Internal Server Error'
        });
    }
}



module.exports = {
    getUsersForSidebar,
    getMessages,
    sendMessage
}