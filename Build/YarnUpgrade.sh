#!/bin/bash

if [ $(which yarn) ];
    then echo "yarn available";
    yarn upgrade;
else
    echo "please install yarn";
    exit 1;
fi