const dictionary = {
    username: 'Пользователь',
    email: 'Элекронный адрес',
    text: 'Описание',
    login: 'Логин',
    password: 'Пароль',
    signin: 'Войти',
    signout: 'Выйти',
    tasks: 'Задачи',
    add: 'Добавить',
    save: 'Сохранить',
    id: 'ИД',
    status: 'Статус',
    cancel: 'Отмена',
    auth: 'Авторизация',
    updateTask: 'Задача обновлена',
    createTask: 'Новая задача добавлена',
    successfulLogin: 'Вы авторизованы',
    unsuccessfulLogin: 'Не удалось авторизоваться',
    emailValid: 'email не валиден'
}

export const t = (key: keyof typeof dictionary): string => {
    return dictionary[key];
}
