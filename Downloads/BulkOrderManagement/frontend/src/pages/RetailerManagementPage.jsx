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
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { api } from '../lib/api.js'
import { StatCard } from '../components/StatCard.jsx'

function statusChip(status) {
  if (status === 'PENDING') return { label: 'Pending', color: 'warning' }
  if (status === 'APPROVED') return { label: 'Approved', color: 'success' }
  if (status === 'REJECTED') return { label: 'Rejected', color: 'default' }
  return { label: status, color: 'default' }
}

export function RetailerManagementPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    let mounted = true
    ;(async () => {
      setLoading(true)
      const list = await api.retailers.list()
      if (!mounted) return
      setRows(list)
      setLoading(false)
    })()
    return () => {
      mounted = false
    }
  }, [])

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase()
    if (!q) return rows
    return rows.filter(
      (r) => r.name.toLowerCase().includes(q) || r.gst.toLowerCase().includes(q),
    )
  }, [rows, filter])

  const pendingCount = rows.filter((r) => r.status === 'PENDING').length
  const activeCount = rows.filter((r) => r.status === 'APPROVED').length
  const exposure = rows.reduce((sum, r) => sum + (r.currentDue || 0), 0)
  const overdue = rows.filter((r) => r.currentDue > r.creditLimit).reduce((sum, r) => sum + r.currentDue, 0)

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            Retailer Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Review registrations and monitor credit exposure across your distribution network.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<FilterAltOutlinedIcon />}
          sx={{ textTransform: 'none', borderRadius: 999 }}
        >
          Filter
        </Button>
        <Button
          variant="outlined"
          startIcon={<DownloadOutlinedIcon />}
          sx={{ textTransform: 'none', borderRadius: 999 }}
        >
          Export Data
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={3}>
          <StatCard label="Pending Approvals" value={String(pendingCount)} hint="+3 today (mock)" />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard label="Active Retailers" value={String(activeCount)} />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard label="Total Credit Exposure" value={`$${exposure.toLocaleString()}`} />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard label="Overdue Payments" value={`$${overdue.toLocaleString()}`} hint="High Risk" tone="danger" />
        </Grid>
      </Grid>

      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1.5 }}>
            <TextField
              size="small"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search retailers, GSTIN, or regions…"
              fullWidth
            />
            <Typography variant="caption" color="text.secondary">
              {loading ? 'Loading…' : `Showing ${Math.min(filtered.length, 5)} of ${filtered.length} retailers`}
            </Typography>
          </Box>
          <Divider sx={{ mb: 1.5 }} />

          <Box sx={{ display: 'grid', gap: 1 }}>
            {filtered.slice(0, 5).map((r) => {
              const chip = statusChip(r.status)
              const overLimit = r.creditLimit > 0 && r.currentDue > r.creditLimit
              return (
                <Card key={r.id} variant="outlined" sx={{ borderRadius: 3 }}>
                  <CardContent
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr 1fr 1fr 1fr' },
                      gap: 1.25,
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>{r.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Registered 2h ago (mock)
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        GST Number
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {r.gst}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Status
                      </Typography>
                      <Box sx={{ mt: 0.25 }}>
                        <Chip size="small" label={chip.label} color={chip.color} />
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Credit Limit
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        ${r.creditLimit.toLocaleString()}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Current Due
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 800, color: overLimit ? 'error.main' : 'text.primary' }}
                      >
                        ${r.currentDue.toLocaleString()}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      {r.status === 'PENDING' ? (
                        <>
                          <Button
                            size="small"
                            variant="contained"
                            sx={{ textTransform: 'none', borderRadius: 2 }}
                            onClick={async () => {
                              await api.retailers.approve(r.id)
                              setRows((s) => s.map((x) => (x.id === r.id ? { ...x, status: 'APPROVED' } : x)))
                            }}
                          >
                            Approve
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            sx={{ textTransform: 'none', borderRadius: 2 }}
                            onClick={async () => {
                              await api.retailers.reject(r.id)
                              setRows((s) => s.map((x) => (x.id === r.id ? { ...x, status: 'REJECTED' } : x)))
                            }}
                          >
                            Reject
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="small"
                            variant="text"
                            sx={{ textTransform: 'none' }}
                            onClick={() => {
                              const next = window.prompt('Set credit limit (USD):', String(r.creditLimit))
                              if (next == null) return
                              const value = Number(next)
                              if (Number.isNaN(value)) return
                              setRows((s) => s.map((x) => (x.id === r.id ? { ...x, creditLimit: value } : x)))
                              api.retailers.setCreditLimit(r.id, value).catch(() => {})
                            }}
                          >
                            Edit Credit Limit
                          </Button>
                          <IconButton size="small">
                            <EditOutlinedIcon fontSize="small" />
                          </IconButton>
                        </>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              )
            })}
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

