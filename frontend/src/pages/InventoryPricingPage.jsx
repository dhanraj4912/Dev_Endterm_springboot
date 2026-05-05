import { useMemo, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

function money(n) {
  return n === '' || n == null ? '' : `$${Number(n).toFixed(2)}`
}

export function InventoryPricingPage() {
  const [productName, setProductName] = useState('')
  const [sku, setSku] = useState('')
  const [basePrice, setBasePrice] = useState('')
  const [stockLevel, setStockLevel] = useState('')
  const [moq, setMoq] = useState('')
  const [tiers, setTiers] = useState([
    { min: 100, max: 499, price: '' },
    { min: 500, max: null, price: '' },
  ])

  const activeCatalog = useMemo(
    () => [
      {
        name: 'Titanium Valve X‑2',
        sku: 'TV-802',
        stock: 4250,
        moq: 100,
        basePrice: 145,
        tiers: ['500+ $132.00', '1k+ $121.00', '5k+ $118.00'],
      },
      {
        name: 'High‑Torque DC Motor',
        sku: 'MOT-771-H',
        stock: 85,
        moq: 10,
        basePrice: 892.5,
        tiers: ['No Tiers Defined'],
      },
      {
        name: 'Optical Sensor Array',
        sku: 'OPT-X01-22',
        stock: 12900,
        moq: 500,
        basePrice: 12.4,
        tiers: ['2.5k+ $10.15', '10k+ $8.90'],
      },
      {
        name: 'Embedded Controller V5',
        sku: 'CTL-622-Z',
        stock: 540,
        moq: 10,
        basePrice: 42.0,
        tiers: ['100+ $38.00'],
      },
    ],
    [],
  )

  function addTier() {
    setTiers((t) => [...t, { min: '', max: null, price: '' }])
  }

  function removeTier(idx) {
    setTiers((t) => t.filter((_, i) => i !== idx))
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            Inventory & Pricing Manager
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Configure bulk wholesale tiers and product availability.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<DownloadOutlinedIcon />}
          sx={{ textTransform: 'none', borderRadius: 999 }}
        >
          Export CSV
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Add New Product
              </Typography>

              <Typography variant="caption" color="text.secondary">
                Product Name
              </Typography>
              <TextField
                size="small"
                fullWidth
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Industrial Grade Steel Bearing"
                sx={{ mt: 0.5, mb: 1.5 }}
              />

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.25 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    SKU
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="SKU GEN AUTO"
                    sx={{ mt: 0.5, mb: 1.5 }}
                  />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Stock Level
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    value={stockLevel}
                    onChange={(e) => setStockLevel(e.target.value)}
                    placeholder="Units"
                    sx={{ mt: 0.5, mb: 1.5 }}
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.25 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Base Price (USD)
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                    placeholder="$ 0.00"
                    sx={{ mt: 0.5, mb: 1.5 }}
                    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                  />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Minimum Order Quantity (MOQ)
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    value={moq}
                    onChange={(e) => setMoq(e.target.value)}
                    placeholder="Minimum units"
                    sx={{ mt: 0.5, mb: 1.5 }}
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  Define Pricing Tiers
                </Typography>
                <Button size="small" startIcon={<AddOutlinedIcon />} onClick={addTier} sx={{ textTransform: 'none' }}>
                  Add Row
                </Button>
              </Box>

              <Box sx={{ display: 'grid', gap: 1 }}>
                {tiers.map((t, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '1.2fr 1.2fr 1fr auto',
                      gap: 1,
                      alignItems: 'center',
                    }}
                  >
                    <TextField
                      size="small"
                      placeholder="Qty min"
                      value={t.min}
                      onChange={(e) =>
                        setTiers((s) => s.map((x, i) => (i === idx ? { ...x, min: e.target.value } : x)))
                      }
                    />
                    <Select
                      size="small"
                      value={t.max == null ? 'plus' : String(t.max)}
                      onChange={(e) => {
                        const v = e.target.value === 'plus' ? null : Number(e.target.value)
                        setTiers((s) => s.map((x, i) => (i === idx ? { ...x, max: v } : x)))
                      }}
                    >
                      <MenuItem value="plus">500+</MenuItem>
                      <MenuItem value="499">Up to 499</MenuItem>
                      <MenuItem value="999">Up to 999</MenuItem>
                    </Select>
                    <TextField
                      size="small"
                      placeholder="Price/Unit"
                      value={t.price}
                      onChange={(e) =>
                        setTiers((s) => s.map((x, i) => (i === idx ? { ...x, price: e.target.value } : x)))
                      }
                      InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                    />
                    <IconButton onClick={() => removeTier(idx)}>
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2, textTransform: 'none', borderRadius: 2.5, bgcolor: '#0B1220', '&:hover': { bgcolor: '#0B1220' } }}
                onClick={() => {
                  setProductName('')
                  setSku('')
                  setBasePrice('')
                  setStockLevel('')
                  setMoq('')
                  setTiers([{ min: 100, max: 499, price: '' }, { min: 500, max: null, price: '' }])
                }}
              >
                Save Product & Tiers
              </Button>

              <Card variant="outlined" sx={{ borderRadius: 3, mt: 2, bgcolor: 'rgba(11,95,255,0.08)', borderColor: 'rgba(11,95,255,0.25)' }}>
                <CardContent>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Pricing Strategy Tip
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Consider setting a 15% discount for orders exceeding 5,000 units to incentivize enterprise retailers.
                  </Typography>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  Active Catalog
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Showing 4 of 128 products
                </Typography>
              </Box>
              <Divider sx={{ mb: 1.5 }} />

              <Box sx={{ display: 'grid', gap: 1.25 }}>
                {activeCatalog.map((p) => (
                  <Card key={p.sku} variant="outlined" sx={{ borderRadius: 3 }}>
                    <CardContent sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: 1.5, alignItems: 'center' }}>
                      <Box>
                        <Typography sx={{ fontWeight: 700 }}>{p.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          SKU: {p.sku}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Stock / MOQ
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {p.stock} / {p.moq}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Base Price
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {money(p.basePrice)}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Pricing Tiers
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {p.tiers[0]}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <IconButton>
                          <EditOutlinedIcon />
                        </IconButton>
                        <IconButton>
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

