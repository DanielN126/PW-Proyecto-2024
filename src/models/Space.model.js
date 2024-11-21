import { Schema, model } from 'mongoose';

const spaceSchema = new Schema(
    {
        ubication: {
            type: String,
            required: true
        },
        event: {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        },
        undertaking: {
            type: Schema.Types.ObjectId,
            ref: 'Undertaking'
        }
    },
    {timestamps: true}
)

const Space = model('Space', spaceSchema);

export default Space;