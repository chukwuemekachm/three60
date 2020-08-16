/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose'

import { LinkFolder } from '../link_folder'
import { Link } from '../link'
import { Note } from '../note'
import { Todo } from '../todo'

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

userSchema.pre('findOneAndRemove', async function preFindAndRemove() {
  await Link.deleteMany({ userId: this._conditions._id })
  await LinkFolder.deleteMany({ userId: this._conditions._id })
  await Note.deleteMany({ userId: this._conditions._id })
  await Todo.deleteMany({ userId: this._conditions._id })
})

export default mongoose.model('user', userSchema)
