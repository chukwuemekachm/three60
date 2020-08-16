#!/bin/bash

echo "*********************************************************"
echo "*                                                        "
echo "*     Running Build for three60 '$BUILD_ENV' app         "  
echo "*                                                        "
echo "*********************************************************"

yarn setup

if [ "$BUILD_ENV" = "api" ]; then
    yarn build:api
else
    yarn build:api
fi

echo "*********************************************************"
echo "*                                                        "
echo "*     Completed Build for three60 '$BUILD_ENV' app       "
echo "*                                                        "
echo "*********************************************************"
