#!/usr/bin/env bash

RED='\033[0;31m'
GREEN='\033[1;32m'
NC='\033[0m' # No Color

if (npm install -g @vue/cli) || exit 1 ; then
echo -e "${GREEN}Vue CLI installed${NC}"
else
  echo -e "${RED}Vue CLI failed to install${NC}"
fi

if (cd ./api && npm install && cd -) || exit 1 ; then
echo -e "${GREEN}API dependencies installed${NC}"
else
  echo -e "${RED}API dependencies failed to install${NC}"
fi

if (cd ./admin && npm install && cd -) || exit 1 ; then
  echo -e "${GREEN}Admin dependencies installed${NC}"
else
  echo -e "${RED}Admin dependencies failed to install${NC}"
fi
