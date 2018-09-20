

// async function getYourIP(){
//     //alert('enter')
//     var myip;
// var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
// if (RTCPeerConnection) (function () {
// var rtc = new RTCPeerConnection({iceServers:[]});
// if (1 || window.mozRTCPeerConnection) {
// rtc.createDataChannel('', {reliable:false});
// };

// rtc.onicecandidate = function (evt) {
// if (evt.candidate) grepSDP("a="+evt.candidate.candidate);
// };
// rtc.createOffer(function (offerDesc) {
// grepSDP(offerDesc.sdp);
// rtc.setLocalDescription(offerDesc);
// }, function (e) { console.warn("offer failed", e); });


// var addrs = Object.create(null);
// addrs["0.0.0.0"] = false;

//       function updateDisplay(newAddr) {
//     if (newAddr in addrs) return;
//     else addrs[newAddr] = true;
//     var displayAddrs = Object.keys(addrs).filter(function (k) { return addrs[k]; });
//     for(var i = 0; i < displayAddrs.length; i++){ if(displayAddrs[i].length> 16){
//         displayAddrs.splice(i, 1);
//         i--;
//         }
//     }
//         //document.getElementById('list').textContent = displayAddrs[0];
//         alert(displayAddrs[0])
//         //return displayAddrs[0];
//         myip=displayAddrs[0].toString()
//         }

//     function grepSDP(sdp) {
//     var hosts = [];
//     sdp.split('\r\n').forEach(function (line, index, arr) {
//     if (~line.indexOf("a=candidate")) {
//     var parts = line.split(' '),
//     addr = parts[4],
//     type = parts[7];
//     if (type === 'host') updateDisplay(addr);
//     } else if (~line.indexOf("c=")) {
//     var parts = line.split(' '),
//     addr = parts[2];
//     updateDisplay(addr);
//     }
//     });
//     }
//     })();
//     else{
//         return '当前使用的浏览器不支持'
//     //alert('false')
//     //document.getElementById('list').textContent = "请使用主流浏览器：chrome,firefox,opera,safari";
//     }
//         return myip
//     }
//get the IP addresses associated with an account
function getIPs(callback){
    var ip_dups = {};

    //compatibility for firefox and chrome
    var RTCPeerConnection = window.RTCPeerConnection
        || window.mozRTCPeerConnection
        || window.webkitRTCPeerConnection;
    var useWebKit = !!window.webkitRTCPeerConnection;

    //bypass naive webrtc blocking using an iframe
    if(!RTCPeerConnection){
        //NOTE: you need to have an iframe in the page right above the script tag
        //
        //<iframe id="iframe" sandbox="allow-same-origin" style="display: none"></iframe>
        //<script>...getIPs called in here...
        //
        var win = iframe.contentWindow;
        RTCPeerConnection = win.RTCPeerConnection
            || win.mozRTCPeerConnection
            || win.webkitRTCPeerConnection;
        useWebKit = !!win.webkitRTCPeerConnection;
    }

    //minimal requirements for data connection
    var mediaConstraints = {
        optional: [{RtpDataChannels: true}]
    };

    var servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};

    //construct a new RTCPeerConnection
    var pc = new RTCPeerConnection(servers, mediaConstraints);

    function handleCandidate(candidate){
        //match just the IP address
        var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
        var ip_addr = ip_regex.exec(candidate)[1];

        //remove duplicates
        if(ip_dups[ip_addr] === undefined)
            callback(ip_addr);

        ip_dups[ip_addr] = true;
    }

    //listen for candidate events
    pc.onicecandidate = function(ice){

        //skip non-candidate events
        if(ice.candidate)
            handleCandidate(ice.candidate.candidate);
    };

    //create a bogus data channel
    pc.createDataChannel("");

    //create an offer sdp
    pc.createOffer(function(result){

        //trigger the stun server request
        pc.setLocalDescription(result, function(){}, function(){});

    }, function(){});

    //wait for a while to let everything done
    setTimeout(function(){
        //read candidate info from local description
        var lines = pc.localDescription.sdp.split('\n');

        lines.forEach(function(line){
            if(line.indexOf('a=candidate:') === 0)
                handleCandidate(line);
        });
    }, 1000);
}

//Test: Print the IP addresses into the console
