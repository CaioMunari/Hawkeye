export const getResponsiveValue = (value, unit) => {
  const fullHDValue = 1920;
  const deviceWidth = window.screen.width;
  return (value * deviceWidth) / fullHDValue + unit;
};
