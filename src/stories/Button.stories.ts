// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import Button from './button.component';

export default {
  title: 'Hydrosphere/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<Button> = (args: Button) => ({
  props: args,
});

export const Base = Template.bind({});
Base.args = {
  kind: 'base',
  label: 'Base button',
};

export const Flat = Template.bind({});
Flat.args = {
  kind: 'flat',
  label: 'Flat button',
};

export const Stroked = Template.bind({});
Stroked.args = {
  kind: 'stroked',
  label: 'Stroked button',
};

export const BaseDisabled = Template.bind({});
BaseDisabled.args = {
  disabled: true,
  kind: 'base',
  label: 'Disabled Base button',
};

export const FlatDisabled = Template.bind({});
FlatDisabled.args = {
  disabled: true,
  kind: 'flat',
  label: 'Disabled Flat button',
};

export const StrokedDisabled = Template.bind({});
StrokedDisabled.args = {
  disabled: true,
  kind: 'stroked',
  label: 'Disabled Stroked button',
};

export const BasePrimary = Template.bind({});
BasePrimary.args = {
  kind: 'base',
  color: 'primary',
  label: 'Base button',
};

export const BaseAccent = Template.bind({});
BaseAccent.args = {
  kind: 'base',
  color: 'accent',
  label: 'Base button',
};

export const BaseWarning = Template.bind({});
BaseWarning.args = {
  kind: 'base',
  color: 'warning',
  label: 'Base button',
};

export const BaseCyan = Template.bind({});
BaseCyan.args = {
  kind: 'base',
  color: 'cyan',
  label: 'Base button',
};

export const FlatPrimary = Template.bind({});
FlatPrimary.args = {
  kind: 'flat',
  color: 'primary',
  label: 'Flat button',
};

export const FlatAccent = Template.bind({});
FlatAccent.args = {
  kind: 'flat',
  color: 'accent',
  label: 'Flat button',
};

export const FlatWarning = Template.bind({});
FlatWarning.args = {
  kind: 'flat',
  color: 'warning',
  label: 'Flat button',
};

export const FlatCyan = Template.bind({});
FlatCyan.args = {
  kind: 'flat',
  color: 'cyan',
  label: 'Flat button',
};

export const StrokedPrimary = Template.bind({});
StrokedPrimary.args = {
  kind: 'stroked',
  color: 'primary',
  label: 'Stroked button',
};

export const StrokedAccent = Template.bind({});
StrokedAccent.args = {
  kind: 'stroked',
  color: 'accent',
  label: 'Stroked button',
};

export const StrokedWarning = Template.bind({});
StrokedWarning.args = {
  kind: 'stroked',
  color: 'warning',
  label: 'Stroked button',
};

export const StrokedCyan = Template.bind({});
StrokedCyan.args = {
  kind: 'stroked',
  color: 'cyan',
  label: 'Stroked button',
};
