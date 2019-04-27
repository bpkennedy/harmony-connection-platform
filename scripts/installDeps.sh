#!/usr/bin/env bash

RED='\033[0;31m'
GREEN='\033[1;32m'
NC='\033[0m' # No Color

if (cd ./api && npm install && cd -) || exit 1 ; then
echo -e "${GREEN}API deps install successful!${NC}"
else
  echo -e "${RED}API dep install failed${NC}"
fi

# if (cd ./admin && npm install && cd -) || exit 1 ; then
#   echo -e "${GREEN}Admin deps install successful!${NC}"
# else
#   echo -e "${RED}Admin deps install failed${NC}"
# fi
