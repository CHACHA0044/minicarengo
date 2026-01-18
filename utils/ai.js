exports.summarize = (text) => {
  if (!text) return "";

  // take first meaningful sentence
  const clean = text.replace(/\n/g, " ");
  const sentence = clean.split(".")[0];

  return sentence.length > 120
    ? sentence.slice(0, 120) + "..."
    : sentence;
};
