// REDO
// const key_url = "https://randomstreamerinfo.pages.dev/bitmovin_player_key.txt"
const key_url = "https://github.com/PH4NTOM-3NCOD3R/RandomStreamerInfo/raw/main/bitmovin_player_key.txt"

const playlistURI = "raw.githubusercontent.com/PH4NTOM-3NCOD3R/WebStreamTest/main"
// const skel = "https://github.com/PH4NTOM-3NCOD3R/RandomStreamerInfo/raw/main/bitmovin_skel.html"
const skel = "https://randomstreamerinfo.pages.dev/bitmovin_skel.html"
//const epinfo = "https://github.com/PH4NTOM-3NCOD3R/RandomStreamerInfo/raw/main/episode_data_dummy.txt"
const epinfo = "https://github.com/PH4NTOM-3NCOD3R/RandomStreamerInfo/raw/main/episode_data_dummy.json"

/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
async function gatherResponse(response) {
  const { headers } = response
  const contentType = headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    return JSON.stringify(await response.json())
  }
  else {
    return response.text()
  }
}

async function handleRequest() {
  const init = {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  }
  const initJ = {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  }
  const response = await fetch(key_url)
  const results = await gatherResponse(response)
  const result = results.replace("\n", "")
  console.log("Player Key", result)

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Bitmovin Demo</title>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet">
    <link rel="icon" type="image/png" href="//cdn.jsdelivr.net/gh/bitmovin/bitmovin-player-web-samples@main/images/bit-fav.png">
    <!-- Bitmovin Player -->
    <script type="text/javascript" src="//cdn.bitmovin.com/player/web/8/bitmovinplayer.js"></script>
    <script type="text/javascript" src="//cdn.jsdelivr.net/gh/bitmovin/bitmovin-player-web-samples@main/keyboard/PlayerKeyboardControl.js"></script>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Open Sans', sans-serif;
            color: #fff;
            font-weight: 300;
            background: rgba(44, 131, 185, 1);
            background: -moz-linear-gradient(left, rgba(44, 131, 185, 1) 0%, rgba(30, 171, 227, 1) 100%);
            background: -webkit-gradient(left top, right top, color-stop(0%, rgba(44, 131, 185, 1)), color-stop(100%, rgba(30, 171, 227, 1)));
            background: -webkit-linear-gradient(left, rgba(44, 131, 185, 1) 0%, rgba(30, 171, 227, 1) 100%);
            background: -o-linear-gradient(left, rgba(44, 131, 185, 1) 0%, rgba(30, 171, 227, 1) 100%);
            background: -ms-linear-gradient(left, rgba(44, 131, 185, 1) 0%, rgba(30, 171, 227, 1) 100%);
            background: linear-gradient(to right, rgba(44, 131, 185, 1) 0%, rgba(30, 171, 227, 1) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#2c83b9', endColorstr='#1eabe3', GradientType=1);
        }
        #wrapper {
            background: url(//cdn.jsdelivr.net/gh/bitmovin/bitmovin-player-web-samples@main/images/logo-bg-demopage.png);
            height: 100vh;
        }
        #banner {
            border-bottom: 1px solid #fff;
            background-color: #1eabe3;
            width: 100%
        }
        #banner h1 {
            margin: 0;
            padding: 30px;
        }
        .logo {
            padding: 10px;
            width: 25%;
            min-width: 350px;
            float: left;
            margin: auto;
        }
        .title {
            width: 75%;
            white-space: nowrap;
        }

        .clear {
            clear: both;
        }

        .content {
            margin-bottom: 10em;
        }

        h1, h2, h3, p {
            font-weight: 300;
            text-align: center;
            margin: 40px;
        }
        #player {
            max-width: 900px;
            width: 90%;
            margin: auto;
            -webkit-box-shadow: 0px 0px 56px 0px rgba(0, 0, 0, 0.75);
            -moz-box-shadow: 0px 0px 56px 0px rgba(0, 0, 0, 0.75);
            box-shadow: 0px 0px 56px 0px rgba(0, 0, 0, 0.75);
        }
        a {
            color: #97d9ef;
            font-weight: 400;
            text-decoration: none;
        }
        a:hover {
            color: #fff;
        }
        .bmpui-ui-watermark {
            display: none;
         }
        @media (max-width: 800px) {
            .logo {
                width: 100%;
            }
            .title {
                display: none;
            }
        }
    </style>
</head>
<body>
<div id="wrapper">
    <div id="banner">
        <div class="logo"><img src="//cdn.jsdelivr.net/gh/bitmovin/bitmovin-player-web-samples@main/images/bitmovin-logo.png"></div>
        <div class="title"><h1>Simple Playlist</h1></div>
        <div class="clear"></div>
    </div>
    <div class="container">
        <h1>HTML5 Adaptive Streaming Player for MPEG-DASH & HLS</h1>
        <h2>Your videos play everywhere with low startup delay, no buffering and in highest quality.</h2>
        <div class="content">
            <div class="player-wrapper">
                <div id="player"></div>
            </div>
            <div class="description">
                <p>For more information about the bitmovin player, please have a look at our online <a
                        href="//bitmovin.com/support" target="_blank">Developer Section</a>.</p>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    var playlist = [
        {
            "name": "Minions",
            "dash": "//${playlistURI}/master.mpd",
            "hls": "//${playlistURI}/master.m3u8"
        }
    ];
    var i = 0;
    var conf = {
        // key: "143ba410-225b-447d-b7ed-420d6b7fcd33",
        key: "${result}",
        playback: {
            autoplay: false,
            muted: false
        },
        tweaks : {
            autoqualityswitching : true,
            max_buffer_level     : 10,
            timeShiftBufferDepth : 10,
            stop_download_on_pause : true
        },
        buffer: {
            video: {
                forwardduration: 10,
                backwardduration: 20,
            },
            audio: {
                 forwardduration: 10,
                 backwardduration: 20,
            },
        },
        events: {
            playbackfinished: function () {
                if (i < playlist.length) {
                    player.load({dash: playlist[i].dash, hls: playlist[i].hls});
                    console.log('now playing ' + playlist[i].name);
                    i++;
                }
            },
            ready: function () {
                if (i > 0) {
                    player.play();
                }
            }
        }
    };
    var source = {
        dash: "//${playlistURI}/master.mpd",
        hls: "//${playlistURI}/master.m3u8"
    };
    var player = new bitmovin.player.Player(document.getElementById("player"), conf);
    player.load(source).then(function () {
        console.log('Successfully loaded source');
    }, function () {
        console.log('Error while loading source');
    });
    // bind the keyboard control to the player instance
    new PlayerKeyboardControl(player);
</script>
</body>
</html>`

  return new Response(html, init)
}

addEventListener("fetch", event => {
  return event.respondWith(handleRequest())
})
