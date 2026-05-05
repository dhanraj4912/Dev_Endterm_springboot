import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined'

const drawerWidth = 260

const nav = [
  { label: 'Dashboard', to: '/dashboard', icon: <DashboardOutlinedIcon /> },
  { label: 'Product Catalog', to: '/catalog', icon: <Inventory2OutlinedIcon /> },
  { label: 'Order History', to: '/orders', icon: <ReceiptLongOutlinedIcon /> },
  { label: 'Retailer Management', to: '/retailers', icon: <PeopleAltOutlinedIcon /> },
  { label: 'Inventory & Pricing', to: '/inventory', icon: <LocalOfferOutlinedIcon /> },
  { label: 'Credit Limits', to: '/credit', icon: <CreditCardOutlinedIcon /> },
]

const footerNav = [
  { label: 'Settings', to: '/settings', icon: <SettingsOutlinedIcon /> },
  { label: 'Support', to: '/support', icon: <SupportAgentOutlinedIcon /> },
]

export function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid',
            borderColor: 'divider',
            bgcolor: '#fff',
          },
        }}
      >
        <Box sx={{ px: 2.5, py: 2 }}>
          <Typography variant="overline" sx={{ letterSpacing: 1.2, color: 'text.secondary' }}>
            B2B WHOLESALE
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            Admin Control Panel
          </Typography>
        </Box>
        <Divider />
        <List sx={{ px: 1.25, py: 1 }}>
          {nav.map((item) => (
            <ListItemButton
              key={item.to}
              selected={location.pathname === item.to}
              onClick={() => navigate(item.to)}
              sx={{ borderRadius: 2, mb: 0.5 }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>

        <Box sx={{ flex: 1 }} />

        <Box sx={{ px: 1.25, pb: 1 }}>
          {footerNav.map((item) => (
            <ListItemButton
              key={item.to}
              selected={location.pathname === item.to}
              onClick={() => navigate(item.to)}
              sx={{ borderRadius: 2, mb: 0.5 }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
          <Box sx={{ px: 1, pt: 1 }}>
            <Button
              fullWidth
              variant="contained"
              color="inherit"
              sx={{
                bgcolor: '#0B1220',
                color: '#fff',
                textTransform: 'none',
                py: 1,
                borderRadius: 2.25,
                '&:hover': { bgcolor: '#0B1220' },
              }}
              onClick={() => navigate('/auth')}
            >
              Switch to Retailer
            </Button>
          </Box>
        </Box>
      </Drawer>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{ bgcolor: '#F7F8FA', borderBottom: '1px solid', borderColor: 'divider' }}
        >
          <Toolbar sx={{ gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 1.5,
                py: 0.75,
                borderRadius: 999,
                bgcolor: '#fff',
                border: '1px solid',
                borderColor: 'divider',
                width: 'min(720px, 100%)',
              }}
            >
              <SearchIcon fontSize="small" color="action" />
              <InputBase
                placeholder="Search products, SKUs, or retailers…"
                sx={{ flex: 1, fontSize: 14 }}
              />
            </Box>

            <Box sx={{ flex: 1 }} />

            <Button
              variant="contained"
              onClick={() => navigate('/checkout')}
              sx={{ textTransform: 'none', borderRadius: 999 }}
            >
              Create Order
            </Button>
            <IconButton>
              <NotificationsNoneIcon />
            </IconButton>
            <Avatar sx={{ width: 32, height: 32 }}>JD</Avatar>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

