export async function urlToFile(url) {
  const filename = url.split('/').at(-1);
  const mimeType = 'image/jpeg';
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const file = new File([arrayBuffer], filename, { type: mimeType });
  return file;
}
