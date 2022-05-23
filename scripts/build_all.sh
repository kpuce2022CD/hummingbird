#!/bin/bash

docker image build -t ce19f003/ordercanvas-backend .././backend
docker image build -t ce19f003/ordercanvas-frontend .././frontend


docker push ce19f003/ordercanvas-backend:latest
docker push ce19f003/ordercanvas-frontend:latest

docker image prune -f