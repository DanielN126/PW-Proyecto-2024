import { Schema, model } from 'mongoose';

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        photos: [{
            type: String,
            required: true
        }],
        undertaking: {
            type: Schema.Types.ObjectId,
            ref: 'Undertaking',
            required: true
        }
    },
    { timestamp: true }
)

const Product = model('Product', productSchema)

export default Product;