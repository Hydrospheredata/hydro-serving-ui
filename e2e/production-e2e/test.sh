#!/usr/bin/env bash

loadCensusModel=$1
server=$2

if [ "$loadCensusModel" == true ]
then
  if [ -z $server ]
  then 
    echo "Server wasn't provided"
    exit 1
  fi

  echo "Upload model"
  hs cluster add --name="local" --server="$server"
  hs apply -f models/census/model/serving.yaml

  echo "Run test"
  npm run test
else 
  echo "Run test"
  npm run test
fi


  