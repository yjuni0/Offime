const getStatusColor = (status) => {
  switch (status) {
    case "승인":
      return "#3299FE";
    case "대기":
      return "gray";
    case "반려":
      return "red";
    default:
      return "black";
  }
};
export default getStatusColor;
