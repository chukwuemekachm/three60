import mongoose from 'mongoose'

import Link from '../link/link.model'

const linkFolderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
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

linkFolderSchema.pre('findOneAndRemove', async function preFindAndRemove() {
  // eslint-disable-next-line no-underscore-dangle
  await Link.deleteMany({ folderId: this._conditions._id })
})

export default mongoose.model('linkFolder', linkFolderSchema)
