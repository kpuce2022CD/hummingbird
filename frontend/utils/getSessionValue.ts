export const getSessionValue = (key: string): string | null => {
  // 로그인 후 세션이 존재하지 않을 때
  if (typeof window !== 'undefined') {
    if (sessionStorage.getItem(key) === null) {
      //로그인 정보가 없음
      return null;
    }
    // 로그인 후 세션이 존재할 때
    else {
      return sessionStorage.getItem(key);
    }
  } else {
    return null;
  }
};
