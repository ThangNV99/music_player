
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')

 const app = {
    currentIndex: 0,
    isPlaying: false,
    songs: [
        {
          name: "Blinding Lights",
          singer: "The Weeknd",
          path: "./music/song1.mp3",
          image: "./img/song1.png"
        },
        {
          name: "Save your tears",
          singer: "The Weeknd",
          path: "./music/song2.mp3",
          image: "./img/song2.png"
        },
        {
          name: "Intentions",
          singer: "Justin Bieber",
          path: "./music/song3.mp3",
          image: "./img/song3.png"
        },
        {
          name: "Sugar",
          singer: "Maroon 5",
          path: "./music/song4.mp4",
          image: "./img/song4.png"
        }
      ],
      render: function() {
        const htmls = this.songs.map(song => {
            return `
            <div class="song">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
        </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('');
      },
      defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
      },
      handleEvents: function() {
        const _this = this
        const cdWidth = cd.offsetWidth

        // Xử lý phóng to / thu nhỏ CD
        document.onscroll = function() { 
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth/cdWidth
        }

        // Xử lý khi click play
        playBtn.onclick = function() {
           if(_this.isPlaying){         
            audio.pause()          
           }
           else{
            audio.play()
           }
        }

        // Khi song play
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
        }
        // Khi song pause
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
        }
        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }
      },
      loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
      },

      starts: function() {
        // Định nghĩa các thuộc tính cho object
        this.defineProperties()

        // Xử lý events
        this.handleEvents()

        // Tải thông tin bài hát đầu
        this.loadCurrentSong()

        // Render danh sách nhạc
        this.render()
      }
 }
 app.starts()
 