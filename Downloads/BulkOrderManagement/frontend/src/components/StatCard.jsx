import { Card, CardContent, Typography } from '@mui/material'

export function StatCard({ label, value, hint, tone = 'default' }) {
  const color =
    tone === 'danger' ? 'error.main' : tone === 'success' ? 'success.main' : 'text.primary'

  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="overline" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h5" sx={{ mt: 0.5, color }}>
          {value}
        </Typography>
        {hint ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {hint}
          </Typography>
        ) : null}
      </CardContent>
    </Card>
  )
}

