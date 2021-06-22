#!/bin/sh

npm run build
rm -rf dist_production_backup
mv dist_production dist_production_backup
mv dist dist_production
rm -rf dist_production/modules/gesobau
rm -rf dist_production/modules/gewobag
rm -rf dist_production/modules/stadt_und_land
rm -rf dist_production/modules/wbm
