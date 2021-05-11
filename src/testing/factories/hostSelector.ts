import { Factory } from 'fishery';

export const MockHostSelector = Factory.define(
  ({ sequence }) => ({
    id: sequence,
    name: 'CPU',
    placeholder: 'mockHostSelectorPlaceHolder',
}));
