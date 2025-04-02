const useSelectTitle = (location) => {
  const locationPath = location.pathname;

  switch (true) {
    case locationPath.startsWith("/notification"):
      return "알림 메시지";
    case locationPath.startsWith("/vacation"):
      return "휴가";
    // case locationPath.startsWith("/profile"):
    //   return "프로필";
    // case locationPath.startsWith("/settings"):
    //   return "설정";
    default:
      return "메인 페이지";
  }
};

export default useSelectTitle;
