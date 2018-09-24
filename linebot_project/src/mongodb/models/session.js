import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  travelOrder: {
    moduleOriginId: {
      type: String,
      required: true,
    },
    moduleDestinationId: {
      type: String,
      required: true,
    },
  },
  expireAt: {
    type: Date,
    default: Date.now,
    expires: '5m',
  },
});

SessionSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
const Session = mongoose.model('Session', SessionSchema);
export default Session;
