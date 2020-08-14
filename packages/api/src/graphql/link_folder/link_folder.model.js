import mongoose from 'mongoose'

import Link from '../link/link.model'

const linkFolderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  links: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    }
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  }
}, { timestamps: true })

linkFolderSchema.index({
  userId: 1,
  name: 1,
})

linkFolderSchema.pre('remove', async function () {
  await Link.deleteMany({ folderId: this._id })
})

export default mongoose.model('linkFolder', linkFolderSchema)
