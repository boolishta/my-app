export const required = value => {
  if(value)  return undefined; //если пустая строка то ошибка
  return "Field is required";
}

export const maxLengthCreator = (maxLength) => (value) => {
  if(value.length > maxLength)  return `Max length is ${maxLength} symbols`; //если длиньше "указать количество" символов то ошибка
  return undefined;
}