import { Box, Button, Card, CardContent, Divider, Typography } from '@mui/material'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import { useNavigate } from 'react-router-dom'

export function OrderSuccessPage() {
  const navigate = useNavigate()

  return (
    <Box>
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <CheckCircleOutlineOutlinedIcon color="success" />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>
              Order Placed Successfully
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your order has been confirmed and is being processed.
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }} />
          <Button variant="outlined" sx={{ textTransform: 'none', borderRadius: 999 }} onClick={() => navigate('/catalog')}>
            Continue Shopping
          </Button>
        </CardContent>
      </Card>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.6fr 1fr' }, gap: 2, mt: 2 }}>
        <Card variant="outlined" sx={{ borderRadius: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <Box>
                <Typography variant="overline" color="text.secondary">
                  Invoice Summary
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                  #INV-8829104
                </Typography>
              </Box>
              <Button variant="text" sx={{ textTransform: 'none' }}>
                Download PDF
              </Button>
            </Box>
            <Divider sx={{ my: 1.5 }} />
            <Typography variant="body2" color="text.secondary">
              This screen is ready to be fed by the backend response from <code>POST /orders</code>.
              Right now it shows mock invoice details.
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ borderRadius: 3, bgcolor: '#0B1220', color: '#fff' }}>
          <CardContent>
            <Typography variant="overline" sx={{ opacity: 0.8 }}>
              Payment Method
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 900 }}>
              Net 30 Credit
            </Typography>
            <Divider sx={{ my: 1.5, borderColor: 'rgba(255,255,255,0.18)' }} />
            <Typography variant="overline" sx={{ opacity: 0.8 }}>
              Delivery Details
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Standard Freight
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Expected by Oct 24, 2023
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Warehouse North‑4, Chicago, IL
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

