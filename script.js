$(function () {
  const playerTrack = $("#player-track");
  const bgArtwork = $("#player-bg-artwork");
  const albumName = $("#album-name");
  const trackName = $("#track-name");
  const albumArt = $("#album-art");
  const sArea = $("#seek-bar-container");
  const seekBar = $("#seek-bar");
  const trackTime = $("#track-time");
  const seekTime = $("#seek-time");
  const sHover = $("#s-hover");
  const playPauseButton = $("#play-pause-button");
  const tProgress = $("#current-time");
  const tTime = $("#track-length");
  const playPreviousTrackButton = $("#play-previous");
  const playNextTrackButton = $("#play-next");
  const albums = ["Dark Academia"];
  const trackNames = [
    "Golden Brown - The Stranglers",
    "Army dreamers - Kate Bush",
    "Wicked game - Chris Isaak",
    "Love Story - Indila",
    "MKY - Malice Mizer",
    "Soldier Poet King - The Oh Hellos",
    "Caribbean Blue - Enya",
    "Once upon - Lana Del Rey",
    "Enjoy the Silence - DepecheMode",
    "After Dark - Mr.Kitty",
    "Sex, Drugs, etc. - Beach Weather",
    "Aegen - Malice Mizer",
    "Who is She ? - I Monster",
    "Headlock - Imogen Heap",
    "Dream in Sea - Miracle Musical",
    "Calm Night - Kino",
    "Homage - Mild High Club",
    "Hijo de la Luna - Mecano",
    "Hide - Dorian Concept",
    "Kingdom Dance - Tangled",
    "Let us Adore You - SU",
    "Andromeda - Weyes Blood"
  ];
  const albumArtworks = ["_1", "_2", "_3", "_4", "_5", "_6", "_7", "_8", "_9", "_10", "_11", "_12", "_13", "_14", "_15", "_16", "_17", "_18", "_19", "_20", "_21", "_22"];
  const trackUrl = [
    "https://audio.jukehost.co.uk/hVsVWGP3u412FESr6Xy7coQcXdLQK7eE.mp3",
    "https://audio.jukehost.co.uk/yjlcB5ngYNhuXvkcJyNXzBLbPCpLRCXU.mp3",
    "https://audio.jukehost.co.uk/PcZWkaihwJ20ljYxiHStpN4ukEzvtRif.mp3",
    "https://audio.jukehost.co.uk/kZuBwSEdm6NXuf89OyWXgu1QjwIAAEGt.mp3",
    "https://audio.jukehost.co.uk/wqBql9SO4fIZG1nkPPxBkF1YjlbCime2.mp3",
    "https://audio.jukehost.co.uk/qnjBve5HwN9l88eTR56RvqWqh26kwEpx.mp3",
    "https://audio.jukehost.co.uk/NRyrVB73enAFVUEtmWgxmIESW5c4afph.mp3",
    "https://audio.jukehost.co.uk/9oyntM3vdyVj0cdNkoB5lHWg2MqFiJ5p.mp3",
    "https://audio.jukehost.co.uk/kJqqhrdHFjoC6Db38YgzXh5KHMwthDrO.mp3",
    "https://audio.jukehost.co.uk/hQs4UZgjBd33OhKFvVvV01969h0KDTv0.mp3",
    "https://audio.jukehost.co.uk/n2CIINuDuu3QYJH7eTGAgwKigqv4YLyL.mp3",
    "https://audio.jukehost.co.uk/zOGAfnOgqc3dUd6zPWY6YiHeVqgDbs9X.mp3",
    "https://audio.jukehost.co.uk/HWlV9q8f0exf6QwqnQsh1nXB0bGd7fYK.mp3",
    "https://audio.jukehost.co.uk/LAPeTQx0i390bdYDfmGOA5GrFPfUU8Ay.mp3",
    "https://audio.jukehost.co.uk/LxVZROqS1lVx1XBYy07F4xMyK21W1RPz.mp3",
    
    "https://audio.jukehost.co.uk/01a0b5ff-e5c3-72d6-b262-aea9859d61f2.mp3",
    
    "https://audio.jukehost.co.uk/01a0b5fe-8fd7-7203-bfca-fa66bd878d5f.mp3",
    
    "https://audio.jukehost.co.uk/01a0b601-52a8-718d-a311-bdf6397965c0.mp3",
    
    "https://audio.jukehost.co.uk/01a0b606-8d62-73e3-974c-271aca329984.mp3",
    
    "https://audio.jukehost.co.uk/01a0b606-8c41-732f-83c3-e77d5e75ead7.mp3",
    
    "https://audio.jukehost.co.uk/01a0b607-fcf1-707b-b176-e59bc3175a7e.mp3",
    
    "https://audio.jukehost.co.uk/01a0b609-a716-70f7-8e25-e3bda6d77932.mp3"
  ];

  let bgArtworkUrl,
    i = playPauseButton.find("i"),
    seekT,
    seekLoc,
    seekBarPos,
    cM,
    ctMinutes,
    ctSeconds,
    curMinutes,
    curSeconds,
    durMinutes,
    durSeconds,
    playProgress,
    bTime,
    nTime = 0,
    buffInterval = null,
    tFlag = false,
    currIndex = -1;

  function playPause() {
    setTimeout(function () {
      if (audio.paused) {
        playerTrack.addClass("active");
        albumArt.addClass("active");
        checkBuffering();
        i.attr("class", "fas fa-pause");
        audio.play();
      } else {
        playerTrack.removeClass("active");
        albumArt.removeClass("active");
        clearInterval(buffInterval);
        albumArt.removeClass("buffering");
        i.attr("class", "fas fa-play");
        audio.pause();
      }
    }, 300);
  }

  function showHover(event) {
    seekBarPos = sArea.offset();
    seekT = event.clientX - seekBarPos.left;
    seekLoc = audio.duration * (seekT / sArea.outerWidth());

    sHover.width(seekT);

    cM = seekLoc / 60;

    ctMinutes = Math.floor(cM);
    ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

    if (ctMinutes < 0 || ctSeconds < 0) return;

    if (ctMinutes < 0 || ctSeconds < 0) return;

    if (ctMinutes < 10) ctMinutes = "0" + ctMinutes;
    if (ctSeconds < 10) ctSeconds = "0" + ctSeconds;

    if (isNaN(ctMinutes) || isNaN(ctSeconds)) seekTime.text("--:--");
    else seekTime.text(ctMinutes + ":" + ctSeconds);

    seekTime.css({ left: seekT, "margin-left": "-21px" }).fadeIn(0);
  }

  function hideHover() {
    sHover.width(0);
    seekTime
      .text("00:00")
      .css({ left: "0px", "margin-left": "0px" })
      .fadeOut(0);
  }

  function playFromClickedPos() {
    audio.currentTime = seekLoc;
    seekBar.width(seekT);
    hideHover();
  }

  function updateCurrTime() {
    nTime = new Date();
    nTime = nTime.getTime();

    if (!tFlag) {
      tFlag = true;
      trackTime.addClass("active");
    }

    curMinutes = Math.floor(audio.currentTime / 60);
    curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

    durMinutes = Math.floor(audio.duration / 60);
    durSeconds = Math.floor(audio.duration - durMinutes * 60);

    playProgress = (audio.currentTime / audio.duration) * 100;

    if (curMinutes < 10) curMinutes = "0" + curMinutes;
    if (curSeconds < 10) curSeconds = "0" + curSeconds;

    if (durMinutes < 10) durMinutes = "0" + durMinutes;
    if (durSeconds < 10) durSeconds = "0" + durSeconds;

    if (isNaN(curMinutes) || isNaN(curSeconds)) tProgress.text("00:00");
    else tProgress.text(curMinutes + ":" + curSeconds);

    if (isNaN(durMinutes) || isNaN(durSeconds)) tTime.text("00:00");
    else tTime.text(durMinutes + ":" + durSeconds);

    if (
      isNaN(curMinutes) ||
      isNaN(curSeconds) ||
      isNaN(durMinutes) ||
      isNaN(durSeconds)
    )
      trackTime.removeClass("active");
    else trackTime.addClass("active");

    seekBar.width(playProgress + "%");

    if (playProgress == 100) {
      i.attr("class", "fa fa-play");
      seekBar.width(0);
      tProgress.text("00:00");
      albumArt.removeClass("buffering").removeClass("active");
      clearInterval(buffInterval);
    }
  }

  function checkBuffering() {
    clearInterval(buffInterval);
    buffInterval = setInterval(function () {
      if (nTime == 0 || bTime - nTime > 1000) albumArt.addClass("buffering");
      else albumArt.removeClass("buffering");

      bTime = new Date();
      bTime = bTime.getTime();
    }, 100);
  }

  function selectTrack(flag) {
    if (flag == 0 || flag == 1) ++currIndex;
    else --currIndex;

    if (currIndex > -1 && currIndex < albumArtworks.length) {
      if (flag == 0) i.attr("class", "fa fa-play");
      else {
        albumArt.removeClass("buffering");
        i.attr("class", "fa fa-pause");
      }

      seekBar.width(0);
      trackTime.removeClass("active");
      tProgress.text("00:00");
      tTime.text("00:00");

      currAlbum = albums[currIndex];
      currTrackName = trackNames[currIndex];
      currArtwork = albumArtworks[currIndex];

      audio.src = trackUrl[currIndex];

      nTime = 0;
      bTime = new Date();
      bTime = bTime.getTime();

      if (flag != 0) {
        audio.play();
        playerTrack.addClass("active");
        albumArt.addClass("active");

        clearInterval(buffInterval);
        checkBuffering();
      }

      albumName.text(currAlbum);
      trackName.text(currTrackName);
      albumArt.find("img.active").removeClass("active");
      $("#" + currArtwork).addClass("active");

      bgArtworkUrl = $("#" + currArtwork).attr("src");

      bgArtwork.css({ "background-image": "url(" + bgArtworkUrl + ")" });
    } else {
      if (flag == 0 || flag == 1) --currIndex;
      else ++currIndex;
    }
  }

  function initPlayer() {
    audio = new Audio();

    selectTrack(0);

    audio.loop = false;

    playPauseButton.on("click", playPause);

    sArea.mousemove(function (event) {
      showHover(event);
    });

    sArea.mouseout(hideHover);

    sArea.on("click", playFromClickedPos);

    $(audio).on("timeupdate", updateCurrTime);

    playPreviousTrackButton.on("click", function () {
      selectTrack(-1);
    });
    playNextTrackButton.on("click", function () {
      selectTrack(1);
    });
      
  }

  initPlayer();
});