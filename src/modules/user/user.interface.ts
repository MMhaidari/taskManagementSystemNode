import { Document, Model } from "mongoose";

export enum UserRole {
  Admin = 'admin',
  User = 'user'
}

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    profileImage?: string | null;
    dateOfBirth?: Date;
    password: string;
    passwordConfirm: string | undefined;
    isActivated: boolean;
    status: 'active' | 'inactive' | 'deactivated';
    activationToken?: string;
    notifyMe?: boolean;
    createdAt: Date;
    passwordChangedAt: Date;
    passwordResetToken?: string;
    passwordResetTokenExpires?: Date;

    // methods
    correctPassword(candidatePassword: string): Promise<boolean>;
    changedPasswordAfter(JWTTimestamp: number): boolean;
    createPasswordResetToken(): string;
}

export interface IUserModel extends Model<IUser> {}
