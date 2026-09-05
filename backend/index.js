const express = require('express')
const cors = require('cors')
const multer = require('multer')

const app = express()
const port = process.env.PORT || 3000
const upload = multer({ storage: multer.memoryStorage() })

app.use(cors())

app.get('/', (req, res) => {
  res.json({ status: 'ok' })
})

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ status: 'error', message: 'Nenhum arquivo enviado' })
  }

  const content = req.file.buffer.toString('utf-8')
  const lines = content.split(/\r?\n/).filter(Boolean)

  res.json({
    status: 'ok',
    filename: req.file.originalname,
    size: req.file.size,
    lineCount: lines.length,
  })
})

app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}`)
})
