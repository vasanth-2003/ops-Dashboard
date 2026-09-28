import mongoose from 'mongoose'
import {
  isValidShortCode,
  isValidDestinationUrl,
  PRODUCT_MAX,
} from './links.validation.js'

const linkSchema = new mongoose.Schema(
  {
    shortCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: isValidShortCode,
        message: 'shortCode must be 3-40 characters: lowercase letters, numbers, hyphens',
      },
    },
    destinationUrl: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: isValidDestinationUrl,
        message: 'destinationUrl must be an absolute http or https URL',
      },
    },
    product: {
      type: String,
      trim: true,
      maxlength: PRODUCT_MAX,
    },
    clickCount: {
      type: Number,
      default: 0,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: 'clickCount must be an integer',
      },
    },
  },
  { timestamps: true },
)

export const Link = mongoose.model('Link', linkSchema)
