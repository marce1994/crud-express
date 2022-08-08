ENDPOINT=http://localhost:3000/api/articles
CONTENT_TYPE="Content-Type: application/json"

curl --silent $ENDPOINT

echo "***** POST *****"

ID=$(curl --silent --request POST $ENDPOINT --header "$CONTENT_TYPE" \
  --data '{"article":{"author":"Jane","title":"A new post","body":"Exclusive data!"}}' | \
  jq --raw-output '.id')

curl --silent $ENDPOINT

echo "***** PUT $ENDPOINT/$ID *****"

curl --silent --request PUT $ENDPOINT/$ID --header "$CONTENT_TYPE" \
  --data '{"article":{"body":"Exclusive information!"}}'

curl --silent $ENDPOINT

echo "***** DELETE $ENDPOINT/$ID *****"

curl --silent --request DELETE $ENDPOINT/$ID

curl --silent $ENDPOINT
