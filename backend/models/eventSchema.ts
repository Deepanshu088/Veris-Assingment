import mongoose, { Document, ObjectId } from 'mongoose';

export interface EventType extends Document {
    id: ObjectId;
    title: string;
    description?: string;
    startTime: Date;
    durationInMin: number;
    endTime: Date;
    location: string;
    guests: string[];
    reminderBeforeEventTimeInMin: number;
    creatorId: ObjectId;
}

const eventSchema = new mongoose.Schema({
    title : { type: String, required: true },
    description : { type: String },
    startTime : { type: Date, required: true },
    endTime : { type: Date, required: true },
    durationInMin : { type: Number, required: true },
    location : { type: String, required: true },
    reminderBeforeEventTimeInMin : { type: Number, required: true },
    guests: { type: [String], required: true },
    creatorId: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
}, {
    timestamps: true
});

eventSchema.virtual('id').get(function(this: EventType){
    return this._id.toHexString();
});


eventSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});


export default mongoose.model<EventType>('Event', eventSchema);