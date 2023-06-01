const getDrawerWidth = (width: number) => {
  if (width > window.innerWidth) {
    return window.innerWidth;
  }
  return width;
};

export { getDrawerWidth };
