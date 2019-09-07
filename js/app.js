var url = "../assests/cartodb-query.geojson";


fetch(url).then(function (res) {
  return res.json();
})
.then(function (data) {
  console.log(data.causes.underPrivilagedYouth.causeName);
  updatePortfolio(data);
  updateModal(data);

});
