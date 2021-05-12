import { Image } from '@app/core/data/types';
import { Factory } from 'fishery';

export const MockImage = Factory.define<Image>(() => ({
  name: 'mockImage',
  tag: 'mockImageTag',
  sha256: 'mockSha256',
}));
