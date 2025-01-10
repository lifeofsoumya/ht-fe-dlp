```
docker run -d \
  --name pg_ht \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=pw \
  -p 5432:5432 \
  postgres
```

postgresql://admin:pw@localhost:5432/ht