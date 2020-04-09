export interface FeatureReportHistogram {
  bins: Array<number | string>,
  deployment: number[],
  training: number[],
}

export interface FeatureReport {
  "drift-probability": number,
  histogram: FeatureReportHistogram,
  statistics: {
    [statisticName: string]: {
      change_probability: number,
      deployment: number,
      training: number,
    }
  }
}

export interface Stat {
  overall_probability_drift: number,
  per_feature_report: {
    [featureName: string]: FeatureReport
  },
  warnings: {
    final_decision: string,
    report: Array<{ drift_probability_per_feature: number, message: string }>
  }
}

export const mockStat: Stat = {
  "overall_probability_drift": 1.0,
  "per_feature_report": {
    "Class": {
      "drift-probability": 1.0,
      "histogram": {
        "bins": [
          10101500.0,
          14353520.0,
          18605540.0,
          22857560.0,
          27109580.0,
          31361600.0,
          35613620.0,
          39865640.0,
          44117660.0,
          48369680.0,
          52621700.0,
          56873720.0,
          61125740.0,
          65377760.0,
          69629780.0,
          73881800.0,
          78133820.0,
          82385840.0,
          86637860.0,
          90889880.0,
          95141900.0
        ],
        "deployment": [
          0.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0.0,
          1.968305977835799e-07,
          4.617996712812843e-09,
          8.545267421572484e-09,
          6.973043469489479e-10,
          0.0,
          9.551753884621436e-09,
          1.7366825244766249e-09,
          4.848238714163912e-09,
          3.058929446521328e-09,
          5.196890887638385e-10,
          4.775876942310718e-09
        ],
        "training": [
          5.787626079676267e-08,
          6.052075464085208e-10,
          5.940243634857547e-09,
          1.60379999798258e-08,
          2.5063486432787653e-08,
          4.696936827561781e-09,
          3.9272707087596405e-09,
          4.237768493438795e-08,
          7.808493017249066e-09,
          7.084875298717141e-08,
          0.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0.0
        ]
      },
      "statistics": {
        "mean": {
          "change_probability": 1.0,
          "deployment": 54260379.42714889,
          "training": 33558627.974042684
        },
        "median": {
          "change_probability": 1.0,
          "deployment": 50591900.0,
          "training": 40171900.0
        },
        "std": {
          "change_probability": 1.0,
          "deployment": 9453600.881636694,
          "training": 15655558.710062902
        }
      }
    },
    "Class Name": {
      "drift-probability": 0.0,
      "histogram": {
        "bins": [
          "Table grape purees",
          "Live animals",
          "Fresh fruit purees",
          "Food Beverage and Tobacco Products",
          "Livestock",
          "Regina grape purees",
          "Mink",
          "Live Plant and Animal Material and Accessories and Supplies"
        ],
        "deployment": [
          1,
          0,
          1,
          1,
          0,
          1,
          0,
          0
        ],
        "training": [
          0,
          1,
          0,
          0,
          1,
          0,
          1,
          1
        ]
      },
      "statistics": {
        "entropy": {
          "change_probability": 0.0,
          "deployment": 2.0,
          "training": 2.0
        },
        "unique values": {
          "change_probability": 0.0,
          "deployment": 4,
          "training": 4
        }
      }
    },
  },
  "warnings": {
    "final_decision": "there is a change",
    "report": [
      {
        "drift_probability_per_feature": 1.0,
        "message": "the feature \"Segment\" has changed."
      },
      {
        "drift_probability_per_feature": 1.0,
        "message": "the feature \"Family\" has changed."
      },
      {
        "drift_probability_per_feature": 1.0,
        "message": "the feature \"Class\" has changed."
      },
      {
        "drift_probability_per_feature": 1.0,
        "message": "the feature \"Commodity\" has changed."
      }
    ]
  }
}