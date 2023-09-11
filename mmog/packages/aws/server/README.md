## Deploying to Amazon Elastic Container Registry

Based on [Push your image to Amazon Elastic Container Registry](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-container-image.html#create-container-image-push-ecr).

```sh
aws ecr create-repository --repository-name mmog --region eu-central-1
docker tag sanjo/mmog-server 169891519008.dkr.ecr.eu-central-1.amazonaws.com/mmog
docker login -u AWS -p $(aws ecr get-login-password --region eu-central-1) 169891519008.dkr.ecr.eu-central-1.amazonaws.com
docker push 169891519008.dkr.ecr.eu-central-1.amazonaws.com/mmog
```
