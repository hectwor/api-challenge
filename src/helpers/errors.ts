interface ReturnErrorI {
  status: number;
  message: string;
  data?: object;
}

export const BodyIncorrect = (message: string): ReturnErrorI => ({
  status: 400,
  message,
});

export const KeyExists = (): ReturnErrorI => ({
  status: 400,
  message: "Llave ya existe",
});
