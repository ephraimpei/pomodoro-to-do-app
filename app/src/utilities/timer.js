// used to convert from number of seconds to MM:SS format
let timeFormatConverter = function (ms) {
  const min = parseInt(ms / 60000);
  const sec = Math.floor((ms % 60000) / 1000);

  let minStr = min >= 10 ? min.toString() : `0${ min.toString() }`;
  let secStr = sec >= 10 ? sec.toString() : `0${ sec.toString() }`;

  return `${ minStr }:${ secStr }`;
};

export { timeFormatConverter };
