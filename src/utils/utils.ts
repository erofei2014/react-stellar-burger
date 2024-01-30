export const checkOrderStatus = (orderStatus: string): string => {
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