
import { Conversation } from "../Model/Conversation.js";

// conversation controller

export const newConversation = async (req, res) => {
  try {
    const { senderId, recieverId } = req.body;



    const newConvs = await new Conversation({ members: [recieverId, senderId] });
    await newConvs.save();

    return res.status(200).send({ success: true, message: 'Conversation Created Successfully' });
  } catch (error) {
 
    return res.status(500).send({ success: true, message: 'Internal Server Error' });
  }
};

export const getConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const conversation = await Conversation.find({
      members: { $in: [id] },
    });
    return res.status(200).send({ success: true, message: 'get conversation successfull', conversation });
  } catch (error) {
    
    return res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};


export const checkExistence = async (req, res) => {
  try {
    const { senderId, recieverId} = req.body;
    console.log(senderId, recieverId);

    // Check if a conversation document exists where senderId and receiverId are present in the members array
    const checkExistence = await Conversation.findOne({
      members: { $all: [senderId, recieverId] },
    });

    if (checkExistence) {
      // Conversation document exists
      res
        .status(200)
        .json({ success: false, message: 'Conversation already exists' });
    } else {
      // Conversation document does not exist
      res.status(200).json({ success: true, message: 'Conversation does not exist' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: 'Something went wrong' });
  }
};
