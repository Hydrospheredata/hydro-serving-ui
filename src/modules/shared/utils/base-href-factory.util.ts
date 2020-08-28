export function baseHrefFactory(): string {
  const href = document.getElementsByTagName('base')[0].getAttribute('href');
  const arr = href.split('/').filter(v => v);
  return arr.length ? `/${arr[arr.length - 1]}/` : '/';
}
