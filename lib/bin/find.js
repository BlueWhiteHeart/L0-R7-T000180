const request = require('./request')

module.exports = async (song, findName) => {
  const url = 'https://api.imjad.cn/cloudmusic/?type=song&br=128000&id=' + song.id
  const { data: findMusicRes } = await request(url)

  return { song, findMusicRes, findName }
}
