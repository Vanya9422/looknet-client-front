#!/bin/bash
git pull origin main --rebase --autostash
pm2 stop all
npm run build
pm2 start all
