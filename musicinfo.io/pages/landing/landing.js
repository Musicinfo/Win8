(function () {
    "use strict";

   // var app = WinJS.Application;
   // var activation = Windows.ApplicationModel.Activation;
    //var nav = WinJS.Navigation;
    //var session = WinJS.Application.sessionState;
    //var util = WinJS.Utilities;

    //app.onactivated = function (args) {
    //    if (args.detail.kind === activation.ActivationKind.launch) {
    //        if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
    //            // TODO: This application has been newly launched. Initialize
    //            // your application here.
    //        } else {
    //            // TODO: This application has been reactivated from suspension.
    //            // Restore application state here.
    //        }

            WinJS.UI.Pages.define("/pages/landing/landing.html", {
                // This function is called whenever a user navigates to this page. It
                // populates the page elements with the app's data.
                ready: function (element, options) {
                  //  var item = Data.resolveItemReference(options.item);
                   // element.querySelector(".titlearea .pagetitle").textContent = item.title;

                    // TODO: Initialize the page here.

            var queryD = document.getElementById("queryDiv");
            var resP = document.getElementById("queryResult");

            //document.addEventListener("DOMContentLoaded", function () {
            WinJS.Utilities.ready(function () {
                var strQuery = document.getElementById("searchQuery");
                strQuery.addEventListener("keyup", makeSearchQuery);
            }, false);

            function makeSearchQuery(e) {
                var query = "http://musicinfo.io/json/v1/search/?query=" + e.target.value;
                resP.innerText = e.target.value;
                WinJS.xhr({
                    url: query
                }).then(
                    function completed(result) {
                        if (result.status === 200) {
                            console.log(JSON.stringify(result.response));
                            var resultJson = JSON.parse(result.response);
                            //document.getElementById("aritstDiv").innerText = JSON.stringify(resultJson.artist.results);
                            var artists = resultJson.artist.results;
                            //document.getElementById("artistDiv").removeChild("ul");
                            var artistL = document.createElement("ul");
                            var sts = "";

                            for (var a in artists) {
                                var artistNode = document.createElement("li");
                                artistNode.appendChild(document.createTextNode(artists[a].name));
                                artistL.appendChild(artistNode);
                                //console.log(artists[a].name);
                                if (artists[a].image != undefined) {
                                    if (artists[a].image.sq != undefined) {
                                        sts += '<img src="' + artists[a].image.sq + '"/>' + artists[a].name + '<br />';
                                    }
                                    //else {
                                    //    sts += '<img src="/images/artist.png"/ >' + artists[a].name + '<br />';
                                    //}
                                } else {
                                    sts += '<img src="/images/artist.png" width="125px" height="125px" />' + artists[a].name + '<br />';
                                }

                                //document.getElementById("artistUl").appendChild("li") = artists[a].name;

                            }
                            //document.getElementById("artistDiv").appendChild(artistL);
                            document.getElementById("aritstDiv").innerHTML = sts.toString();
                            document.getElementById("recordingDiv").innerText = JSON.stringify(resultJson.recording.results);
                            document.getElementById("releaseDiv").innerText = JSON.stringify(resultJson.release.results);
                        }
                    },
                    function error(result) {
                        console.log(result.message);
                    },
                    function progress(result) {
                        console.log("progressing");
                        //queryD.innerText = "progressing";
                    }
                );
            }
        }
     });

})();
    //    }
    //};
    //    app.oncheckpoint = function (args) {
            // TODO: This application is about to be suspended. Save any state
            // that needs to persist across suspensions here. You might use the
            // WinJS.Application.sessionState object, which is automatically
            // saved and restored across suspension. If you need to complete an
            // asynchronous operation before your application is suspended, call
            // args.setPromise().
    //    };

    //    app.start();
