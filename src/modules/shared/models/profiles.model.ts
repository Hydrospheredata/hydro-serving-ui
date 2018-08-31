class CommonStatistics {
  public count: number; 
  public distinctCount: number; 
  public missing: number;

  public uniquePerc: number;
  public missingPerc: number;

  constructor(props: object = {}) {
    this.count = props["count"];
    this.distinctCount = props["distinctCount"];
    this.missing = props["missing"];

    this.uniquePerc = Math.min(Math.floor(this.distinctCount / (this.count - this.missing) * 100), 100);
    this.missingPerc = Math.min(Math.floor(this.missing / this.count * 100), 100);
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

  constructor(props: object = {}) {
    this.min = props["min"];
    this.max = props["max"];
    this.median = props["median"];
    this.percentile5 = props["percentile5"];
    this.percentile95 = props["percentile95"];
    this.q1 = props["q1"];
    this.q3 = props["q3"];
    this.range = props["range"];
    this.interquartileRange = props["interquartileRange"];
  }
}

class DescriptiveStatistics {
  public standardDeviation: number; 
  public variationCoef: number; 
  public kurtosis: number; 
  public mean: number; 
  public skewness: number; 
  public variance: number;

  constructor(props: object = {}) {
    this.standardDeviation = props["standardDeviation"];
    this.variationCoef = props["variationCoef"];
    this.kurtosis = props["kurtosis"];
    this.mean = props["mean"];
    this.skewness = props["skewness"] === null ? 0 : props["skewness"];
    this.variance = props["variance"];
  }
}

class Histogram {
  public min: number; 
  public max: number; 
  public step: number; 
  public bars: number;
  public frequencies: Array<number>; 
  public bins: Array<number>;

  constructor(props: object = {}) {
    this.min = props["min"];
    this.max = props["max"];
    this.step = props["step"];
    this.bars = props["bars"];
    this.frequencies = props["frequencies"];
    this.bins = props["bins"];
  }
}

export class DoubleProfile {
  public name: string;
  public modelVersionId: number;
  public timestamp: number;
  public commonStatistics: CommonStatistics;
  public quantileStatistics: QuantileStatistics;
  public descriptiveStatistics: DescriptiveStatistics;
  public histogram: Histogram;

  constructor(props: object = {}) {
    this.name = props["name"];
    this.modelVersionId = props["modelVersionId"];
    this.timestamp = props["timestamp"];
    this.commonStatistics = new CommonStatistics(props["commonStatistics"]);
    this.quantileStatistics = new QuantileStatistics(props["quantileStatistics"]);
    this.descriptiveStatistics = new DescriptiveStatistics(props["descriptiveStatistics"]);
    this.histogram = new Histogram(props["histogram"]);
  }
}

export class Profiles {
  public trainingProfile: DoubleProfile | null;
  public productionProfile: DoubleProfile | null;

  constructor(props: object = {}) {
    this.trainingProfile = props["trainingProfile"] ? new DoubleProfile(props["trainingProfile"]) : null;
    this.productionProfile = props["productionProfile"] ? new DoubleProfile(props["productionProfile"]) : null;
  }
}