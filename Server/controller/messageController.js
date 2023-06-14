
import { Message } from '../Model/Message.js';

export const newMessage = async (req, res) => {
  try {
    const { conversationId, sender, text } = req.body;
    const newMsg = new Message({ conversationId, sender, text });
    const messages = await newMsg.save();
    if (sender === 'user') {
      // Find the associated appointment
      const appointment = await Appointment.findOne({ _id: conversationId });

      // Check if the appointment exists
      if (appointment) {
        // Increment the chatLimit
        appointment.chatLimit += 1;

        // Check if the chatLimit has reached the maximum allowed messages
        if (appointment.chatLimit >= 20) {
          // Reset the chatLimit and update the appointment
          appointment.chatLimit = 0;
          await appointment.save();

          // Return the response indicating the limit has been reached
          return res.status(200).send({ success: true, message: 'Chat limit reached', messages });
        }

        // Update the appointment with the incremented chatLimit
        await appointment.save();
      }
    }
    return res.status(200).send({ success: true, message: 'New Message Successful', messages });
  } catch (error) {

    return res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await Message.find({ conversationId: id });
    return res.status(200).send({ success: true, message: 'Get Message Successful', messages });
  } catch (error) {

    return res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};