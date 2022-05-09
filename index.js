const { log } = console
// names 是拼接歌曲名称的一个方法
const names = require('./lib/names')
const EventEmitter = require('events')
// 声明一个继承 EventEmitter 的事件类
class Emitter extends EventEmitter { }
// 实例化一个事件实例
const emitter = new Emitter()

;[
  'print',
  'search',
  'choose',
  'find',
  'download'
].forEach(key => {
  // 加载 search/choose/find/play 四个模块方法
  const fn = require(`./lib/${key}`)
  // 为 emitter 增加 4 个事件监听，key 就是模块名
  emitter.on(key, async function (...args) {
    // 在事件回调里面，调用模块方法，无脑传入事件入参
    const res = await fn(...args)
    // 执行模块方法后，再触发一个新事件 hanlder
    // 同时把多个参数，如 key/res 继续丢过去
    this.emit('handler', key, res, ...args)
  })
})

// 搜索后触发 afterSearch，它回调里面继续触发 choose 事件
emitter.on('afterSearch', function (searchMusicData, searchName) {
  if (!searchMusicData || !searchMusicData.result || !searchMusicData.result.songs) {
    log(`没搜索到 ${searchName} 的相关结果`)
    return process.exit(1)
  }
  const songs = searchMusicData.result.songs
  this.emit('choose', songs)
})

// 在歌曲被选中后，它回调里面继续触发 find 事件
emitter.on('afterChoose', function (answers, songs) {
  const filterMusicList = songs.filter((song, i) => (
    names(song, i) === answers.song
  ))
  if (filterMusicList[0] && filterMusicList[0].id) {
    this.emit('find', filterMusicList[0], answers.song)
  }
})

// 在歌曲被确认后，它回调里面触发下载事件
emitter.on('afterFind', function ({ song, findMusicRes, findName }) {
  if (findMusicRes[0] && findMusicRes[0].url) {
    this.emit('download', { song, findMusic: findMusicRes[0], findName })
  } else {
    log('当前歌曲下载地址有误，请重新选择！')
  }
})

// 收到下载结束，退出程序
emitter.on('downloadEnd', function () {
  log('下载结束!')
  process.exit()
})

// 这里的 handler 精简了多个事件的判断
// 为不同的事件增加了不同的触发回调
emitter.on('handler', function (key, res, ...args) {
  switch (key) {
    case 'search':
      return this.emit('afterSearch', res, args[0])
    case 'choose':
      return this.emit('afterChoose', res, args[0])
    case 'find':
      return this.emit('afterFind', res)
    case 'download':
      return this.emit('downloadEnd', res)
  }
})

module.exports = emitter
