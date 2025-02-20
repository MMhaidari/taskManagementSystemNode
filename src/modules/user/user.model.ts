import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

import { IUser, UserRole } from "./user.interface";

const userSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v: string) {
                const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                return emailRegex.test(v);
            },
            message: (props) => `${props.value} is not a valid email address`,
        }
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.User,
    },
    profileImage: {
        type: String,
        default: null,
    },
    dateOfBirth: {
        type: Date,
        default: null,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Password confirmation is required"],
        validate: {
            validator: function (v: string) {
                return v === this.password;
            },
            message: "Passwords do not match",
        }
    },
    isActivated: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["active", "inactive", "deactivated"],
        default: "inactive",
    },
    activationToken: {
        type: String,
    },
    notifyMe: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    passwordChangedAt: {
        type: Date,
        select: false,
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetTokenExpires: {
        type: Date,
    },
});

userSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 1345);
    this.passwordConfirm = undefined;
    next();
})

userSchema.methods.correctPassword = async function (candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt((this.passwordChangedAt.getTime() / 1000).toString(), 10);
        return JWTTimestamp < changedTimestamp;
    }

    return false;
}

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetTokenExpires = new Date(Date.now() + 10 * 60 * 1000);

    return resetToken;
}

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;