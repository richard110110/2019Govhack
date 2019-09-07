var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.transport.nsw.gov.au/v1/gtfs/realtime/buses",
    "method": "GET",
    "headers": {
        "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
        "Accept": "application/json",
        "Authorization": "apikey pKxP7tPNW456lrsJco7aUntJjcbzlGLTiqYA",
        "User-Agent": "PostmanRuntime/7.16.3",
        "Cache-Control": "no-cache",
        "Postman-Token": "430789af-653e-4504-9a22-7820877fcbda,d115ed61-e707-4edc-8236-867a44f9e499",
        "Host": "api.transport.nsw.gov.au",
        "Accept-Encoding": "gzip, deflate",
        "Cookie": "AWSALB=MSF3juqw811GLa2oY/JHRiFVwJ75A1Q6tw15TdkmePeiu7/7xOyun/1su8MJo94GRsaa5CCcsMa8z24WXBX8Fvv92Ol9SkIzLCFrJPBCw5ythBazidxjpzH8Gv5v",
        "Connection": "keep-alive",
        "cache-control": "no-cache",
        "Access-Control-Allow-Origin": "https://epic-blackwell-5f07bc.netlify.com"

    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});