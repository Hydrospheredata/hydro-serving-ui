class CommonStatistics {
  public count: number;
  public distinctCount: number;
  public missing: number;

  public uniquePerc: number;
  public missingPerc: number;

  constructor(props: any = {}) {
    this.count = props.count;
    this.distinctCount = props.distinctCount;
    this.missing = props.missing;

    this.uniquePerc = Math.min(
      Math.floor((this.distinctCount / (this.count - this.missing)) * 100),
      100,
    );
    this.missingPerc = Math.min(
      Math.floor((this.missing / this.count) * 100),
      100,
    );
  }
}

class QuantileStatistics {
  public min: number;
  public max: number;
  public median: number;
  public percentile5: number;
  public percentile95: number;
  public q1: number;
  public q3: number;
  public range: number;
  public interquartileRange: number;

  constructor(props: any = {}) {
    this.min = props.min;
    this.max = props.max;
    this.median = props.median;
    this.percentile5 = props.percentile5;
    this.percentile95 = props.percentile95;
    this.q1 = props.q1;
    this.q3 = props.q3;
    this.range = props.range;
    this.interquartileRange = props.interquartileRange;
  }
}

class DescriptiveStatistics {
  public standardDeviation: number;
  public variationCoef: number;
  public kurtosis: number;
  public mean: number;
  public skewness: number;
  public variance: number;

  constructor(props: any = {}) {
    this.standardDeviation = props.standardDeviation;
    this.variationCoef = props.variationCoef;
    this.kurtosis = props.kurtosis;
    this.mean = props.mean;
    this.skewness = props.skewness === null ? 0 : props.skewness;
    this.variance = props.variance;
  }
}

class Histogram {
  public min: number;
  public max: number;
  public step: number;
  public bars: number;
  public frequencies: number[];
  public bins: number[];

  constructor(props: any = {}) {
    this.min = props.min;
    this.max = props.max;
    this.step = props.step;
    this.bars = props.bars;
    this.frequencies = props.frequencies;
    this.bins = props.bins;
  }
}

class TextStatistics {
  public meanCharacterLength: number;
  public meanDepTreeDepth: number;
  public meanLanguageProba: object;
  public meanPOSProba: object;
  public meanSentimentScore: object;
  public meanTokenLength: number;
  public meanUniqueLemmaRatio: number;

  constructor(props: any = {}) {
    this.meanCharacterLength = props.meanCharacterLength;
    this.meanDepTreeDepth = props.meanDepTreeDepth;
    this.meanLanguageProba = props.meanLanguageProba;
    this.meanPOSProba = props.meanPOSProba;
    this.meanSentimentScore = props.meanSentimentScore;
    this.meanTokenLength = props.meanTokenLength;
    this.meanUniqueLemmaRatio = props.meanUniqueLemmaRatio;
  }
}

export interface Profile {
  kind: string;
  name: string;
  modelVersionId: number;
  timestamp: number;
}

export class TextProfile implements Profile {
  public kind: string;
  public name: string;
  public modelVersionId: number;
  public timestamp: number;
  public commonStatistics: CommonStatistics;
  public textStatistics: TextStatistics;

  constructor(props: any = {}) {
    this.kind = props.kind;
    this.name = props.name;
    this.modelVersionId = props.modelVersionId;
    this.timestamp = props.timestamp;
    this.commonStatistics = new CommonStatistics(props.commonStatistics);
    this.textStatistics = new TextStatistics(props.textStatistics);
  }
}

export class DoubleProfile implements Profile {
  public kind: string;
  public name: string;
  public modelVersionId: number;
  public timestamp: number;
  public commonStatistics: CommonStatistics;
  public quantileStatistics: QuantileStatistics;
  public descriptiveStatistics: DescriptiveStatistics;
  public histogram: Histogram;

  constructor(props: any = {}) {
    this.kind = props.kind;
    this.name = props.name;
    this.modelVersionId = props.modelVersionId;
    this.timestamp = props.timestamp;
    this.commonStatistics = new CommonStatistics(props.commonStatistics);
    this.quantileStatistics = new QuantileStatistics(props.quantileStatistics);
    this.descriptiveStatistics = new DescriptiveStatistics(
      props.descriptiveStatistics,
    );
    this.histogram = new Histogram(props.histogram);
  }
}

export class Profiles {
  public trainingProfile: Profile | null;
  public productionProfile: Profile | null;

  constructor(props: any = {}) {
    this.trainingProfile = null;
    if (props.training) {
      if (props.training['NumericalProfile']) {
        this.trainingProfile = new DoubleProfile(
          props.training['NumericalProfile'],
        );
        this.trainingProfile.kind = 'NumericalProfile';
      } else if (props.training['TextProfile']) {
        this.trainingProfile = new TextProfile(props.training['TextProfile']);
        this.trainingProfile.kind = 'TextProfile';
      }
    }
    this.productionProfile = null;
    if (props.production) {
      if (props.production['NumericalProfile']) {
        this.productionProfile = new DoubleProfile(
          props.production['NumericalProfile'],
        );
        this.productionProfile.kind = 'NumericalProfile';
      } else if (props.production['TextProfile']) {
        this.productionProfile = new TextProfile(
          props.production['TextProfile'],
        );
        this.productionProfile.kind = 'TextProfile';
      }
    }
  }
}
