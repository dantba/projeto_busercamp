#!/bin/bash
export COMPOSE_PROJECT_NAME=brennercard_${CI_COMMIT_SHA}
docker-compose -f docker/compose/test.yml run brennercard unittests.sh
exitcode=$?
docker-compose -f docker/compose/test.yml down
exit $exitcode
