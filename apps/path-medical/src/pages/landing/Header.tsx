import {
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Container,
  createStyles,
  Divider,
  Drawer,
  Group,
  Header as MantineHeader,
  HoverCard,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBook,
  IconChartPie3,
  IconChevronDown,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconNotification,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/Logo';

const useStyles = createStyles((theme) => ({
  logoButton: {
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background as string,
        0.95
      ),
    },
  },

  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.gray[7],
    fontSize: theme.fontSizes.xl,

    [theme.fn.smallerThan('sm')]: {
      height: 42,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} 2rem`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]}`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

const mockdata = [
  {
    icon: IconCode,
    title: 'Digital Pathology',
    description: 'Access your images anywhere at anytime',
  },
  {
    icon: IconCoin,
    title: 'Simple Fees',
    description: 'Pay for what you use at competitive rates',
  },
  {
    icon: IconFingerprint,
    title: 'Secure',
    description: 'Secure data storage with 2-factor authentication',
  },
  {
    icon: IconBook,
    title: 'Documentation',
    description: 'Simple solution that you can support yourself',
  },
  {
    icon: IconNotification,
    title: 'Industry Standards',
    description: 'Using industry standards for medical image and structured healthacare data',
  },
  {
    icon: IconChartPie3,
    title: 'Analytics',
    description: 'Get the big picture of how your patients and your practice are doing',
  },
];

export function Header(): JSX.Element {
  const navigate = useNavigate();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" weight={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <>
      <MantineHeader height={100} px="md">
        <Container py={20}>
          <Group position="apart">
            <UnstyledButton className={classes.logoButton} onClick={() => navigate('/')}>
              <Logo width={240} />
            </UnstyledButton>

            <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
              <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                <HoverCard.Target>
                  <a href="#" className={classes.link}>
                    <Center inline>
                      <Box component="span" mr={5}>
                        Services
                      </Box>
                      <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                    </Center>
                  </a>
                </HoverCard.Target>

                <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
                  <Group position="apart" px="md">
                    <Text weight={500}>Services</Text>
                    <Anchor href="#" size="xs">
                      View all
                    </Anchor>
                  </Group>

                  <Divider my="sm" mx="-md" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                  <SimpleGrid cols={2} spacing={0}>
                    {links}
                  </SimpleGrid>

                  <div className={classes.dropdownFooter}>
                    <Group position="apart">
                      <div>
                        <Text weight={500} size="sm">
                          Get started today!
                        </Text>
                        <Text size="xs" color="dimmed">
                          Register and start adding images to your PathologyCloud
                        </Text>
                      </div>
                      <Button variant="default">Get started</Button>
                    </Group>
                  </div>
                </HoverCard.Dropdown>
              </HoverCard>
              <a href="#" className={classes.link}>
                PathCloud Network
              </a>
              <a href="#" className={classes.link}>
                Company
              </a>
              <a href="#" className={classes.link}>
                More
              </a>
            </Group>

            <Group className={classes.hiddenMobile}>
              <Button variant="default" onClick={() => navigate('/signin')}>
                Log in
              </Button>
              <Button onClick={() => navigate('/register')}>Sign up</Button>
            </Group>

            <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
          </Group>
        </Container>
      </MantineHeader>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown size={16} color={theme.fn.primaryColor()} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Group position="center" grow pb="xl" px="md">
            <Button variant="default" onClick={() => navigate('/signin')}>
              Log in
            </Button>
            <Button onClick={() => navigate('/register')}>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </>
  );
}
