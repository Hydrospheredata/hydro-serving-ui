import { baseHrefFactory } from './base-href-factory.util';

const simpleBaseHref = '/';
const rootBaseHref = '//hydro-serving.dev.hydrosphere.io/';
const domainBaseHref = '//hydro-serving.dev.hydrosphere.io/hs/';

describe('baseHrefFactory', () => {
  it('should work with simpleBaseHref', () => {
    expect(baseHrefFactory(simpleBaseHref)).toEqual('/');
  });

  it('should work with rootBaseHref', () => {
    expect(baseHrefFactory(rootBaseHref)).toEqual('/');
  });

  it('should work with domainBaseHref', () => {
    expect(baseHrefFactory(domainBaseHref)).toEqual('/hs/');
  });
});
