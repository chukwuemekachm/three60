import mongoose from 'mongoose'

const STATUS_ENUM = ['BACKLOG', 'IN_PROGRESS', 'FINISHED', 'TRASH']

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  items: [
    {
      title: {
        type: String,
        required: true
      },
      status: {
        type: String,
        enum: STATUS_ENUM.slice(0, 3),
        default: STATUS_ENUM[0],
        uppercase: true
      }
    }
  ],
  status: {
    type: String,
    enum: STATUS_ENUM,
    default: STATUS_ENUM[0],
    uppercase: true
  },
  tags: [
    {
      title: {
        type: String,
        required: true
      },
      color: {
        type: String
      }
    }
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  }
}, { timestamps: true })

todoSchema.index({
  userId: 1,
  title: 1,
})

export default mongoose.model('todo', todoSchema)
