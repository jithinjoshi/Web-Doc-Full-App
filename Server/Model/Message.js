


import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    text: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model('message', messageSchema);
