import { Box, Card, CardContent, Typography } from '@mui/material'

export function CreditLimitsPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        Credit Limits
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
        Configure retailer credit terms and monitor utilization.
      </Typography>

      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This page is ready to connect to Spring Boot. Wire it to endpoints like:
            <br />
            <code>GET /retailers</code>, <code>PUT /retailers/:id/credit-limit</code>, and credit utilization summaries.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

