var express = require('express');
const cookieParser = require('cookie-parser');
var router = express.Router();
let { User } = require('../models/User');
let { Board } = require('../models/Board');
let { Comment } = require('../models/Comment');
let { auth } = require('../middleware/auth');

function getCurrentDate() {
  var date = new Date();

  var year = date.getFullYear();
  var month = date.getMonth();
  var today = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var milliseconds = date.getMilliseconds();

  return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds))
}

router.post('/user/register', (req, res) => {
  //회원가입 할때 필요한 정보들을 받으면
  //그것들을 db에 넣어준다.
  const user = new User(req.body)
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({ success: true })
  })
})


router.post('/user/login', (req, res) => {
  //요청된 아이디를 데이터베이스에서 있는지 찾는다.
  User.findOne({ id: req.body.id }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 ID에 해당하는 유저가 없습니다."
      })
    }
    //요청된 아이디가 데이터베이스에 있다면 비밀번호가 맞는지 확인

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다."
        })
      //비밀번호까지 맞다면 토큰을 생성한다.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다.
        res.cookie("x_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user.id
        })
      })
    })
  })
})

router.get('/user/auth', auth, (req, res) => {

  //여기 까지 미들웨어를 통과해 왔다는 얘기는 AUthentication이 true
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    id: req.user.id,
    email: req.user.email
  })
})

router.get('/user/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true
    })
  })
})

router.post('/user/write', auth, (req, res) => {
  const board = new Board(req.body)
  board.board_writer = req.user.id;
  board.board_date = getCurrentDate();
  board.save((err, board) => {
    console.log(board)
    if (err) return res.json({ success: false, err })
    return res.status(200).json({ success: true })
  })
})

router.post('/user/find', (req, res) => {
  User.find({ email: req.body.email }, (err, user) => {
    if (err) return res.json({ success: false, message: "존재하지 않는 이메일 입니다." });
    const userInfo = user[0]
    return res.json(userInfo)
  })
})


//정방향으로 출력
// router.get('/user/list', (req, res) => {
//   Board.find({}, (err, list) => {
//     if (err) return res.json({ message: "데이터가 없습니다." });
//     return res.json(list);
//   })
// })

//날짜순으로 출력
router.get('/user/list', (req, res) => {
  Board.find().sort({ board_date: -1 }).exec(function (err, list) {
    if (err) return res.json({ message: "데이터가 없습니다." });
    return res.json(list);
  })
})

router.post('/user/read', (req, res) => {
  Board.findOne({ _id: req.body }, (err, user) => {
    if (err) return res.json({ success: false, message: "존재하지 않는 게시판 입니다." });
    return res.json(user)
  })
})

router.post('/user/delete', (req, res) => {
  Board.deleteOne({ _id: req.body._id }, (err, del) => {
    if (err) return res.json({ success: false, message: "존재하지 않는 글 입니다." })
    return res.json(del)
  })
})

router.post('/user/update', (req, res) => {
  Board.findOne({ _id: req.body._id }, (err, update) => {
    if (err) return res.json({ success: false, message: "수정 실패" })

    if (req.body.board_name) update.board_name = req.body.board_name;
    if (req.body.board_content) update.board_content = req.body.board_content;
    if (req.body.board_date) update.board_date = getCurrentDate();
    if (req.body.board_writer) update.board_writer = req.body.board_writer;

    update.save(function (err) {
      if (err) res.status(500).json({ err: 'failed to update' });
      return res.status(200).json({ success: true })
    })
  })
})

router.post('/user/commentWrite', auth, (req, res) => {
  const comment = new Comment(req.body)
  comment.comment_date = getCurrentDate();
  console.log(comment.comment_date)
  comment.save((err, comment) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({ success: true })
  })
})

router.get('/user/commentList', (req, res) => {
  Comment.find().sort({ board_date: -1 }).exec(function (err, list) {
    if (err) return res.json({ message: "데이터가 없습니다." });
    return res.json(list);
  })
})

router.post('/user/commentDelete', (req, res) => {
  Comment.deleteOne({ _id: req.body._id }, (err, del) => {
    if (err) return res.json({ success: false, message: "failed" })
    return res.json(del)
  })
})

router.post('/user/commentUpdate', (req, res) => {
  Comment.findOne({ _id: req.body._id }, (err, update) => {
    if (req.body.comment_content) update.comment_content = req.body.comment_content;

    if (err) return res.json({ success: false, message: "수정 실패" })
    update.save(function (err) {
      if (err) res.status(500).json({ err: 'failed to update' });
      return res.status(200).json({ success: true })
    })
  })
})

router.post('/user/deleteBoardToComment', (req, res) => {
  Comment.deleteMany({ board_num: req.body._id }, (err, del) => {
    if (err) return res.json({ success: false, message: "failed" })
    return res.json(del)
  })
})

module.exports = router;