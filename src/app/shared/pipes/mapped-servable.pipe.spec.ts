import { MockServable } from '@testing/factories/servable';
import { MappedServablePipe } from './mapped-servable.pipe';

describe('MappedServablePipe', () => {
  const pipe = new MappedServablePipe();

  describe('when servable status is Serving and servable has not message', () => {
    it('should return Serving status', () => {
      expect(pipe.transform(MockServable.build()).status).toBe('Serving');
    });
  });

  describe('when servable status is Serving and servable has message', () => {
    it('should return Warning status', () => {
      expect(pipe.transform(MockServable.build({ message: 'message' })).status).toBe('Warning');
    });
  });

  describe('when servable status is null', () => {
    it('should return Undefined status', () => {
      expect(pipe.transform(MockServable.build({ status: null })).status).toBe('Undefined');
    });
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
