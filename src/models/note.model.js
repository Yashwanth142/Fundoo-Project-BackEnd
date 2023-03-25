import { object } from '@hapi/joi';
import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
  {
    Title: {
      type: String
    },
    description: {
      type: String
    },
    color: {
      type: String
    },
    archive: {
      type: Boolean,
      default: false
    },
    trash: {
      type: Boolean,
      default: false
    },
    userID: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default model('note', noteSchema);
