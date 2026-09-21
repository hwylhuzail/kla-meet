FRONTEND FIX: Your Pay button should call:
fetch('/api/pesapal/order', {method:'POST', body: JSON.stringify({email, amount:13.51, currency:'USD'})})
.then(r=>r.json())
.then(data=>{ if(data.redirect_url) window.location.href=data.redirect_url; else alert(data.error) })
