import {body} from "express-validator";

export const commentCreateValidation = [
  body('fullName', 'Укажите имя').isLength({ min: 3 }),
  body('comment', 'Комментарий должен содержать минимум 3 буквы').isLength({ min: 3 }).isString(),
  body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];
