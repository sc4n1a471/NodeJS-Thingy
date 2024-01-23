# No longer maintained, got replaced by [car-thingy_GO](https://github.com/sc4n1a471/car-thingy_GO)

# NodeJS-Thingy
[![Build, Publish, Redeploy](https://github.com/sc4n1a471/NodeJS-Thingy/actions/workflows/docker.yml/badge.svg)](https://github.com/sc4n1a471/NodeJS-Thingy/actions/workflows/docker.yml)
[![API Test](https://github.com/sc4n1a471/NodeJS-Thingy/actions/workflows/node.js.yml/badge.svg?branch=dev)](https://github.com/sc4n1a471/NodeJS-Thingy/actions/workflows/node.js.yml)

Ez lenni repository for REST API szerű NodeJS-Thingy cuccli

|           | GET        | GET_ID               | POST           | PUT                  | DELETE               |
|-----------|------------|----------------------|----------------|----------------------|----------------------|
| cars      | /cars      | /cars/:license_plate | /cars          | /cars/:license_plate | /cars/:license_plate |
| js_thingy | /test      | /test/:id            | /test          | /test/:id            | /test/:id            |
| mc        | -          | /mc/mcUrl?[url]      | -              | -                    | -                    |
| carBrands | /carBrands | -                    | /carBrandsTest | -                    | /carBrands/:brand_id |
