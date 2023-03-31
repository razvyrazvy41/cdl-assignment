export const calculateTotalPriceOfBasket = items => {
  let totalPrice = 0;

  items.forEach(item => {
    if (item.hasSpecialPrice) {
      const numSpecialPriceItems = Math.floor(
        item.quantity / item.itemsPerSpecialPrice,
      );
      const numRegularPriceItems = item.quantity % item.itemsPerSpecialPrice;
      totalPrice +=
        numSpecialPriceItems * item.specialPrice +
        numRegularPriceItems * item.unitPrice;
    } else {
      totalPrice += item.unitPrice * item.quantity;
    }
  });
  return totalPrice;
};

export const calculateItemDiscountedPrice = item => {
  const isQuantityLowerThanSpecialPriceItemsNumber =
    item.quantity < item.itemsPerSpecialPrice;
  if (isQuantityLowerThanSpecialPriceItemsNumber) return 0;

  if (item.hasSpecialPrice) {
    const numSpecialPriceItems = Math.floor(
      item.quantity / item.itemsPerSpecialPrice,
    );
    const numRegularPriceItems = item.quantity % item.itemsPerSpecialPrice;
    return (
      numSpecialPriceItems * item.specialPrice +
      numRegularPriceItems * item.unitPrice
    );
  } else return 0;
};
