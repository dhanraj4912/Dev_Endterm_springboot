import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from '@mui/material'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined'
import { api } from '../lib/api.js'

function statusChip(status) {
  if (status === 'DELIVERED') return { label: 'Delivered', color: 'success' }
  if (status === 'IN_TRANSIT') return { label: 'In Transit', color: 'info' }
  if (status === 'ARCHIVED') return { label: 'Archived', color: 'default' }
  return { label: status, color: 'default' }
}

export function OrderHistoryPage() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const list = await api.orders.list()
      if (!mounted) return
      setOrders(list)
    })()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            Order Placed Successfully
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Review and manage your past inventory acquisitions.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<FilterAltOutlinedIcon />}
          sx={{ textTransform: 'none', borderRadius: 999 }}
        >
          Filters
        </Button>
        <Button
          variant="outlined"
          startIcon={<DownloadOutlinedIcon />}
          sx={{ textTransform: 'none', borderRadius: 999 }}
        >
          Export
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} lg={7}>
          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Invoice Summary
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                #INV-8829104
              </Typography>
              <Divider sx={{ mb: 1.5 }} />
              <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Item Details
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'right' }}>
                  Quantity
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'right' }}>
                  Unit Price
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'right' }}>
                  Amount
                </Typography>
              </Box>
              <Box sx={{ mt: 1, display: 'grid', gap: 1 }}>
                {[
                  { name: 'Pro‑Core Industrial Drill Kit', sku: 'PC-DRL-002', qty: 12, unit: 145, amt: 1740 },
                  { name: 'Titanium Replacement Bits (Set of 10)', sku: 'BIT-TIT-99', qty: 50, unit: 12.5, amt: 625 },
                  { name: 'Heavy‑Duty Workbench Mat', sku: 'MAT-HD-101', qty: 5, unit: 89, amt: 445 },
                ].map((it) => (
                  <Box
                    key={it.sku}
                    sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 1, alignItems: 'center' }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>{it.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        SKU: {it.sku}
                      </Typography>
                    </Box>
                    <Typography sx={{ textAlign: 'right' }}>{it.qty}</Typography>
                    <Typography sx={{ textAlign: 'right' }}>${it.unit.toFixed(2)}</Typography>
                    <Typography sx={{ textAlign: 'right', fontWeight: 800 }}>${it.amt.toFixed(2)}</Typography>
                  </Box>
                ))}
              </Box>
              <Divider sx={{ my: 1.5 }} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box sx={{ width: 260 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Subtotal
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      $2,810.00
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Tax (8.5%)
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      $238.85
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                      Total
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>
                      $3,048.85
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Card variant="outlined" sx={{ borderRadius: 3, bgcolor: '#0B1220', color: '#fff' }}>
            <CardContent>
              <Typography variant="overline" sx={{ opacity: 0.8 }}>
                Payment Method
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 900 }}>
                Net 30 Credit
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                Terms: 30 Days Post‑Invoice
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Credit limit utilization
              </Typography>
              <Box sx={{ mt: 1, height: 8, borderRadius: 999, bgcolor: 'rgba(255,255,255,0.18)', overflow: 'hidden' }}>
                <Box sx={{ width: '62%', height: '100%', bgcolor: 'rgba(255,255,255,0.85)' }} />
              </Box>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                $12,604 remaining of $30,000
              </Typography>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ borderRadius: 3, mt: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
                Order History
              </Typography>
              <Divider sx={{ mb: 1.5 }} />

              <Box sx={{ display: 'grid', gap: 1 }}>
                {orders.slice(0, 4).map((o) => {
                  const chip = statusChip(o.status)
                  return (
                    <Box
                      key={o.id}
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '1.1fr 1fr 1fr 0.8fr 1fr auto',
                        gap: 1,
                        alignItems: 'center',
                        p: 1.25,
                        borderRadius: 2.5,
                        border: '1px solid',
                        borderColor: 'divider',
                        bgcolor: '#fff',
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 800 }}>
                        {o.id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {o.date}
                      </Typography>
                      <Chip size="small" label={chip.label} color={chip.color} />
                      <Typography variant="body2" color="text.secondary">
                        {o.items} items
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 800 }}>
                        ${o.total.toLocaleString()}
                      </Typography>
                      <Button
                        size="small"
                        variant="contained"
                        color="inherit"
                        startIcon={<ReplayOutlinedIcon />}
                        sx={{ bgcolor: '#0B1220', color: '#fff', textTransform: 'none', borderRadius: 2 }}
                      >
                        Quick Reorder
                      </Button>
                    </Box>
                  )
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

