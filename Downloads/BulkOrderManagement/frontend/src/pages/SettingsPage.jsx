import { Box, Card, CardContent, Typography } from '@mui/material'

export function SettingsPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
        Configure application preferences.
      </Typography>
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Settings UI placeholder (ready for backend integration).
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

