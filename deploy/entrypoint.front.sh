#!/bin/sh

yarn db:generate
npx prisma migrate deploy
npx tsx ./scripts/populate-db.ts

yarn build
yarn start