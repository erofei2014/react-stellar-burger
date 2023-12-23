export const checkOrderStatus = (orderStatus) => {
  switch (orderStatus) {
    case 'done':
      return 'Выполнен';
    case 'pending':
      return 'Готовится';
    case 'created':
      return 'Создан';
    default:
      return 'Статус неизвестен';
  }
};