var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.transport.nsw.gov.au/v1/roads/spatial?format=geojson&q=select%20%2A%20from%20road_traffic_counts_station_reference%20limit%2050%20",
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Authorization": "apikey pKxP7tPNW456lrsJco7aUntJjcbzlGLTiqYA",
      "User-Agent": "PostmanRuntime/7.16.3",
      "Cache-Control": "no-cache",
      "Postman-Token": "5dba78a6-ba0f-4a28-8b33-0532e4bd6fb9,c260a6f7-22c4-4d2c-be29-5e713f32aa35",
      "Host": "api.transport.nsw.gov.au",
      "Accept-Encoding": "gzip, deflate",
      "Cookie": "AWSALB=iwUPvfA8cnIj1tAI1N5JwE0sPO490OL0pkSchWlli+4kPoHj/0Barrkmt9y7IJquQp4uaaDYUwfGoamdFKzo7FEQ7HCsorUiztakOaerIuMfaJWdhMEjo8i6vufI",
      "Connection": "keep-alive",
      "cache-control": "no-cache"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });