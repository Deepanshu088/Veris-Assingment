import mongoose, { Document } from 'mongoose';

export interface UserType extends Document {
    email: string;
    name: string;
    password: string | undefined;
}

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String , required: true},
    password: { type: String, required: true }
}, {
    timestamps: true
});

userSchema.virtual('id').get(function (this: UserType) {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});


export default mongoose.model<UserType>('User', userSchema);