import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import TurnedInIcon from '@mui/icons-material/TurnedIn'; // Save Icon
import SearchIcon from '@mui/icons-material/Search';
import { PowerIcon } from '@heroicons/react/24/outline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LanguageIcon from '@mui/icons-material/Language';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';

import { Icon } from '@mui/material';

const StarIcon = (
    <Icon>
      <img alt="all" src="/assets/star.svg" />
    </Icon>
  );
  const CreatedIcon = (
    <Icon>
      <img alt="all" src="/assets/created.svg" />
    </Icon>
  );
 const Icons = {ArrowForwardIcon, ArrowBackIcon, CloseIcon, StarIcon, CreatedIcon, TurnedInIcon, 
  SearchIcon, PowerIcon, NotificationsNoneIcon, ThumbUpOffAltIcon, ThumbUpIcon,
  ThumbDownIcon, ThumbDownOffAltIcon, YouTubeIcon, LanguageIcon, GoogleIcon, AppleIcon}
 export default Icons;