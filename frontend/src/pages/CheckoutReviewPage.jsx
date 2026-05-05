import { useMemo, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api.js'

function fmtINR(n) {
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n)
  } catch {
    return `₹${n}`
  }
}

export function CheckoutReviewPage() {
  const navigate = useNavigate()
  const [items, setItems] = useState([
    { sku: 'QNT-992-W', name: 'Quantum Series Smartwatch - Bulk Pack', unit: 12500, qty: 5 },
    { sku: 'APX-AU3-B', name: 'Apex Audio Gen‑3 Headphones', unit: 8000, qty: 10 },
    { sku: 'CLS-HRT-BR', name: 'Classic Heritage Edition Watch', unit: 5500, qty: 10 },
  ])
  const [warehouse, setWarehouse] = useState('Bhiwandi Main Hub (Z-401)')
  const [payment, setPayment] = useState('pay_now')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.unit * i.qty, 0),
    [items],
  )
  const freight = 4200
  const gst = Math.round(subtotal * 0.18)
  const total = subtotal + freight + gst

  const creditLimit = 200000
  const currentDue = 110000
  const wouldExceed = currentDue + total > creditLimit

  async function placeOrder() {
    setBusy(true)
    setError('')
    try {
      await api.orders.placeOrder({
        items,
        warehouse,
        payment,
        total,
      })
      navigate('/order-success')
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        Checkout & Review
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
        Review your bulk order and manage payment terms.
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.6fr 1fr' }, gap: 2 }}>
        <Card variant="outlined" sx={{ borderRadius: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                Order Items ({items.length})
              </Typography>
              <Button size="small" sx={{ textTransform: 'none' }} onClick={() => setItems([])}>
                Clear All
              </Button>
            </Box>
            <Divider sx={{ mb: 1.5 }} />

            <Box sx={{ display: 'grid', gap: 1.25 }}>
              {items.map((it) => (
                <Box
                  key={it.sku}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: 1.5,
                    p: 1.25,
                    borderRadius: 2.5,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 800 }}>{it.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      SKU: {it.sku} • Unit Price: {fmtINR(it.unit)}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <TextField
                      size="small"
                      type="number"
                      value={it.qty}
                      onChange={(e) => {
                        const q = Math.max(0, Number(e.target.value || 0))
                        setItems((s) => s.map((x) => (x.sku === it.sku ? { ...x, qty: q } : x)))
                      }}
                      sx={{ width: 90, mb: 0.5 }}
                    />
                    <Typography sx={{ fontWeight: 900 }}>{fmtINR(it.unit * it.qty)}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
              Shipping Destination
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 1.25 }}>
              <TextField
                size="small"
                label="Warehouse Location"
                value={warehouse}
                onChange={(e) => setWarehouse(e.target.value)}
              />
              <TextField
                size="small"
                label="Expected Delivery"
                value="October 24, 2023 (Standard Freight)"
                disabled
              />
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ display: 'grid', gap: 2 }}>
          <Card variant="outlined" sx={{ borderRadius: 3, bgcolor: '#0B1220', color: '#fff' }}>
            <CardContent>
              <Typography variant="overline" sx={{ opacity: 0.8 }}>
                Account Credit Status
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 900 }}>
                Global Retail Corp
              </Typography>
              <Box sx={{ mt: 1.5, display: 'grid', gap: 0.75 }}>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Credit Limit: {fmtINR(creditLimit)}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Current Due: {fmtINR(currentDue)}
                </Typography>
              </Box>
              {wouldExceed ? (
                <Box sx={{ mt: 1, p: 1, borderRadius: 2, bgcolor: 'rgba(255,90,90,0.18)' }}>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    LIMIT EXCEEDED
                  </Typography>
                </Box>
              ) : null}
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 900, mb: 1 }}>
                Order Summary
              </Typography>
              <Box sx={{ display: 'grid', gap: 0.75 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Subtotal ({items.reduce((s, i) => s + i.qty, 0)} units)
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>
                    {fmtINR(subtotal)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Logistics & Freight
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>
                    {fmtINR(freight)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    GST (18%)
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>
                    {fmtINR(gst)}
                  </Typography>
                </Box>
                <Divider sx={{ my: 0.5 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>
                    Total Payable
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>
                    {fmtINR(total)}
                  </Typography>
                </Box>
              </Box>

              {wouldExceed ? (
                <Alert severity="error" sx={{ mt: 1.5 }}>
                  Credit Limit Exceeded. Your current due plus this order exceeds your credit limit.
                </Alert>
              ) : null}

              <Divider sx={{ my: 1.5 }} />

              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800 }}>
                SELECT PAYMENT TYPE
              </Typography>
              <RadioGroup value={payment} onChange={(e) => setPayment(e.target.value)}>
                <FormControlLabel
                  value="credit"
                  control={<Radio />}
                  label="CREDIT (Net‑30)"
                  disabled={wouldExceed}
                />
                <FormControlLabel
                  value="pay_now"
                  control={<Radio />}
                  label="PAY NOW (Instant Settlement)"
                />
              </RadioGroup>

              {error ? (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {error}
                </Alert>
              ) : null}

              <Button
                fullWidth
                variant="contained"
                disabled={busy || items.length === 0}
                onClick={placeOrder}
                sx={{ mt: 1, textTransform: 'none', borderRadius: 2.5 }}
              >
                Place Order
              </Button>
              <Button fullWidth variant="outlined" sx={{ mt: 1, textTransform: 'none', borderRadius: 2.5 }}>
                Download Proforma Invoice
              </Button>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                Orders are subject to internal compliance and stock availability at time of payment.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  )
}

