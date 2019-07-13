#!/bin/bash

if [ $(which gulp) ];
    then echo "gulp available";
    gulp;
else
    echo "please install gulp (yarn add gulp -D)";
    exit 1;
fi