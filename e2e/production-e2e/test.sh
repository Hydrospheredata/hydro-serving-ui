#!/usr/bin/env bash

loadCensusModel=$1
server=$2

echo $URL
echo $LOAD_MODEL

if [ $LOAD_MODEL == true ]
then
  if [ -z $URL ]
  then 
    echo "Server wasn't provided"
    exit 1
  fi

  echo "Upload model"
  hs cluster add --name="local" --server=$URL
  hs apply -f models/census/model/serving.yaml

  echo "Run test"
  npm run test
else 
  echo "Run test"
  npm run test
fi


  