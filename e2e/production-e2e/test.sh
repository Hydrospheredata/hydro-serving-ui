#!/usr/bin/env bash

if [ $LOAD_MODEL ]
then
  if [ -z $URL ]
  then 
    echo "Server wasn't provided"
    exit 1
  fi

  echo "Upload model"
  hs cluster add --name="local" --server=$URL
  hs apply -f models/census/model/serving.yaml
  if [ $CREATE_APPLICATION ]
    echo "Upload application"
    hs apply -f models/census/application/serving.yaml
  fi

  echo "Run test"
  npm run test
else 
  echo "Run test"
  npm run test
fi


  