import pandas as pd
from joblib import load

clf = load('/model/files/model.joblib')
input_encoders = load('/model/files/encoders.joblib')
del input_encoders['income']
output_encoder = load('/model/files/encoders.joblib')['income']


cols = ['age', 'workclass', 'fnlwgt',
        'education', 'educational-num', 'marital-status',
        'occupation', 'relationship', 'race', 'gender',
        'capital-gain', 'capital-loss', 'hours-per-week',
        'native-country']


def predict(**kwargs):
    X = pd.DataFrame.from_dict({'input': kwargs}, orient='index', columns=cols)

    for col_name, label_encoder in input_encoders.items():
        X[col_name] = label_encoder.transform(X[col_name])

    predicted = clf.predict(X)

    return {"income": output_encoder.inverse_transform(predicted)[0]}
