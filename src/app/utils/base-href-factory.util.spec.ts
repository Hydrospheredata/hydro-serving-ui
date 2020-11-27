import { baseHrefFactory } from './base-href-factory.util';

const simpleBaseHref = '/';
const rootBaseHref = '//example.domain.io/';
const domainBaseHref = '//example.domain.io/hydrosphere/';

describe('baseHrefFactory', () => {
  it('should work with simpleBaseHref', () => {
    expect(baseHrefFactory(simpleBaseHref)).toEqual('/');
  });

  it('should work with rootBaseHref', () => {
    expect(baseHrefFactory(rootBaseHref)).toEqual('/');
  });

  it('should work with domainBaseHref', () => {
    expect(baseHrefFactory(domainBaseHref)).toEqual('/hydrosphere/');
  });
});
