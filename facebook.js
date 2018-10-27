//https://lorenstewart.me/2017/03/12/using-node-js-to-interact-with-facebooks-graph-api/

const request = require('request-promise');

window.fbAsyncInit = function() {
    FB.init({
        appId            : '1636022613170950',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v3.2'
    })
}

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

FB.api(
    "/nicugo/",
    function (response) {
      if (response && !response.error) {
        console.log(response)
      }
    }
);