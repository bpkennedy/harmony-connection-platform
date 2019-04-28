#!/usr/bin/env bash

RED='\033[0;31m'
GREEN='\033[1;32m'
NC='\033[0m' # No Color

if (cd ./admin && npm run build && cd -) || exit 1 ; then
  echo -e "${GREEN}Admin application built${NC}"
else
  echo -e "${RED}Admin application failed to build${NC}"
fi

if (cd ./admin && mv ./dist ../api && cd -) || exit 1 ; then
  echo -e "${GREEN}Admin application moved to server${NC}"
else
  echo -e "${RED}Admin application failed to move to server${NC}"
fi

if (cd ./api && mv ./dist ./public && cd -) || exit 1 ; then
  echo -e "${GREEN}Admin dist directory renamed to Public${NC}"
else
  echo -e "${RED}Admin dist directory failed to be renamed to Public${NC}"
fi

if (cd ./api && npm run build && cd -) || exit 1 ; then
  echo -e "${GREEN}API built${NC}"
else
  echo -e "${RED}API failed to build${NC}"
fi
