import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import {Box} from '@mui/joy';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Alert from '@mui/joy/Alert';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '../images/GoogleIcon';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import axios from "axios";
import { Sheet } from '@mui/joy';

interface FormElements extends HTMLFormControlsCollection {
    name: any;
    email: HTMLInputElement;
    password: HTMLInputElement;
    contactNumber: any;
    address: any;
    organization: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

export default function SignInSide() {
    const navigate = useNavigate();
    const [mountWarning, setWarning] = React.useState(false);
    const [warningMessage, setWarningMessage] = React.useState("There is a warning in user input");
    const [signInPage, setSignInPage] = React.useState(true);

    function storeUserInLocal(userData: any){
        window.localStorage.setItem("currentUser", userData);
    }
    async function handleSignIn(userData: any) {
        try{
            await axios.post('/auth/login', userData);
            let res = await axios.get(`/user/`+userData.email);

            storeUserInLocal(JSON.stringify(res.data))
            navigate("/dashboard")
        } catch(err){
            setWarning(true);
            setWarningMessage("Please enter valid email and password");
            setTimeout(() => {
                setWarning(false);
            }, 5000);
        }
    }

    async function handleSignUp(userData: any) {
        try{
            await axios.post('/user', userData);
            window.location.reload();
        } catch(err:any){
            setWarning(true);
            setWarningMessage(err.response.data.message);
            setTimeout(() => {
                setWarning(false);
            }, 5000);
        }
    }

    return (
        <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    ':root': {
                        '--Collapsed-breakpoint': '769px', // form will stretch when viewport is below `769px`
                        '--Cover-width': '50vw', // must be `vw` only
                        '--Form-maxWidth': '800px',
                        '--Transition-duration': '0.4s', // set to `none` to disable transition
                    },
                }}
            />
            <Box
                sx={(theme) => ({
                    width:
                        'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
                    transition: 'width var(--Transition-duration)',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    backdropFilter: 'blur(12px)',
                    backgroundColor: 'rgba(255 255 255 / 0.2)',
                    [theme.getColorSchemeSelector('dark')]: {
                        backgroundColor: 'rgba(19 19 24 / 0.4)',
                    },
                })}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100dvh',
                        width:
                            'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
                        maxWidth: '100%',
                        px: 2,
                    }}
                >
                    <Box
                        component="header"
                        sx={{
                            py: 3,
                            display: 'flex',
                            alignItems: 'left',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
                            <IconButton variant="soft" color="primary" size="sm">
                                <BadgeRoundedIcon />
                            </IconButton>
                            <Typography level="title-lg">Wipro Limited POC</Typography>
                        </Box>
                        <ColorSchemeToggle />
                    </Box>
                    <Box
                        component="main"
                        sx={{
                            my: 'auto',
                            py: 2,
                            pb: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            width: 400,
                            maxWidth: '100%',
                            mx: 'auto',
                            borderRadius: 'sm',
                            '& form': {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            },
                            [`& .${formLabelClasses.asterisk}`]: {
                                visibility: 'hidden',
                            },
                        }}
                    >

                        <Stack gap={4} sx={{ mb: 2 }}>
                            {signInPage && (<Stack gap={1}>
                                <Typography level="h3">Sign in</Typography>
                                <Typography level="body-sm" onClick={() => { setSignInPage(false) }}>
                                    New to company?{' '}
                                    <Link href="#" level="title-sm">
                                        Sign up!
                                    </Link>
                                </Typography>
                            </Stack>)
                            }
                            {!signInPage && (<Stack gap={1}>
                                <Typography level="h3">Welcome 👋</Typography>
                                <Typography level="body-sm" onClick={() => { setSignInPage(true) }}>
                                    Sign up for an account
                                </Typography>
                            </Stack>)
                            }
                            {
                                mountWarning && (
                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                        <Alert color="warning">{warningMessage}</Alert>
                                    </Stack>
                                )
                            }
                            <Button
                                variant="soft"
                                color="neutral"
                                fullWidth
                                startDecorator={<GoogleIcon />}
                                onClick={() => {
                                    setWarning(true);
                                    setWarningMessage("Please sign up and sign in");
                                    setTimeout(() => {
                                        setWarning(false);
                                    }, 5000);
                                }}
                            >
                                Continue with Google
                            </Button>
                        </Stack>
                        <Divider
                            sx={(theme) => ({
                                [theme.getColorSchemeSelector('light')]: {
                                    color: { xs: '#FFF', md: 'text.tertiary' },
                                    '--Divider-lineColor': {
                                        xs: '#FFF',
                                        md: 'var(--joy-palette-divider)',
                                    },
                                },
                            })}
                        >
                            or
                        </Divider>
                        {signInPage && (
                            <Stack gap={4} sx={{ mt: 2 }}>
                                <form
                                    onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                                        event.preventDefault();
                                        const formElements = event.currentTarget.elements;
                                        const data = {
                                            email: formElements.email.value,
                                            password: formElements.password.value,
                                        };
                                        //   alert(JSON.stringify(data, null, 2));
                                        handleSignIn(data);
                                        // navigate("/dashboard")
                                    }}
                                >
                                    <FormControl required>
                                        <FormLabel>Email</FormLabel>
                                        <Input type="email" name="email" />
                                    </FormControl>
                                    <FormControl required>
                                        <FormLabel>Password</FormLabel>
                                        <Input type="password" name="password" />
                                    </FormControl>
                                    <Stack gap={4} sx={{ mt: 2 }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Checkbox size="sm" label="Remember me" name="persistent" />
                                            <Link level="title-sm" href="#PleaseContactOrgAdmin">
                                                Forgot your password?
                                            </Link>
                                        </Box>
                                        <Button type="submit" fullWidth>
                                            Sign in
                                        </Button>
                                    </Stack>
                                </form>
                            </Stack>)}
                        {!signInPage && (
                            <Stack gap={4} sx={{ mt: 2 }}>
                                <form
                                    onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                                        event.preventDefault();
                                        const formElements = event.currentTarget.elements;
                                        const data = {
                                            name: formElements.name.value,
                                            emailId: formElements.email.value,
                                            password: formElements.password.value,
                                            organization: formElements.organization.value,
                                        };
                                        //   alert(JSON.stringify(data, null, 2));
                                        handleSignUp(data);
                                        // navigate("/dashboard")
                                    }}
                                >
                                    <FormControl required>
                                        <FormLabel>Name</FormLabel>
                                        <Input type="text" name="name" />
                                    </FormControl>
                                    <FormControl required>
                                        <FormLabel>Email</FormLabel>
                                        <Input type="email" name="email" />
                                    </FormControl>
                                    <FormControl required>
                                        <FormLabel>Password</FormLabel>
                                        <Input type="password" name="password" />
                                    </FormControl>
                                    <FormControl required>
                                        <FormLabel>Organization</FormLabel>
                                        <Input type="text" name="organization" />
                                    </FormControl>
                                    <Stack gap={4} sx={{ mt: 2 }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                        </Box>
                                        <Button type="submit" fullWidth>
                                            Create account
                                        </Button>
                                    </Stack>
                                </form>
                                <Stack gap={1}>
                                    <Typography level="body-sm" onClick={() => { setSignInPage(true) }}>
                                        Already have an account?{' '}
                                        <Link href="#" level="title-sm">
                                            Sign in
                                        </Link>
                                    </Typography>
                                </Stack>
                            </Stack>
                        )}
                    </Box>
                    <Box component="footer" sx={{ py: 3 }}>
                        <Typography level="body-xs" textAlign="center">
                            © Wipro Limited {new Date().getFullYear()}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={(theme) => ({
                    height: '100%',
                    position: 'fixed',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    left: 'clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))',
                    transition:
                        'background-image var(--Transition-duration), left var(--Transition-duration) !important',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    backgroundColor: 'background.level1',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage:
                        'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
                    [theme.getColorSchemeSelector('dark')]: {
                        backgroundImage:
                            'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
                    },
                })}
            />
        </CssVarsProvider>
    );
}