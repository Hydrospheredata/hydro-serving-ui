import { Model } from '@app/core/data/types';
import { Factory } from 'fishery';

export const MockModel1 = Factory.define<Model>(({ sequence }) => ({
  id: sequence,
  name: 'mockModel_1_Name',
  modelVersions: [],
  favorite: false,
}));

export const MockModel2 = MockModel1.build({
  name: 'Sooooooooooooooo_long_mockModel_2_Name',
});
