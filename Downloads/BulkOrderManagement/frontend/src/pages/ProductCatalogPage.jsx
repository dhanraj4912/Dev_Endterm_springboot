import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined'
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { api } from '../lib/api.js'

function fmtINR(n) {
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n)
  } catch {
    return `₹${n}`
  }
}

function inStockBadge(product) {
  if (product.availableStock <= 0) return { label: 'OUT OF STOCK', color: 'default' }
  if (product.availableStock < product.moq) return { label: 'LOW STOCK', color: 'warning' }
  return { label: 'IN STOCK', color: 'success' }
}

function unitPriceForQty(product, qty) {
  const tier = product.tiers.find((t) => qty >= t.minQty && (t.maxQty == null || qty <= t.maxQty))
  return tier ? tier.price : product.basePrice
}

export function ProductCatalogPage() {
  const [products, setProducts] = useState([])
  const [qtyBySku, setQtyBySku] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      setLoading(true)
      const list = await api.products.list()
      if (!mounted) return
      setProducts(list)
      const initial = {}
      for (const p of list) initial[p.id] = p.moq
      setQtyBySku(initial)
      setLoading(false)
    })()
    return () => {
      mounted = false
    }
  }, [])

  const cartValue = useMemo(() => {
    return products.reduce((sum, p) => {
      const qty = qtyBySku[p.id] || 0
      if (qty < p.moq) return sum
      return sum + unitPriceForQty(p, qty) * qty
    }, 0)
  }, [products, qtyBySku])

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            Product Catalog
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and order high‑velocity inventory with real‑time tiered pricing.
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
          Export Price List
        </Button>
      </Box>

      <Grid container spacing={2}>
        {products.map((p) => {
          const badge = inStockBadge(p)
          const qty = qtyBySku[p.id] ?? p.moq
          const unitPrice = unitPriceForQty(p, qty)
          const subtotal = unitPrice * qty

          return (
            <Grid item xs={12} lg={6} key={p.id}>
              <Card variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <Grid container>
                  <Grid item xs={12} sm={5}>
                    <Box
                      sx={{
                        height: { xs: 220, sm: 260 },
                        backgroundImage: `url(${p.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <CardContent sx={{ p: 2.25 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, mb: 1 }}>
                        <Chip size="small" label={badge.label} color={badge.color} />
                        <Typography variant="caption" color="text.secondary">
                          Base Price
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                        <Box>
                          <Typography variant="overline" color="text.secondary">
                            {p.category} • SKU: {p.id}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.15 }}>
                            {p.name}
                          </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>
                          {fmtINR(p.basePrice)}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          MOQ
                          <br />
                          <b>{p.moq}</b> Units
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Available Stock
                          <br />
                          <b>{p.availableStock}</b> Units
                        </Typography>
                      </Box>

                      <Divider sx={{ my: 1.75 }} />

                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                        TIERED PRICING SCHEDULE
                      </Typography>
                      <Box sx={{ mt: 1, display: 'grid', gap: 0.75 }}>
                        {p.tiers.map((t) => (
                          <Box
                            key={`${p.id}-${t.minQty}`}
                            sx={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 1fr',
                              gap: 1,
                              px: 1.25,
                              py: 0.9,
                              borderRadius: 2,
                              bgcolor: t.price === unitPrice ? 'rgba(11,95,255,0.08)' : 'transparent',
                              border: '1px solid',
                              borderColor: 'divider',
                            }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              {t.minQty}–{t.maxQty ?? '∞'}
                            </Typography>
                            <Typography variant="body2" sx={{ textAlign: 'right', fontWeight: 700 }}>
                              {fmtINR(t.price)}
                            </Typography>
                          </Box>
                        ))}
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, mt: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            Order Quantity (Min {p.moq})
                          </Typography>
                          <TextField
                            size="small"
                            value={qty}
                            onChange={(e) =>
                              setQtyBySku((s) => ({ ...s, [p.id]: Number(e.target.value || 0) }))
                            }
                            type="number"
                            inputProps={{ min: 0, step: 1 }}
                            fullWidth
                            sx={{ mt: 0.5 }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <IconButton
                                    size="small"
                                    onClick={() =>
                                      setQtyBySku((s) => ({ ...s, [p.id]: Math.max(0, (s[p.id] || 0) - 1) }))
                                    }
                                  >
                                    <RemoveOutlinedIcon fontSize="small" />
                                  </IconButton>
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    size="small"
                                    onClick={() =>
                                      setQtyBySku((s) => ({ ...s, [p.id]: (s[p.id] || 0) + 1 }))
                                    }
                                  >
                                    <AddOutlinedIcon fontSize="small" />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                          {qty < p.moq ? (
                            <Typography variant="caption" color="warning.main" sx={{ display: 'block', mt: 0.5 }}>
                              Below MOQ & stock rules may apply
                            </Typography>
                          ) : null}
                        </Box>
                        <Box sx={{ width: 160, textAlign: 'right' }}>
                          <Typography variant="caption" color="text.secondary">
                            Subtotal
                          </Typography>
                          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                            {fmtINR(subtotal)}
                          </Typography>
                        </Box>
                        <Button
                          variant="contained"
                          startIcon={<AddShoppingCartOutlinedIcon />}
                          disabled={qty < p.moq || p.availableStock < qty || loading}
                          sx={{ textTransform: 'none', borderRadius: 2.5, px: 2 }}
                        >
                          Add to Cart
                        </Button>
                      </Box>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Current Cart Value
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5 }}>
                {fmtINR(cartValue)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Saved via tiered pricing (mock)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Available Credit
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5 }}>
                ₹1,45,00,000
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                65% limit reached (mock)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

