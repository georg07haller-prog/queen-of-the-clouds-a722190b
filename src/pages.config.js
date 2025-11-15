import Home from './pages/Home';
import MemeMode from './pages/MemeMode';
import VideoVortex from './pages/VideoVortex';
import TweetTempest from './pages/TweetTempest';
import OfficeInferno from './pages/OfficeInferno';
import WellnessWhirlwind from './pages/WellnessWhirlwind';
import SisterhoodSummit from './pages/SisterhoodSummit';
import Landing from './pages/Landing';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Referral from './pages/Referral';
import Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "MemeMode": MemeMode,
    "VideoVortex": VideoVortex,
    "TweetTempest": TweetTempest,
    "OfficeInferno": OfficeInferno,
    "WellnessWhirlwind": WellnessWhirlwind,
    "SisterhoodSummit": SisterhoodSummit,
    "Landing": Landing,
    "FAQ": FAQ,
    "PrivacyPolicy": PrivacyPolicy,
    "TermsOfService": TermsOfService,
    "Referral": Referral,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: Layout,
};