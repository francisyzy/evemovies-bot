import { ContextMessageUpdate } from 'telegraf';
import User from '../models/User';

/**
 * Function that updates language for the current user in all known places
 * @param ctx - telegram context
 * @param newLang - new language
 */
export async function updateLanguage(ctx: ContextMessageUpdate, newLang: 'en' | 'ru') {
  await User.findOneAndUpdate(
    { _id: ctx.from.id },
    {
      language: newLang
    },
    { new: true }
  );

  ctx.userInfo.language = newLang;

  ctx.i18n.locale(newLang);
}
