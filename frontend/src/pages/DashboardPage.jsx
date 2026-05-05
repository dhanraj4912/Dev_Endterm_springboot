import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { StatCard } from '../components/StatCard.jsx'

export function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
        Monitor registrations, inventory signals, and credit exposure.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <StatCard label="Pending Approvals" value="12" hint="+3 today" />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard label="Active Retailers" value="1,248" />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard label="Total Credit Exposure" value="$2.4M" />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard label="Overdue Payments" value="$142,000" hint="High Risk" tone="danger" />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 0.5 }}>
        <Grid item xs={12} md={8}>
          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 650, mb: 1 }}>
                What’s next
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Use the left navigation to manage products, inventory tiers, retailer approvals, and
                credit limits. The UI is wired to an API client that can be pointed at your Spring
                Boot backend via <code>VITE_API_BASE_URL</code>.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 650, mb: 1 }}>
                Retailer Support
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Need bulk custom quotes? Contact account manager.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

