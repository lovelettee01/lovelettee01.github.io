import Log from 'helpers/logger';

//요청 설정
const requestConfig = request => {
  Log.debug(`requestConfig`, request);
  return request;
};

//요청 에러 처리
const requestErrorHandle = error => {
  Log.debug(`requestErrorHandle`, error);
  return Promise.reject({
    success: false,
    message: `[Internal Server Error] ${error.message}`
  });
};

//응답 설정
const responseConfig = response => {
  Log.debug(`responseConfig`, response);
  return response;
};

//응답 에러 처리
const responseErrorHandle = error => {
  Log.debug('responseErrorHandle', error);

  if (error?.success === false) return Promise.reject(error);
  return Promise.reject({
    success: false,
    message: `[Internal Server Error] ${error.message}`
  });
};

export {
  requestConfig,
  requestErrorHandle,
  responseConfig,
  responseErrorHandle
};
