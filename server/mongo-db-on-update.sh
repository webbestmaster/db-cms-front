#!/bin/bash

mkdir -p db-dump;

mongodump --port=27001 --archive=db-dump/db-dump-"$(date +%Y-%m-%d--%H-%M-%S)".zip --db=main-db;

cd db-dump || exit;

filesCount="$(ls | wc -l)";
maxFilesCount=5;

# echo $filesCount;

if [ "$filesCount" -gt "$maxFilesCount" ]; then
    rm "$(ls -t | tail -1)"
fi
