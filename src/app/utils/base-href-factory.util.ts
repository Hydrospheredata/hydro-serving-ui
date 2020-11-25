const hrefFromHTML = document
  .getElementsByTagName('base')[0]
  .getAttribute('href');

export function baseHrefFactory(href: string = hrefFromHTML): string {
  const arr = href.split('/').filter(v => v);
  return arr.length > 1 ? `/${arr[arr.length - 1]}/` : '/';
}
