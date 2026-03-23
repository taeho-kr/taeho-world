const openPage = (url: string) => {
  window.open(url, "_blank")?.focus();
};

export { openPage };
