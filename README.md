# esep-webhooks
zip -r function.zip . && aws lambda update-function-code --function-name EsepWebhook --zip-file fileb://function.zip
aws lambda create-function --function-name EsepWebhook --runtime nodejs16.x --handler index.handler --role $arn --zip-file fileb://function.zip