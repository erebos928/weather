#!/bin/sh
JENKINS_URL="http://localhost:8080"
USER="behrooz"
TOKEN="Hashimoto"
JOB="Volcano"
COOKIE_JAR="/tmp/jenkins_cookies"
# Get crumb and save cookies
echo "$COOKIE_JAR"
CRUMB_JSON=$(curl --trace -s -u $USER:$TOKEN --cookie-jar $COOKIE_JAR "$JENKINS_URL/crumbIssuer/api/json")
# Extract crumb field and value (simple parsing)
CRUMB=$(echo $CRUMB_JSON | grep -oP '(?<="crumb":")[^"]+')
CRUMB_FIELD=$(echo $CRUMB_JSON | grep -oP '(?<="crumbRequestField":")[^"]+')
# Trigger Jenkins build
curl --trace -X POST -u $USER:$TOKEN --cookie $COOKIE_JAR -H "$CRUMB_FIELD:$CRUMB" "$JENKINS_URL/job/$JOB/build"
