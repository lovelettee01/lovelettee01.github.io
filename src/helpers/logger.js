let isLog = true;
let logLevel = process.env.REACT_APP_LOG_LEVEL; //1:sys, 2:warn, 3:info, 4:debug

const sys = (message, ...obj) => {
  if (isLog && logLevel >= 1) console.log(`${message}`, ...obj);
};
const warn = (message, ...obj) => {
  if (isLog && logLevel >= 2) console.log(`${message}`, ...obj);
};
const info = (message, ...obj) => {
  if (isLog && logLevel >= 3) console.log(`${message}`, ...obj);
};
const debug = (message, ...obj) => {
  if (isLog && logLevel >= 4) console.log(`${message}`, ...obj);
};

const Log = {
  sys,
  warn,
  info,
  debug
};

export default Log;
