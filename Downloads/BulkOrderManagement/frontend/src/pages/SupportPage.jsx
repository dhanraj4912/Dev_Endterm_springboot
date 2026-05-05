import { Box, Card, CardContent, Typography } from '@mui/material'

export function SupportPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        Support
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
        Contact and help resources.
      </Typography>
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Support UI placeholder (add ticketing/contact workflow here).
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

