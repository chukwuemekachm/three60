/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose'

import LinkFolder from '../link_folder/link_folder.model'
import Note from '../note/note.model'
import Todo from '../todo/todo.model'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  password: {
    type: String
  },
  googleId: {
    type: String
  },
  facebookId: {
    type: String
  },
  avatarURL: {
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
  status: {
    type: String,
    enum: ['IN_ACTIVE', 'ACTIVE'],
    default: 'ACTIVE',
    uppercase: true
  },
  // TODO - improvement: Replace role with policies
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
    uppercase: true
  }
}, { timestamps: true })

userSchema.pre('remove', async function () {
  await LinkFolder.deleteMany({ userId: this._id })
  await Note.deleteMany({ userId: this._id })
  await Todo.deleteMany({ userId: this._id })
})

export default mongoose.model('user', userSchema)
