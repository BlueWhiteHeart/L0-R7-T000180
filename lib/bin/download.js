const fs = require('fs')
const downloadFile = require('./download-file.js')
const path = require('path')
const { log } = console

module.exports = async ({ song, findMusic, findName }) => {
  const musicPath = path.resolve(process.cwd(), './', 'music')
  // 如果文件夹不存在，则直接创建
  if (!fs.existsSync(musicPath)) {
    fs.mkdirSync(musicPath)
  }
  const mp3FilePath = path.join(musicPath, `${findName.replace(/\d\./g, '')}-${findMusic.id}.mp3`)

  if (!fs.existsSync(mp3FilePath)) {
    log(`开始下载 [${song.name}]  ...`)
    await downloadFile(findMusic.url, mp3FilePath)
    return findMusic
  } else {
    log(`[${song.name}] 已下载过啦 ...`)
  }
}
