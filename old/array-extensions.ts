// @ts-ignore
Array.prototype.findByProperty = function (propertyName, propertyValue) {
  return this.find((_) => _[propertyName] === propertyValue);
};
