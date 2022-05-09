# souge

## [项目说明]

K7-L0-R7 命令行版本搜索网易云音乐，选中指定歌曲下载到本地默认文件夹中，如果已经下载过，不会重复下载

---

## [细节]

- 把选中的 MP3 点击回车后，下载到本地的一个 music 目录，并展示文件的下载进度
- 细节：文件(夹)是否存在检查/规避文件重复创建/文件写入进度提醒

---

## 使用说明

安装依赖，关联指令

```sh
npm i && npm link
```

---

## 指令说明

```shell
$ souge --help

  Usage:
    souge [songName]

  Options:
    -v, --version    print the version of souge
    -h, --help       display this message

  Examples:
    $ souge Hello
```

## 项目结构说明

```sh
$ tree -I node_modules
.
├── bin                                         # 项目指令文件夹
│   └── souge                                   # 项目指令实现
├── index.js                                    # 项目主功能入口
├── lib                                         # 项目处理类文件夹
│   ├── choose.js                               # 选择歌曲处理代码文件
│   ├── download-file.js                        # 选择歌曲处理代码文件
│   ├── download.js                             # 选择歌曲处理代码文件
│   ├── find.js                                 # 选择歌曲处理代码文件
│   ├── names.js                                # 选择歌曲处理代码文件
│   ├── request.js                              # 选择歌曲处理代码文件
│   └── search.js                               # 选择歌曲处理代码文件
│   └── print.js                                # 版本和帮助指令输出代码文件
├── package-lock.json                           # 项目 lock 依赖版本说明
├── package.json                                # 项目依赖和版本相关说明
├── .gitignore                                  # 项目 git 提交忽略文件说明
└── README.md                                   # 项目通用说明

2 directories, 14 files
```

---

## 项目使用技术

- [imjad API](https://api.imjad.cn/cloudmusic.md)
- [cloudmusic API](https://musicapi.leanapp.cn)
- [inquirer](https://www.npmjs.com/package/inquirer)

---

## 项目效果截图

```shell
souge hello
? 共有 100 个结果, 按下回车下载 (Use arrow keys)
❯ 1. Hello -[ Adele ]-「Hello」
  2. Hello -[ 黄龄 ]-「醉」
  3. Hello -[ Barbara Opsomer ]-「Hello」
  4. Hello -[ OMFG ]-「Hello」
  5. Hello -[ 王霏霏（Fei） ]-「Hello」
  6. Hello (录音室版) -[ 萧敬腾 ]-「Hello (录音室版)」
  7. Hello -[ LiL GoDD ]-「Hypnotize」
(Move up and down to reveal more choices)
```


---

## License

ISC

---
