export default function handler(req,res){
  const { order } = req.query
  return res.redirect(302, `/?premium=success&order=${order}`)
}
