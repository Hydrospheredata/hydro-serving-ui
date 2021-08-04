export const commands: string[] = [
  'pip install hs',
  'git clone https://github.com/Hydrospheredata/hydro-serving-example.git',
  'cd hydro-serving-example/examples/custom_metrics/census/data',
  'dvc pull train.csv.dvc',
  'cd hydro-serving-example/examples/custom_metrics/census',
  'dvc pull',
  'hs apply -f serving.yaml',
];
