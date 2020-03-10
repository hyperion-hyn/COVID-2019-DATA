# COVID-19/2019-nCoV Infection Data
## Project Intro

This is the data repository for the Hyperion Covid-19 Map Visual Dashboard operated by Hyperion MapChain. The map will demonstrate two source types of Covid-19 data. The choropleth map displays divided geographical areas or regions in various colors according to the official confirmed virus cases, while the POIs are contributed by global community.


## Online web 👉 <https://covid.hyn.space/>

![Priview](https://github.com/hyperion-hyn/COVID-2019-DATA/blob/master/web/public/website-preview.png)

## Data Sources

* [World Health Organization (WHO)](https://www.who.int/)
* [DXY.cn. Pneumonia. 2020](http://3g.dxy.cn/newh5/view/pneumonia)
* [BNO News](https://bnonews.com/index.php/2020/02/the-latest-coronavirus-cases/)
* [National Health Commission of the People’s Republic of China (NHC)](http://www.nhc.gov.cn/xcs/yqtb/list_gzbd.shtml)
* [China CDC (CCDC)](http://weekly.chinacdc.cn/news/TrackingtheEpidemic.htm)
* [Hong Kong Department of Health](https://www.chp.gov.hk/en/features/102465.html)
* [Macau Government](https://www.ssm.gov.mo/portal/)
* [Taiwan CDC](https://sites.google.com/cdc.gov.tw/2019ncov/taiwan?authuser=0)
* [US CDC](https://www.cdc.gov/coronavirus/2019-ncov/index.html)
* [Government of Canada](https://www.canada.ca/en/public-health/services/diseases/coronavirus.html)
* [Australia Government Department of Health](https://www.health.gov.au/news/coronavirus-update-at-a-glance)
* [European Centre for Disease Prevention and Control (ECDC)](https://www.ecdc.europa.eu/en/geographical-distribution-2019-ncov-cases)
* [Ministry of Health Singapore (MOH)](https://www.moh.gov.sg/covid-19)
* [Italy Ministry of Health](http://www.salute.gov.it/nuovocoronavirus)
* [South Korea CDC](https://www.cdc.go.kr/board/board.es?mid=a30402000000&bid=0030)
* [Nikkei News Japan](https://zh.cn.nikkei.com/top/2020-02-03-06-03-30.html?types[0]=8&start=0)

## API

API 1: Get virus information in all countries

Request parameter description:

`lang` supports `zh`, `en`

```shell
$ curl -G https://covid.hyn.space/api/data/country/latest?lang=${lang}
```

Return result description:
```shell
...
{
        "id": 965008,
        "area": "意大利",
        "key": "意大利",
        "newConfirmed": 1797,
        "newRecovered": 102,
        "newDead": 97,
        "totalConfirmed": 9172,
        "totalRecovered": 724,
        "totalDead": 463
}
...
```

API 2: Get daily virus information, return results include daily added and cumulative total

Request parameter description:

`lang` supports `zh`, `en`

`area` key field of source API 1, e.g: Set area to `意大利`

```shell
$ curl -G https://covid.hyn.space/api/data/country/daily/${area}?lang=${lang}
```

API 3：Get virus information in Nearby Areas (Coming Soon)

API 4：Get an virus information in an urban area of a country (Coming soon)


## Terms of Use

This GitHub repo and its contents herein, including all data, mapping, and analysis, copyright Hyperion, all rights reserved, is provided to the public strictly for non-commercial purposes. The Website relies upon publicly available data from multiple sources, that do not always agree. Hyperion hereby disclaims any and all representations and warranties with respect to the Website, including accuracy, fitness for use, and merchantability. Any form of privacy breaches is not allowed. 







