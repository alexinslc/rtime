function getVideoId() {
  var videoUrl = $('#video-url').val();
  videoId = videoUrl.split('v=')
  console.log(videoId[1]);
}
