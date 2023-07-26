export const separateParagraphs = (paragraph: string | undefined) => {
  return paragraph ? paragraph.split('\n\n') : [];
};
