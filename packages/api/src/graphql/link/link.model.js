import mongoose from 'mongoose'

const linkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  name: {
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
  folderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'linkFolder'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  }
}, { timestamps: true })

linkSchema.index({
  folderId: 1,
  url: 1,
})

export default mongoose.model('link', linkSchema)
