#!/usr/bin/env bash

RED='\033[0;31m'
GREEN='\033[1;32m'
NC='\033[0m' # No Color

# run api unit tests
if (cd ./api && npm run test:ci && cd -) || exit 1 ; then
  echo -e "${GREEN}API unit tests successful${NC}"
else
  echo -e "${RED}API unit tests failed${NC}"
fi

# if (cd ./admin && npm run test:unit && cd -) || exit 1 ; then
#   echo -e "${GREEN}Admin unit tests successful${NC}"
# else
#   echo -e "${RED}Admin unit tests failed${NC}"
# fi

# if (cd ./admin && npm run test:e2e:headless && cd -) || exit 1 ; then
#   echo -e "${GREEN}Admin UAT tests successful${NC}"
# else
#   echo -e "${RED}Admin UAT tests failed${NC}"
# fi
