import { UserModel, User, ContentModel } from '../models';

export const findUsers = async (query: Partial<User>) => UserModel.find(query).exec();

export const saveUser = async (newUser: User) => await UserModel.create(newUser);

export const updateUser = async (user_id: any, update: Partial<User>) =>
  await UserModel.findByIdAndUpdate(user_id, update, {
    returnDocument: 'after',
  });

export const testUserLogin = async (username: string, password: string) => {
  const users = await findUsers({ username });
  const user = users[0];

  if (user) {
    const valid = await user.comparePassword(password);
    return valid ? user : Promise.reject('invalid password');
  } else {
    return Promise.reject('invalid username');
  }
};

export const findSavedContent = async (user_id: any) => {
  const user = await UserModel.findById(user_id);
  if (user) {
    const content = await ContentModel.find({ _id: { $in: user.saved } });
    return content.length > 0 ? content : false;
  }
  return false;
};
