import Express, { json } from 'express'
import { Maa } from '@maa/loader'

const app = Express()
app.use(json())

app.get('/api/version', (req, res) => {
  res.send({
    success: true,
    data: {
      version: Maa.version()
    }
  })
})

app.listen(8080, () => {
  console.log('Server listen on 8080')
})
