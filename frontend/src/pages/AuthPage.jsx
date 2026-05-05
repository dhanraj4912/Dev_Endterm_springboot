import { useMemo, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Link,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api.js'

function Field({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="caption" sx={{ display: 'block', mb: 0.5, color: 'text.secondary' }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
      />
    </Box>
  )
}

export function AuthPage() {
  const [tab, setTab] = useState(0)
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  const [fullName, setFullName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [gstNumber, setGstNumber] = useState('')

  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState(null)
  const [pendingApplication, setPendingApplication] = useState(null)

  const navigate = useNavigate()

  const leftText = useMemo(
    () => [
      'Access exclusive bulk pricing and manage your inventory with our professional‑grade commerce platform. Built for reliable high‑volume trading.',
      'Global Inventory Management',
      'Flexible Credit Limits',
      'Verified Retailer Network',
    ],
    [],
  )

  async function onSignIn() {
    setPending(true)
    setMessage(null)
    try {
      await api.auth.signIn({ email: signInEmail, password: signInPassword })
      navigate('/dashboard')
    } catch (e) {
      setMessage(e.message)
    } finally {
      setPending(false)
    }
  }

  async function onApply() {
    setPending(true)
    setMessage(null)
    try {
      const res = await api.auth.registerRetailer({ fullName, businessName, gstNumber })
      setPendingApplication(res)
    } catch (e) {
      setMessage(e.message)
    } finally {
      setPending(false)
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
      <Box
        sx={{
          position: 'relative',
          display: { xs: 'none', md: 'flex' },
          alignItems: 'flex-end',
          p: 4,
          color: '#fff',
          backgroundImage:
            'linear-gradient(180deg, rgba(10,20,30,0.4), rgba(10,20,30,0.85)), url(https://images.unsplash.com/photo-1590608897129-79da98d15969?auto=format&fit=crop&w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box sx={{ maxWidth: 520 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Wholesale
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mb: 3 }}>
            {leftText[0]}
          </Typography>
          <Box sx={{ display: 'grid', gap: 1.25 }}>
            {leftText.slice(1).map((t) => (
              <Typography key={t} variant="body2" sx={{ opacity: 0.9 }}>
                • {t}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
        <Box sx={{ width: 'min(520px, 100%)' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            Retailer Access
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Sign in or apply for a wholesale account.
          </Typography>

          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 0 }}>
              <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ px: 2, pt: 1 }}>
                <Tab label="Sign In" />
                <Tab label="Register" />
              </Tabs>
              <Divider />
              <Box sx={{ p: 2.5 }}>
                {message ? (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {message}
                  </Alert>
                ) : null}

                {tab === 0 ? (
                  <>
                    <Field
                      label="Email Address"
                      value={signInEmail}
                      onChange={setSignInEmail}
                      placeholder="e.g. buyer@retailcorp.com"
                    />
                    <Field
                      label="Password"
                      value={signInPassword}
                      onChange={setSignInPassword}
                      placeholder="••••••••"
                      type="password"
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                      <Link component="button" variant="body2" onClick={() => setMessage('Password reset not wired yet.')}>
                        Forgot?
                      </Link>
                    </Box>

                    <Button
                      fullWidth
                      variant="contained"
                      disabled={pending}
                      onClick={onSignIn}
                      sx={{ textTransform: 'none', borderRadius: 2 }}
                    >
                      Sign In to Portal
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Become a Retailer
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Apply for a wholesale partnership.
                    </Typography>

                    <Field
                      label="Full Name"
                      value={fullName}
                      onChange={setFullName}
                      placeholder="Authorized Personnel"
                    />
                    <Field
                      label="Business Name"
                      value={businessName}
                      onChange={setBusinessName}
                      placeholder="Registered Company Name"
                    />
                    <Field
                      label="GST Number"
                      value={gstNumber}
                      onChange={setGstNumber}
                      placeholder="Tax Identification Number"
                    />
                    <Button
                      fullWidth
                      variant="outlined"
                      disabled={pending}
                      onClick={onApply}
                      sx={{ textTransform: 'none', borderRadius: 2 }}
                    >
                      Submit Application
                    </Button>
                  </>
                )}
              </Box>
            </CardContent>
          </Card>

          {pendingApplication ? (
            <Card variant="outlined" sx={{ borderRadius: 3, mt: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  Registration Pending Approval
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your application is currently under review by our compliance team. Reviews typically
                  take {pendingApplication.etaHours} business hours.
                </Typography>
              </CardContent>
            </Card>
          ) : null}

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3, color: 'text.secondary' }}>
            <Link component="button" variant="caption" onClick={() => setMessage('Support not wired yet.')}>
              Support
            </Link>
            <Link component="button" variant="caption" onClick={() => setMessage('Terms not wired yet.')}>
              Terms
            </Link>
            <Link component="button" variant="caption" onClick={() => setMessage('Privacy not wired yet.')}>
              Privacy
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

