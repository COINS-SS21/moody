#!/bin/bash

owners=("7805dcdd-bd12-47d4-8a65-500c992c1e4f" "cabf0955-98b9-4f1a-9f1f-9b19e1339679" "1b2f09e7-6c97-4791-874c-d9354489b7f0")
tables=("Meeting-yh7gova2yjfs7jj53upygjmfci-prod" "AudienceFaceExpression-yh7gova2yjfs7jj53upygjmfci-prod")

for owner in "${owners[@]}"; do
    for table in "${tables[@]}"; do
        echo "Scanning $table for $owner"

        aws dynamodb scan --table-name "$table" \
            --filter-expression "#owner = :v1" \
            --expression-attribute-values "{ \":v1\": { \"S\": \"$owner\" } }" \
            --expression-attribute-names '{ "#owner": "owner" }' \
            --profile moody >"${table}-${owner}".json
    done
done
