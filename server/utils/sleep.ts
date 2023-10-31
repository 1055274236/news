export const sleep = (time: number): Promise<void> => {
  return new Promise((resole) => {
    setTimeout(() => {
      resole();
    }, time);
  });
};

export const wait = (): Promise<void> => {
  return new Promise((resole) => {
    setTimeout(() => {
      resole();
    }, Math.round(Math.random() * 500) + 500);
  });
};
