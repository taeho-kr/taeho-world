export const formatDatetime = (dateObject) => {
  return `${formatDate(dateObject)} ${formatTime(dateObject)}`;
};

export function formatDate(date) {
  if (!(date instanceof Date)) {
    throw new Error("유효한 날짜 객체가 아닙니다.");
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export const formatTime = (date) => {
  if (!(date instanceof Date)) {
    throw new Error("유효한 날짜 객체가 아닙니다.");
  }

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};
