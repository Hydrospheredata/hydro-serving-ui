export enum EngBreakpoints {
  XXS = 'xxs',
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XXL = 'xxl',

  // less than
  lsXXS = 'ls-xxs',
  lsXS = 'ls-xs',
  lsSM = 'ls-sm',
  lsMD = 'ls-md',
  lsLG = 'ls-lg',
  lsXL = 'ls-xl',

  // more than
  mrXXS = 'mr-xxs',
  mrXS = 'mr-xs',
  mrSM = 'mr-sm',
  mrMD = 'mr-md',
  mrLG = 'mr-lg',
  mrXL = 'mr-xl',

  // devices
  Handset = 'handset',
  Tablet = 'tablet',
  Desktop = 'desktop',
}

export const MediaQueries = new Map<EngBreakpoints, string>()
  .set(EngBreakpoints.XXS, 'screen and (max-width: 360px)')
  .set(EngBreakpoints.XS, 'screen and (max-width: 479px)')
  .set(
    EngBreakpoints.SM,
    'screen and (min-width: 480px) and (max-width: 767px)',
  )
  .set(
    EngBreakpoints.MD,
    'screen and (min-width: 768px) and (max-width: 1023px)',
  )
  .set(
    EngBreakpoints.LG,
    'screen and (min-width: 1024px) and (max-width: 1279px)',
  )
  .set(
    EngBreakpoints.XL,
    'screen and (min-width: 1280px) and (max-width: 1919px)',
  )
  .set(EngBreakpoints.XXL, 'screen and (min-width: 1920px)')

  .set(EngBreakpoints.lsXXS, 'screen and (max-width: 413px)')
  .set(EngBreakpoints.lsXS, 'screen and (max-width: 479px)')
  .set(EngBreakpoints.lsSM, 'screen and (max-width: 767px)')
  .set(EngBreakpoints.lsMD, 'screen and (max-width: 1023px)')
  .set(EngBreakpoints.lsLG, 'screen and (max-width: 1279px)')
  .set(EngBreakpoints.lsXL, 'screen and (max-width: 1919px)')

  .set(EngBreakpoints.mrXXS, 'screen and (min-width: 414px)')
  .set(EngBreakpoints.mrXS, 'screen and (min-width: 480px)')
  .set(EngBreakpoints.mrSM, 'screen and (min-width: 768px)')
  .set(EngBreakpoints.mrMD, 'screen and (min-width: 1024px)')
  .set(EngBreakpoints.mrLG, 'screen and (min-width: 1280px)')
  .set(EngBreakpoints.mrXL, 'screen and (min-width: 1920px)')

  .set(
    EngBreakpoints.Handset,
    '(max-width: 479px) and (orientation: portrait), (max-width: 959px) and (orientation: landscape)',
  )
  .set(
    EngBreakpoints.Tablet,
    '(min-width: 478px) and (max-width: 839px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279px) and (orientation: landscape)',
  )
  .set(
    EngBreakpoints.Desktop,
    '(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)',
  );
