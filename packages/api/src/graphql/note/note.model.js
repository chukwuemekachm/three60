import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
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

noteSchema.index({
  userId: 1,
  title: 1,
})

export default mongoose.model('note', noteSchema)
