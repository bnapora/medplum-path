import {
  Box,
  Button,
  Container,
  createStyles,
  CSSObject,
  Group,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { Footer } from '../../components/Footer';
import DoctorImage from '../../img/landingPage/doctor.jpg';
import EngineeringImage from '../../img/landingPage/engineering.jpg';
import LabImage from '../../img/landingPage/laboratory.jpg';
import WorkingEnvironmentImage from '../../img/landingPage/working-environment.jpg';
import PathologistsReadingRoom from '../../img/landingPage/laboratories+and+testing-1920w.jpg'
import PathHEFull from '../../img/landingPage/pathflow+header+background+(2)-2273w.jpg'
import PathologistViewingImage from '../../img/landingPage/Pathologist+in+viewer+-689w.png'
import { Header } from './Header';

const heroImageStyles: CSSObject = {
  position: 'absolute',
  borderRadius: '50%',
  objectFit: 'cover',
};

const useStyles = createStyles((theme) => ({
  outer: {
    overflow: 'hidden',
    backgroundImage: `radial-gradient(640px at top left, ${theme.fn.lighten(theme.fn.primaryColor(), 0.92)}, white)`,
  },

  inner: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '6rem',
    paddingBottom: '6rem',
    marginTop: '6rem',
    marginBottom: '6rem',

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },

  content: {
    maxWidth: 480,
    marginRight: '4.5rem',
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 56,
    lineHeight: 1.2,
    fontWeight: 600,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  highlight: {
    color: theme.fn.primaryColor(),
  },

  heroImage1: {
    ...heroImageStyles,
    top: 192,
    right: 24,
    width: 384,
    height: 384,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  heroImage2: {
    ...heroImageStyles,
    top: 415,
    left: 435,
    width: 288,
    height: 288,

    [theme.fn.smallerThan('md')]: {
      position: 'static',
    },
  },

  heroImage3: {
    ...heroImageStyles,
    top: 0,
    right: -128,
    width: 448,
    height: 448,
  },

  heroImage4: {
    ...heroImageStyles,
    top: -48,
    left: -432,
    width: 864,
    height: 864,

    [theme.fn.smallerThan('md')]: {
      position: 'static',
      width: 288,
      height: 288,
    },
  },

  featureSection: {
    justifyContent: 'flex-end',
    paddingTop: 0,
  },

  featureBox: {
    backgroundColor: theme.fn.lighten(theme.fn.primaryColor(), 0.9),
    borderRadius: theme.radius.xl,
    padding: '2.25rem',
    width: 512,
  },

  featureTitle: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: theme.spacing.md,
  },

  featureDescription: {
    fontSize: 18,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
  },
}));

const features = [
  {
    title: 'Rapid Access Anywhere',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
  },
  {
    title: 'Simple Fees',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
  },
  {
    title: 'View Anything',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
  },
  {
    title: 'Secure Storage',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
  },
];

export function LandingPage(): JSX.Element {
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  return (
    <div className={classes.outer}>
      <Header />
      <img className={classes.heroImage1} src={PathologistViewingImage} alt="Working Environment" />
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
            <span className={classes.highlight}>Gestalt PathFlow™ Cloud</span>
              <br />
              ...extraordinary diagnostics
            </Title>
            <Text size="lg" color="dimmed" mt="md">
              Access your cases where and when you need to.
            </Text>
            <Group mt={30}>
              <Button radius="xl" size="md" className={classes.control}>
                Get started
              </Button>
              <Button variant="default" radius="xl" size="md" className={classes.control}>
                Rates
              </Button>
            </Group>
          </div>
          <img className={classes.heroImage2} src={DoctorImage} alt="Doctor" />
        </div>
      </Container>
      <Container>
        <div className={classes.inner}>
          <div style={{ width: 500 }}>
            <Text size={20} c={theme.primaryColor} mb="lg">
              Digital Pathology
            </Text>
            <Text size={36} weight={500} mb="md">
              A better way to provide diagnostic care.
            </Text>
            <Text size={20} c={theme.colors.gray[7]}>
              Simple, secure storage and viewing of clinical images.
            </Text>
          </div>
          <img className={classes.heroImage3} src={PathologistsReadingRoom} alt="Laboratory" />
        </div>
      </Container>
      <Container>
        <div className={cx(classes.inner, classes.featureSection)}>
          <Stack align="flex-end">
            {features.map((feature, index) => (
              <Box key={`feature-${index}`} className={classes.featureBox}>
                <Text className={classes.featureTitle}>{feature.title}</Text>
                <Text className={classes.featureDescription}>{feature.description}</Text>
              </Box>
            ))}
          </Stack>
          <img className={classes.heroImage4} src={LabImage} alt="Laboratory" />
        </div>
      </Container>
      <Footer />
    </div>
  );
}
