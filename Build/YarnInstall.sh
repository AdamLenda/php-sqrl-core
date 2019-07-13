#!/bin/bash

if [ $(which yarn) ];
    then echo "yarn available";
    yarn install;
else
    echo "please install yarn";
    exit 1;
fi